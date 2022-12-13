import { Router } from "express";
import { createCustomers, findCustomers, findCustumersById, updateCustomer } from "../controllers/cutomers.controller.js";
import { postCreateCustomersValidation } from "../middlewares/createCustomersValidation.middleware.js";
import { putUpdateCustomersValidation } from "../middlewares/updateCustomersValidation.middleware.js";

const router = Router();

//Inserir um cliente
router.post("/customers", postCreateCustomersValidation, createCustomers);

//Listar clientes
router.get("/customers", findCustomers);

//Buscar cliente por id
router.get("/customers/:id", findCustumersById)

//Atualizar um cliente
router.put("/customers/:id", putUpdateCustomersValidation, updateCustomer)

export default router;