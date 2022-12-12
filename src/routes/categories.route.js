import { Router } from "express";
import {findAllCategories, createCategory} from "../controllers/categories.controller.js"

const router = Router();

//Listas todas categorias
router.get("/categories", findAllCategories);

//Inserir categorias
router.post("/categories", createCategory);

export default router;