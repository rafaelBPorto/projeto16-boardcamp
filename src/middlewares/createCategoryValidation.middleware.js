import { connectionDB } from "../database/db.js";
import { createCategory } from "../models/createCategory.model.js";

export async function postCreateCategoryValidation (req, res, next){
    const category = req.body;
    const { error } = createCategory.validate(category, {abortEarly: false});
    if(error){
        const erros = error.details.map((details)=> details.message);
        return res.status(400).send(erros)
    }

    try{
        const existeName = await connectionDB.query(`SELECT name FROM categories WHERE name = $1;`, [category.name])
        if(existeName.rows.length!==0){
            return res.status(409).send("Categoria já cadastrada");
        }
    } catch (err){
        res.status(500).send(err.message);
    }
    res.locals.name = category.name;
    next();
}