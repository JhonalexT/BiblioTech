import Loan from "../models/loansModels.js";
import Book from "../models/booksModels.js";

const DIAS_PRESTAMO = 14;
const MAX_PRESTAMOS_ACTIVOS = 3;

export const createLoan = async (req, res, next) => {
  try {
    const bookId = req.body.book;
    const userId = req.user._id;

    // R3: no dos préstamos ACTIVE del mismo libro
    if (await Loan.exists({ user: userId, book: bookId, status: "ACTIVE" })) {
      return res.status(409).json({ ok: false, msg: "Ya tienes este libro prestado" });
    }

    // R2: máximo 3 préstamos ACTIVE
    const activos = await Loan.countDocuments({ user: userId, status: "ACTIVE" });
    if (activos >= MAX_PRESTAMOS_ACTIVOS) {
      return res.status(409).json({ ok: false, msg: "Límite de préstamos alcanzado" });
    }

    // R1 + R4: una sola actualización atómica que solo resta si hay copias
    const book = await Book.findOneAndUpdate(
      { _id: bookId, active: true, availableCopies: { $gt: 0 } },
      { $inc: { availableCopies: -1 } },
      { returnDocument: "after" }
    );
    if (!book) {
      const existe = await Book.exists({ _id: bookId });
      if (!existe) return res.status(404).json({ ok: false, msg: "Libro no encontrado" });
      return res.status(409).json({ ok: false, msg: "No hay copias disponibles" });
    }

    const loanDate = new Date();
    const dueDate = new Date(loanDate.getTime() + DIAS_PRESTAMO * 24 * 60 * 60 * 1000);

    try {
      const data = await Loan.create({ user: userId, book: bookId, loanDate, dueDate });
      res.status(201).json({ ok: true, data });
    } catch (error) {
      // Si no se pudo guardar el préstamo, se devuelve la copia
      await Book.updateOne({ _id: bookId }, { $inc: { availableCopies: 1 } });
      throw error;
    }
  } catch (error) {
    next(error);
  }
};

export const myLoans = async (req, res, next) => {
  try {
    const data = await Loan.find({ user: req.user._id })
      .populate("book", "title isbn")
      .sort("-createdAt");
    res.status(200).json({ ok: true, data });
  } catch (error) {
    next(error);
  }
};

export const returnLoan = async (req, res, next) => {
  try {
    const loan = await Loan.findById(req.params.id);
    if (!loan) return res.status(404).json({ ok: false, msg: "Préstamo no encontrado" });

    // R7: solo el dueño o un ADMIN
    const esDueno = loan.user.equals(req.user._id);
    if (!esDueno && req.user.role !== "ADMIN") {
      return res.status(403).json({ ok: false, msg: "No tienes permiso" });
    }

    // R6 + R4: solo se devuelve si sigue ACTIVE (atómico, evita devolver dos veces)
    const data = await Loan.findOneAndUpdate(
      { _id: loan._id, status: "ACTIVE" },
      { status: "RETURNED", returnDate: new Date() },
      { returnDocument: "after" }
    );
    if (!data) {
      return res.status(400).json({ ok: false, msg: "El préstamo ya fue devuelto" });
    }

    await Book.updateOne({ _id: loan.book }, { $inc: { availableCopies: 1 } });
    res.status(200).json({ ok: true, data });
  } catch (error) {
    next(error);
  }
};

export const listLoans = async (req, res, next) => {
  try {
    const filtro = {};
    if (req.query.status) filtro.status = req.query.status;

    const data = await Loan.find(filtro)
      .populate("user", "name email")
      .populate("book", "title isbn")
      .sort("-createdAt");
    res.status(200).json({ ok: true, data });
  } catch (error) {
    next(error);
  }
};

export const overdueLoans = async (req, res, next) => {
  try {
    const data = await Loan.find({ status: "ACTIVE", dueDate: { $lt: new Date() } })
      .populate("user", "name email")
      .populate("book", "title isbn");
    res.status(200).json({ ok: true, data });
  } catch (error) {
    next(error);
  }
};
