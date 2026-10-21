import { check } from "express-validator";

const anioActual = new Date().getFullYear();

export const authorId = check("id", "El ID no es válido").isMongoId();

// POST: el nombre es obligatorio. PUT: opcional, pero si viene se valida.
const nameCheck = (esPut) => {
  const c = check("name");
  return (esPut ? c.optional() : c.exists({ checkFalsy: true }).withMessage("El nombre es obligatorio").bail())
    .trim()
    .isLength({ min: 3, max: 80 }).withMessage("El nombre debe tener entre 3 y 80 caracteres");
};

const otrosChecks = [
  check("nationality").optional().trim()
    .isLength({ min: 2, max: 40 }).withMessage("La nacionalidad debe tener entre 2 y 40 caracteres"),
  check("birthYear").optional()
    .isInt({ min: 0, max: anioActual }).withMessage(`birthYear debe ser un entero entre 0 y ${anioActual}`)
    .toInt(),
];

export const createAuthorChecks = [nameCheck(false), ...otrosChecks];
export const updateAuthorChecks = [authorId, nameCheck(true), ...otrosChecks];
