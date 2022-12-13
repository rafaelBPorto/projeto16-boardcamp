import joi from "joi";

export const createCustomersSchema = joi.object({
    name: joi.string().min(2).trim().required(),
    phone: joi.string().alphanum().pattern(/^[0-9]+$/).min(10).max(11).required(),
    cpf: joi.string().alphanum().min(11).pattern(/^[0-9]+$/).required(),
    birthday: joi.date().required()
})