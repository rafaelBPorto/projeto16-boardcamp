import joi from "joi";

export const createCustomersSchema = joi.object({
    name: joi.string().min(2).trim().required(),
    phone: joi.string().alphanum().min(10).max(11).required(),
    cpf: joi.string().length(11).required(),
    birthday: joi.date().required()
})

