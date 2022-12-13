import dayjs from "dayjs";
import { connectionDB } from "../../database/db.js";

export default async function returnRentalValidation(req, res, next) {

    const { id } = req.params;
    const returnDate = dayjs('2022-12-17');
    try {
        const rental = await connectionDB.query(`SELECT *, TO_CHAR("rentDate", 'YYYY-MM-DD') AS "rentDate" FROM rentals WHERE id = $1;`, [id]);
        if (rental.rowCount === 0) {
            return res.sendStatus(404);
        }

        if (rental.rows[0].returnDate) {
            return res.status(400).send("aluguel já finalizado");
        }
        // console.log(date2.diff(dayjs(rental.rows[0].rentDate).format("YYYY-MM-DD"), 'days'))
        const delayFee = returnDate.diff(dayjs(rental.rows[0].rentDate).format("YYYY-MM-DD"), 'days');
        if (delayFee > 0) {
            rental.rows[0].originalPrice = (rental.rows[0].daysRented + delayFee)*(rental.rows[0].originalPrice/rental.rows[0].daysRented);
            rental.rows[0].delayFee = delayFee;
        }
        rental.rows[0].returnDate = dayjs(returnDate).format("YYYY-MM-DD");


        res.locals.rental = rental.rows[0];
    } catch (err) {
        res.sendStatus(500);
    }
    next();
}