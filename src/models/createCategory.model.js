import joi from "joi";

export const createCategory = joi.object({
    name: joi.string().min(3).required()
})