import { check } from "express-validator";

export const loanId = check("id", "El ID no es válido").isMongoId();

export const createLoanChecks = [
  check("book", "El libro es obligatorio").exists({ checkFalsy: true }).bail()
    .isMongoId().withMessage("El ID del libro no es válido"),
];

export const returnLoanChecks = [loanId];

export const listLoansChecks = [
  check("status").optional().isIn(["ACTIVE", "RETURNED"]).withMessage("status debe ser ACTIVE o RETURNED"),
];
