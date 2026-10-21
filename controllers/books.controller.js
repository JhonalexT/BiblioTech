import Book from "../models/booksModels.js";
import Loan from "../models/loansModels.js";
import { pick } from "../helpers/pick.js";

const CAMPOS = ["title", "isbn", "author", "genre", "year", "totalCopies"];

export const listBooks = async (req, res, next) => {
  try {
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit) || 10, 1), 50);
    const { genre, author, q } = req.query;
    const sort = req.query.sort || "-createdAt";

    const filtro = { active: true };
    if (genre) filtro.genre = genre;
    if (author) filtro.author = author;
    if (q) filtro.title = { $regex: escaparRegex(q), $options: "i" };

    const [total, data] = await Promise.all([
      Book.countDocuments(filtro),
      Book.find(filtro)
        .populate("author", "name")
        .sort(sort)
        .skip((page - 1) * limit)
        .limit(limit),
    ]);

    res.status(200).json({
      ok: true,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const listAvailableBooks = async (req, res, next) => {
  try {
    const data = await Book.find({ active: true, availableCopies: { $gt: 0 } }).populate(
      "author",
      "name"
    );
    res.status(200).json({ ok: true, data });
  } catch (error) {
    next(error);
  }
};

export const getBookById = async (req, res, next) => {
  try {
    const data = await Book.findOne({ _id: req.params.id, active: true }).populate("author");
    if (!data) return res.status(404).json({ ok: false, msg: "Libro no encontrado" });
    res.status(200).json({ ok: true, data });
  } catch (error) {
    next(error);
  }
};

export const createBook = async (req, res, next) => {
  try {
    const campos = pick(req.body, CAMPOS);
    // Lo asigna el controlador, no el cliente
    campos.availableCopies = campos.totalCopies;
    const data = await Book.create(campos);
    res.status(201).json({ ok: true, data });
  } catch (error) {
    next(error);
  }
};

export const updateBook = async (req, res, next) => {
  try {
    const book = await Book.findOne({ _id: req.params.id, active: true });
    if (!book) return res.status(404).json({ ok: false, msg: "Libro no encontrado" });

    const cambios = pick(req.body, CAMPOS);

    // R5: totalCopies no puede ser menor que las copias prestadas
    if (cambios.totalCopies !== undefined) {
      const prestadas = book.totalCopies - book.availableCopies;
      if (cambios.totalCopies < prestadas) {
        return res.status(400).json({
          ok: false,
          msg: `totalCopies no puede ser menor a las copias prestadas (${prestadas})`,
        });
      }
      cambios.availableCopies = cambios.totalCopies - prestadas;
    }

    const data = await Book.findOneAndUpdate({ _id: book._id }, cambios, {
      returnDocument: "after",
      runValidators: true,
    });
    res.status(200).json({ ok: true, data });
  } catch (error) {
    next(error);
  }
};

// Borrado lógico (R8: no se desactiva un libro con préstamos activos)
export const deleteBook = async (req, res, next) => {
  try {
    const book = await Book.findOne({ _id: req.params.id, active: true });
    if (!book) return res.status(404).json({ ok: false, msg: "Libro no encontrado" });

    if (await Loan.exists({ book: book._id, status: "ACTIVE" })) {
      return res.status(409).json({ ok: false, msg: "El libro tiene préstamos activos" });
    }

    book.active = false;
    await book.save();
    res.status(200).json({ ok: true, data: book });
  } catch (error) {
    next(error);
  }
};
