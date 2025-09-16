
import { pool } from "../connectDatabase.js";

import dotenv from "dotenv"
dotenv.config()


const insertGameQuery =  `
    INSERT INTO games (id, title, rating, status, review )
    VALUES ($1,$2,$3,$4, $5)

    RETURNING *;
`
const timestamp = Date.now();
const idBigInt = BigInt(timestamp)

const newGame = {
    id: idBigInt,
    title: "God of War",
    rating: 10,
    status: "Jogando",
    review: "é um jogo de ação incrível, com muita história e pancadaria",
   
}


const {id, title, rating, status, review} = newGame

const insertGameInPool = async () => {
    try {
        const responseInsertGameQuery = await pool.query(insertGameQuery, [id, title, rating, status, review])
        console.log(responseInsertGameQuery.rows)
    } catch (error) {
        console.log(error)
    }
}

insertGameInPool()
