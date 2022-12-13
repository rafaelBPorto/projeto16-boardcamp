import { Router } from "express";
import { deleteRental, findRentals, postRentals } from "../controllers/rentals.controller.js";
import createRentalValidation from "../middlewares/rentals/createRentalValidation.middleware.js";
import createRentalObjetc from "../middlewares/rentals/creatRentalObject.middleware.js";

const router = Router();

//Inserir um aluguel
router.post("/rentals", createRentalValidation, createRentalObjetc, postRentals);

//Listar aluguéis
router.get("/rentals", findRentals);

//Finalizar aluguel

//Apagar aluguel
router.delete("/rentals/:id", deleteRental);

export default router;