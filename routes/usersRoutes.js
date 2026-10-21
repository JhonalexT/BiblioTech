import { Router } from "express";
import { listUsers, changeRole } from "../controllers/users.controller.js";
import { validarCampos } from "../middlewares/validate.camps.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import { tieneRol } from "../middlewares/validar-roles.js";
import { listUsersChecks, changeRoleChecks } from "../validators/users.js";

const router = Router();

router.get("/", [validarJWT, tieneRol("ADMIN"), ...listUsersChecks, validarCampos], listUsers);
router.patch("/:id/role", [validarJWT, tieneRol("ADMIN"), ...changeRoleChecks, validarCampos], changeRole);

export default router;
