import { Router } from "express";
import {
  listAuthors, getAuthorById, createAuthor, updateAuthor, deleteAuthor,
} from "../controllers/authors.controller.js";
import { validarCampos } from "../middlewares/validate.camps.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import { tieneRol } from "../middlewares/validar-roles.js";
import { authorId, createAuthorChecks, updateAuthorChecks } from "../validators/authors.validators.js";

const router = Router();

router.get("/", listAuthors);
router.get("/:id", [authorId, validarCampos], getAuthorById);
router.post("/", [validarJWT, tieneRol("ADMIN"), ...createAuthorChecks, validarCampos], createAuthor);
router.put("/:id", [validarJWT, tieneRol("ADMIN"), ...updateAuthorChecks, validarCampos], updateAuthor);
router.delete("/:id", [validarJWT, tieneRol("ADMIN"), authorId, validarCampos], deleteAuthor);

export default router;
