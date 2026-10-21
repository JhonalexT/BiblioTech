import { check } from "express-validator";
import { emailExiste } from "../helpers/db-validators.js";

export const registerChecks = [
  check("name", "El nombre es obligatorio").trim().notEmpty().bail()
    .isLength({ min: 3, max: 60 }).withMessage("El nombre debe tener entre 3 y 60 caracteres"),
  check("email", "El correo es obligatorio").trim().toLowerCase().notEmpty().bail()
    .isEmail().withMessage("El correo no es válido").bail()
    .custom(emailExiste),
  check("password", "La contraseña es obligatoria").notEmpty().bail()
    .isLength({ min: 6 }).withMessage("La contraseña debe tener mínimo 6 caracteres"),
];

export const loginChecks = [
  check("email", "El correo es obligatorio").trim().notEmpty().bail()
    .isEmail().withMessage("El correo no es válido"),
  check("password", "La contraseña es obligatoria").notEmpty(),
];
