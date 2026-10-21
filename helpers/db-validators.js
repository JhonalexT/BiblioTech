import mongoose from "mongoose";
import Author from "../models/authorsModels.js";
import Book from "../models/booksModels.js";
import User from "../models/usersModels.js";

export const existeAutorPorId = async (id) => {
  const autor = await Author.findOne({ _id: id, active: true });
  if (!autor) throw new Error("El autor no existe o está inactivo");
  return true;
};

// excludeId: al editar un libro, su propio ISBN no cuenta como repetido
export const isbnExiste = async (isbn, excludeId = null) => {
  const filtro = { isbn };
  if (excludeId && mongoose.isValidObjectId(excludeId)) {
    filtro._id = { $ne: excludeId };
  }
  if (await Book.exists(filtro)) {
    throw new Error(`El ISBN ${isbn} ya está registrado`);
  }
  return true;
};

export const emailExiste = async (email) => {
  if (await User.exists({ email: email.toLowerCase() })) {
    throw new Error(`El correo ${email} ya está registrado`);
  }
  return true;
};
