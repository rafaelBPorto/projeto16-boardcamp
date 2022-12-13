import { connectionDB } from "../../database/db.js";
import { createRentalSchema } from "../../models/createRental.model.js";

export default async function createRentalValidation(req, res, next) {
    const rental = req.body;

    const { error } = createRentalSchema.validate(rental, { abortyEarly: false })
    if (error) {
        const erros = error.details.map((details) => details.message);
        return res.status(400).send(erros);
    }
    console.log(rental.customerId)
    try {
        const customer = await connectionDB.query(`SELECT * FROM customers WHERE id = $1`, [rental.customerId]);
        if (customer.rowCount === 0) {
            return res.status(400).send("cliente não cadastrado");
        }
        const game = await connectionDB.query(`SELECT * FROM games WHERE id = $1`, [rental.gameId]);
        if (game.rowCount === 0) {
            return res.status(400).send("jogo não cadastrado");
        }
        const rentalsGame = await connectionDB.query(`
            SELECT * FROM rentals 
            WHERE ('gameId' = $1 and 'returnDate' is null)
            `, [rental.gameId]);
        if (rentalsGame.rowCount - game.stockTotal < 1) {
            return res.status(400).send("jogo não disponível");
        }
        
        const objectRental = {
            customerId: rental.customerId,
            gameId: rental.gameId,
            daysRented: rental.daysRented,
            originalPrice: game.rows[0].pricePerDay*rental.daysRented
        }
        res.locals.rental = objectRental
        next();

    } catch (err) {
        return res.status(500).send(err.message);
    }
}