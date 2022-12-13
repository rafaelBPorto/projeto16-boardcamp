import { connectionDB } from "../database/db.js";
import { createCustomersSchema } from "../models/createCustomers.model.js";

export async function postCreateCustomersValidation(req, res, next) {
    const customers = req.body;
    const { erro } = createCustomersSchema.validate(customers, { abortEarly: false });

    if (erro) {
        const erros = erro.details.map((details) => details.message);
        return res.status(400).send(erros);
    }

    try{
        const findUser = connectionDB.query(`SELECT cpf from customers WHERE cpf = $1`, [customers.cpf])
        if( (await findUser).rowCount > 0) {
            return res.status(409).send("CPF já cadastrado");
        }

    }catch (err) {
        return res.status(500).send(err.message);
    }

    next();
} 