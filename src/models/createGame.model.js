import joi from "joi";

export const createGame = joi.object({
    name: joi.string().required().min(1).required().trim(),
    image: joi.string().allow(""),
    stockTotal: joi.number().integer().min(1).required(),
    categoryId: joi.number().integer().min(1).required(),
    pricePerDay: joi.number().integer().min(1).required()
})