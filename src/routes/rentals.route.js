import { Router } from "express";
import { postRentals } from "../controllers/rentals.controller.js";
import createRentalValidation from "../middlewares/rentals/createRentalValidation.middleware.js";
import createRentalObjetc from "../middlewares/rentals/creatRentalObject.middleware.js";

const router = Router();

//Inserir um aluguel
router.post("/rentals", createRentalValidation, createRentalObjetc, postRentals);

//Listar aluguéis

//Finalizar aluguel

//Apagar aluguel

export default router;