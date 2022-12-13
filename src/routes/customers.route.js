import { Router } from "express";
import { createCustomers, findCustomers, findCustumersById } from "../controllers/cutomers.controller.js";
import { postCreateCustomersValidation } from "../middlewares/createCustomersValidation.middleware.js";

const router = Router();

//Inserir um cliente
router.post("/customers", postCreateCustomersValidation, createCustomers);

//Listar clientes
router.get("/customers", findCustomers);
//Buscar cliente por id
router.get("/customers/:id", findCustumersById)
//Atualizar um cliente

export default router;