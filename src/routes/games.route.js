import { Router } from "express";
import { createGame, findGames } from "../controllers/games.controller.js";
import { postCreateGameValidation } from "../middlewares/postCreateGameValidation.js";

const router = Router();

//Listar todos os jogos
router.get("/games", findGames);

//Lista jogo especifico

//Cadastrar um jogo
router.post("/games", postCreateGameValidation, createGame);

export default router;