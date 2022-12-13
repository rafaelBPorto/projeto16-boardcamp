import { connectionDB } from "../database/db.js";
import { createCustomersSchema } from "../models/createCustomers.model.js";

export async function putUpdateCustomersValidation(req, res, next) {
    const customers = req.body;
    const { id } = req.params;

    const { error } = createCustomersSchema.validate(customers, { abortEarly: false });
    if (error) {
        console.log("entrou aqui")
        const erros = error.details.map((details) => details.message);
        return res.status(400).send(erros);
    }

    try {
        const findUser = await connectionDB.query(`SELECT * from customers WHERE id = $1`, [id])
        if (findUser.rowCount === 0) {
            return res.status(409).send('cpf não encontrado')
        }
    } catch (err) {
        return res.status(500).send(err.message);
    }
    next();

} 