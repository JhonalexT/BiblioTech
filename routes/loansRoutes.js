import { Router } from "express";
import {
  createLoan, myLoans, returnLoan, listLoans, overdueLoans,
} from "../controllers/loans.controller.js";
import { validarCampos } from "../middlewares/validate.camps.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import { tieneRol } from "../middlewares/validar-roles.js";
import {
  createLoanChecks, returnLoanChecks, listLoansChecks,
} from "../validators/loans.validators.js";

const router = Router();

router.post("/", [validarJWT, ...createLoanChecks, validarCampos], createLoan);

// /me y /overdue se declaran antes de cualquier ruta con :id
router.get("/me", [validarJWT], myLoans);
router.get("/overdue", [validarJWT, tieneRol("ADMIN")], overdueLoans);
router.get("/", [validarJWT, tieneRol("ADMIN"), ...listLoansChecks, validarCampos], listLoans);

router.patch("/:id/return", [validarJWT, ...returnLoanChecks, validarCampos], returnLoan);

export default router;
