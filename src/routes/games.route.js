import { Router } from "express";
import { createGame } from "../controllers/games.controller.js";
import { postCreateGameValidation } from "../middlewares/postCreateGameValidation.js";

const router = Router();

//Listar todos os jogos

//Cadastrar um jogo
router.post("/games", postCreateGameValidation, createGame)

export default router;