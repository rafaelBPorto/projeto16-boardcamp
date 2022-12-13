import { connectionDB } from "../database/db.js";

export async function postRentals(req, res) {
    const { customerId, gameId, rentDate, daysRented, returnDate, originalPrice, delayFee } = res.locals.rental;
    console.log(res.locals.rental)
    try {
        await connectionDB.query(`
        INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee")
        VALUES ($1, $2, $3, $4, $5, $6, $7)`,
            [customerId, gameId, rentDate, daysRented, returnDate, Number(originalPrice), delayFee]);
        res.sendStatus(201);
    } catch (err) {
        return res.status(500).send(err.message);
    }

}

