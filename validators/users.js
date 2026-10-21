import { check } from "express-validator";

export const listUsersChecks = [
  check("page").optional().isInt({ min: 1 }).withMessage("page debe ser un entero >= 1"),
  check("limit").optional().isInt({ min: 1, max: 50 }).withMessage("limit debe estar entre 1 y 50"),
];

export const changeRoleChecks = [
  check("id", "El ID no es válido").isMongoId(),
  check("role", "El rol es obligatorio").exists({ checkFalsy: true }).bail()
    .isIn(["USER", "ADMIN"]).withMessage("El rol debe ser USER o ADMIN"),
];
