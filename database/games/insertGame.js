import { randomUUID } from "crypto";
import { pool } from "../connectDatabase.js";

import dotenv from "dotenv"
dotenv.config()


const insertGameQuery =  `
    INSERT INTO games (title, game_id, rating, status, review )
    VALUES ($1,$2,$3,$4,$5)

    RETURNING *;
`

const newGame = {
    title: "God of War",
    game_id: randomUUID(),
    rating: 10,
    status: "Jogando",
    review: "é um jogo de ação incrível, com muita história e pancadaria",
   

}


const {title, game_id, rating, status, review} = newGame

const insertGameInPool = async () => {
    try {
        const responseInsertGameQuery = await pool.query(insertGameQuery, [title, game_id, rating, status, review])
        console.log(responseInsertGameQuery.rows)
    } catch (error) {
        console.log(error)
    }
}

insertGameInPool()