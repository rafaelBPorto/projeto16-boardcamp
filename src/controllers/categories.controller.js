import { connectionDB } from "../database/db.js";

/*
Formato da tabela -> categories
{
  id: 1,
  name: 'Estratégia',
}
*/

export async function findAllCategories(req, res){

    try{
        const {rows} = await connectionDB.query(`SELECT * FROM categories;`);
        res.send(rows);
    }catch(err){
        res.status(500).send(err.message);
    }
}

export async function createCategory(req, res){
    const {name} = req.body

    try{
        await connectionDB.query(`INSERT INTO categories (name) VALUES ($1);`, [name])
        res.sendStatus(201);
    } catch (err){
        res.status(500).send(err.message);
    }
}