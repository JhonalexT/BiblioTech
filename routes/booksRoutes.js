import { Router } from "express";
import {
  listBooks, listAvailableBooks, getBookById, createBook, updateBook, deleteBook,
} from "../controllers/books.controller.js";
import { validarCampos } from "../middlewares/validate.camps.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import { tieneRol } from "../middlewares/validar-roles.js";
import {
  bookId, createBookChecks, updateBookChecks, listBooksChecks,
} from "../validators/books.validators.js";

const router = Router();

router.get("/", [...listBooksChecks, validarCampos], listBooks);
router.get("/available", listAvailableBooks); // antes de /:id
router.get("/:id", [bookId, validarCampos], getBookById);
router.post("/", [validarJWT, tieneRol("ADMIN"), ...createBookChecks, validarCampos], createBook);
router.put("/:id", [validarJWT, tieneRol("ADMIN"), ...updateBookChecks, validarCampos], updateBook);
router.delete("/:id", [validarJWT, tieneRol("ADMIN"), bookId, validarCampos], deleteBook);

export default router;
