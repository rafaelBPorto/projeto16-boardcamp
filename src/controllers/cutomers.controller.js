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
    const { cpf } = req.query;

    try {
        if (cpf) {
            const customer = await connectionDB.query(`SELECT *, TO_CHAR(birthday, 'YYYY-MM-DD') AS birthday FROM customers WHERE cpf LIKE $1 || '%'`, [cpf]);
            return res.send(customer.rows);
        }
        const { rows } = await connectionDB.query(`SELECT *, TO_CHAR(birthday, 'YYYY-MM-DD') AS birthday FROM customers;`);
        res.send(rows);
    } catch (err) {
        return res.status(500).send(err.message);
    }

}

export async function findCustumersById(req, res) {
    const { id } = req.params;

    try {
        const { rows } = await connectionDB.query(`SELECT *, TO_CHAR(birthday, 'YYYY-MM-DD') AS birthday FROM customers WHERE id = $1`, [id])
        if (rows[0] === undefined) {
            return res.sendStatus(404);
        }
        res.send(rows[0]);
    } catch (err) {
        return res.status(500).send(err.message);
    }
}

export async function updateCustomer(req, res) {
    const { id } = req.params;
    const { name, phone, cpf, birthday } = req.body;
    console.log(birthday)

    try {
        await connectionDB.query(`
            UPDATE customers 
            SET name = $1, phone = $2, cpf = $3, birthday= $4
            WHERE id = $5;`,
            [name, phone, cpf, birthday, id]);
        return res.sendStatus(200);
    } catch (err) {
        return res.status(500).send(err.message);
    }
}