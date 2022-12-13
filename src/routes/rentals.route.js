import { Router } from "express";
import { deleteRental, findRentals, postRentals, returnRental } from "../controllers/rentals.controller.js";
import createRentalValidation from "../middlewares/rentals/createRentalValidation.middleware.js";
import createRentalObjetc from "../middlewares/rentals/creatRentalObject.middleware.js";
import returnRentalValidation from "../middlewares/rentals/returnRentalValidation.middleware.js";

const router = Router();

//Inserir um aluguel
router.post("/rentals", createRentalValidation, createRentalObjetc, postRentals);

//Listar aluguéis
router.get("/rentals", findRentals);

//Finalizar aluguel
router.post("/rentals/:id/return", returnRentalValidation, returnRental);
//Apagar aluguel
router.delete("/rentals/:id", deleteRental);

export default router;