import { Router } from "express";
import { register, login, me } from "../controllers/auth.controller.js";
import { validarCampos } from "../middlewares/validate.camps.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import { registerChecks, loginChecks } from "../validators/auth.validators.js";

const router = Router();

router.post("/register", [...registerChecks, validarCampos], register);
router.post("/login", [...loginChecks, validarCampos], login);
router.get("/me", [validarJWT], me);

export default router;
