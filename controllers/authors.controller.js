import Author from "../models/authorsModels.js";
import Book from "../models/booksModels.js";
import { pick } from "../helpers/pick.js";

const CAMPOS = ["name", "nationality", "birthYear"];

export const listAuthors = async (req, res, next) => {
  try {
    const data = await Author.find({ active: true });
    res.status(200).json({ ok: true, data });
  } catch (error) {
    next(error);
  }
};

export const getAuthorById = async (req, res, next) => {
  try {
    const author = await Author.findOne({ _id: req.params.id, active: true });
    if (!author) return res.status(404).json({ ok: false, msg: "Autor no encontrado" });

    const books = await Book.find({ author: author._id, active: true });
    res.status(200).json({ ok: true, data: { ...author.toObject(), books } });
  } catch (error) {
    next(error);
  }
};

export const createAuthor = async (req, res, next) => {
  try {
    const data = await Author.create(pick(req.body, CAMPOS));
    res.status(201).json({ ok: true, data });
  } catch (error) {
    next(error);
  }
};

export const updateAuthor = async (req, res, next) => {
  try {
    const data = await Author.findOneAndUpdate(
      { _id: req.params.id, active: true },
      pick(req.body, CAMPOS),
      { returnDocument: "after", runValidators: true }
    );
    if (!data) return res.status(404).json({ ok: false, msg: "Autor no encontrado" });
    res.status(200).json({ ok: true, data });
  } catch (error) {
    next(error);
  }
};

// Borrado lógico (R8: no se desactiva un autor con libros activos)
export const deleteAuthor = async (req, res, next) => {
  try {
    const author = await Author.findOne({ _id: req.params.id, active: true });
    if (!author) return res.status(404).json({ ok: false, msg: "Autor no encontrado" });

    if (await Book.exists({ author: author._id, active: true })) {
      return res.status(409).json({ ok: false, msg: "El autor tiene libros activos" });
    }

    author.active = false;
    await author.save();
    res.status(200).json({ ok: true, data: author });
  } catch (error) {
    next(error);
  }
};
