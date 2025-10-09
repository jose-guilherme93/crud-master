import { pool } from "../../utils/connectDatabase.js"


export const searchUserByEmail = async (email) => {

    const responseQuery = await pool.query('SELECT * FROM users WHERE email = $1', [email])
    return responseQuery.rows[0]
}
