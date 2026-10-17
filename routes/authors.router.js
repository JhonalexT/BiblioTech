import {Router} from "express";
import {listAuthors, createAuthors} from "../controllers/authors.controller.js";


const router = Router()

router.get("/", listAuthors),
router.get("/", createAuthors),
router.get("/",)