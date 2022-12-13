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

export async function findRentals(req, res) {
    const { gameId } = req.query
    try {
        if (gameId) {
            const rentals = await connectionDB.query(`
            SELECT *, 
                TO_CHAR("rentDate", 'YYYY-MM-DD') AS "rentDate" ,
                TO_CHAR(birthday, 'YYYY-MM-DD') AS birthday,
                customers.id AS "customerId",
                games.name AS "gameName"
            FROM rentals 
            JOIN games 
                ON rentals."gameId" = games.id
            JOIN customers 
                ON  rentals."customerId" = customers.id
            WHERE rentals."gameId" = $1;`,
                [gameId])
            
            console.log(rentals.rows)
            const object = []
            rentals.rows.forEach((element) => object.push(
                {
                    id: element.id,
                    customerId: element.customerId,
                    gameId: element.gameId,
                    rentDate: element.rentDate,
                    daysRented: element.daysRented,
                    returnDate: element.returnDate,
                    originalPrice: element.originalPrice,
                    delayFee: element.delayFee,
                    customer: {
                        id: element.customerId,
                        name: element.name
                    },
                    game: {
                        id: element.gameId,
                        name: element.gameName,
                        categoryId: element.categoryId,
                        categoryName: element.gameName
                    }
                }))
            return res.send(object);
        }

        const rentals = await connectionDB.query(`
            SELECT *, 
                TO_CHAR("rentDate", 'YYYY-MM-DD') AS "rentDate" ,
                TO_CHAR(birthday, 'YYYY-MM-DD') AS birthday,
                customers.id AS "customerId",
                games.name AS "gameName"
            FROM rentals 
            JOIN games 
                ON rentals."gameId" = games.id
            JOIN customers 
                ON  rentals."customerId" = customers.id;`)


        const object = []
        rentals.rows.forEach((element) => object.push(
            {
                id: element.id,
                customerId: element.customerId,
                gameId: element.gameId,
                rentDate: element.rentDate,
                daysRented: element.daysRented,
                returnDate: element.returnDate,
                originalPrice: element.originalPrice,
                delayFee: element.delayFee,
                customer: {
                    id: element.customerId,
                    name: element.name
                },
                game: {
                    id: element.gameId,
                    name: element.gameName,
                    categoryId: element.categoryId,
                    categoryName: element.categoryName
                }
            }))

        res.send(object);

    } catch (err) {
        return res.status(500).send(err.message);
    }
}

export async function returnRental(req, res){
   const rental = res.locals.rental;
   res.send(rental) 
}
export async function deleteRental(req, res){
    const {id} = req.params
    try{
        const rental = await connectionDB.query(`DELETE FROM rentals WHERE id=$1`, [id])
        if(rental.rowCount===0){
            return res.sendStatus(404);
        }

        if(rental.rows.returnDate){
            return res.sendStatus(400);
        }
        res.send(rental.rows)
    }catch{
        res.sendStatus(500)
    }
}