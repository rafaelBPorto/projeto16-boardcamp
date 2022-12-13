import { connectionDB } from "../database/db.js";

export async function createCustomers(req, res) {
    const { name, phone, cpf, birthday } = req.body

    try {
        await connectionDB.query(
            `
                INSERT INTO customers (name, phone, cpf, birthday)
                VALUES ($1, $2, $3, $4);`,
            [name, phone, cpf, birthday]
        );

        res.sendStatus(201)

    } catch (err) {
        return res.status(500).send(err.message);
    }
}

export async function findCustomers(req, res) {
    const {cpf} = req.query;    

    try {
        if(cpf){
            const customer = await connectionDB.query(`SELECT *, TO_CHAR(birthday, 'YYYY-MM-DD') AS birthday FROM customers WHERE cpf LIKE $1 || '%'`, [cpf]);
            return res.send(customer.rows);
        }
        const { rows } = await connectionDB.query(`SELECT *, TO_CHAR(birthday, 'YYYY-MM-DD') AS birthday FROM customers;`);
        res.send(rows);
    } catch (err) {
        return res.status(500).send(err.message);
    }

}