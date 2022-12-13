import { connectionDB } from "../database/db.js"


export async function findGames(req, res) {
    const { name } = req.query
    let games;

    try {
        if (name) {
            games = await connectionDB.query(
                `
                SELECT * FROM games 
                WHERE TRANSLATE(LOWER(name), 'ÁÀÂÃÄáàâãäÉÈÊËéèêëÍÌÎÏíìîïÓÒÕÔÖóòôõöÚÙÛÜúùûüÇç', 
                                             'AAAAAaaaaaEEEEeeeeIIIIiiiiOOOOOoooooUUUUuuuuÇc') 
                like TRANSLATE(LOWER($1) || '%','ÁÀÂÃÄáàâãäÉÈÊËéèêëÍÌÎÏíìîïÓÒÕÔÖóòôõöÚÙÛÜúùûüÇç', 
                                             'AAAAAaaaaaEEEEeeeeIIIIiiiiOOOOOoooooUUUUuuuuÇc');
            `, [name]);

        } else {
            games = await connectionDB.query(
                `
                    SELECT games.*, categories.name AS "categoryName" 
                    FROM games 
                    JOIN categories 
                    ON games."categoryId" = categories.id;
                `)
        }

        res.send(games.rows);
    } catch (err) {
        return res.status(500).send(err.message);
    }
}

export async function createGame(req, res) {
    const { name, image, stockTotal, categoryId, pricePerDay } = req.body

    try {
        await connectionDB.query(
            `
                INSERT INTO 
                games (name, image, "stockTotal", "categoryId", "pricePerDay")
                VALUES($1, $2, $3, $4, $5);`,
            [name, image, stockTotal, categoryId, pricePerDay]
        );

        res.sendStatus(201);

    } catch (err) {
        return res.status(500).send(err.message);
    }
}
