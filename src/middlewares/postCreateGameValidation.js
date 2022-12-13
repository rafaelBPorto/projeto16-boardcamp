import { connectionDB } from "../database/db.js";
import { createGame } from "../models/createGame.model.js";

export async function postCreateGameValidation(req, res, next) {
    const game = req.body;
    const { error } = createGame.validate(game, { abortEarly: false });
    if (error) {
        const erros = error.details.map((details) => details.message);
        return res.status(400).send(erros);
    }

    try {
        const findCategory = await connectionDB.query(`SELECT name FROM categories WHERE id=$1;`, [game.categoryId])
        if (findCategory.rows.length === 0) {
            return res.status(409).send("Esta categoria não existe")
        }
        const findGame = await connectionDB.query(`SELECT name FROM games WHERE LOWER (name) = LOWER($1);`, [game.name]);
        if (findGame.rows.length !== 0) {
            return res.status(409).send("Jogo já cadastrado")
        }
    } catch (err) {
        return res.status(500).send(err.message);
    }

    next();

}