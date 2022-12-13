import joi from "joi";

export const createCustomersSchema = joi.object({
    name: joi.string().min(2).trim().required(),
    phone: joi.string().length(11).allow(""),
    cpf: joi.string().length(11).pattern(/^[0-9]+$/).required(),
    birthday: joi.date().required()
})