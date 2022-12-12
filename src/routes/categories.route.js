import { Router } from "express";
import {findAllCategories, createCategory} from "../controllers/categories.controller.js"
import { postCreateCategoryValidation } from "../middlewares/createCategoryValidation.middleware.js";

const router = Router();

//Listas todas categorias
router.get("/categories", findAllCategories);

//Inserir categorias
router.post("/categories", postCreateCategoryValidation, createCategory);

export default router;