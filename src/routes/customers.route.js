import { Router } from "express";
import { createCustomers } from "../controllers/cutomers.controller.js";
import { postCreateCustomersValidation } from "../middlewares/createCustomersValidation.middleware.js";

const router = Router();

//Inserir um cliente
router.post("/customers", postCreateCustomersValidation, createCustomers)

//Listar clientes

//Buscar cliente por id

//Atualizar um cliente

export default router;