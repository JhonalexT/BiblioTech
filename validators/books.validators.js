import { check } from "express-validator";
import { existeAutorPorId, isbnExiste } from "../helpers/db-validators.js";

const anioActual = new Date().getFullYear();
const GENEROS = ["novela", "cuento", "poesia", "ensayo", "tecnologia", "historia", "infantil"];

export const bookId = check("id", "El ID no es válido").isMongoId();

// POST: campo obligatorio. PUT: opcional, pero si viene se valida.
const campo = (nombre, esPut) =>
  esPut
    ? check(nombre).optional()
    : check(nombre).exists({ checkFalsy: true }).withMessage(`${nombre} es obligatorio`).bail();

const bodyChecks = (esPut) => [
  campo("title", esPut).trim()
    .isLength({ min: 1, max: 120 }).withMessage("El título debe tener entre 1 y 120 caracteres"),
  campo("isbn", esPut).trim()
    .matches(/^(\d{10}|\d{13})$/).withMessage("El ISBN debe tener solo dígitos (10 o 13)").bail()
    .custom((value, { req }) => isbnExiste(value, esPut ? req.params.id : null)),
  campo("author", esPut)
    .isMongoId().withMessage("El ID del autor no es válido").bail()
    .custom(existeAutorPorId),
  check("genre").optional()
    .isIn(GENEROS).withMessage(`El género debe ser uno de: ${GENEROS.join(", ")}`),
  check("year").optional()
    .isInt({ max: anioActual }).withMessage(`El año debe ser un entero no mayor a ${anioActual}`).toInt(),
  campo("totalCopies", esPut)
    .isInt({ min: 1 }).withMessage("totalCopies debe ser un entero mayor o igual a 1").toInt(),
];

export const createBookChecks = bodyChecks(false);
export const updateBookChecks = [bookId, ...bodyChecks(true)];

export const listBooksChecks = [
  check("page").optional().isInt({ min: 1 }).withMessage("page debe ser un entero >= 1"),
  check("limit").optional().isInt({ min: 1, max: 50 }).withMessage("limit debe estar entre 1 y 50"),
  check("genre").optional().isIn(GENEROS).withMessage("Género no válido"),
  check("author").optional().isMongoId().withMessage("El ID del autor no es válido"),
  check("sort").optional()
    .matches(/^-?(title|year|genre|totalCopies|createdAt)$/)
    .withMessage("sort no válido (ej: -year, title)"),
];
