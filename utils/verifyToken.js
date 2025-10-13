import { pool } from "./connectDatabase.js"


export const verifyToken = async (code) => {
    try {

        const responseQuery = await pool.query("SELECT * FROM recovery_tokens WHERE token = $1", [code])
        return responseQuery.rows.length > 0 ? responseQuery.rows[0] : null
    } catch (error) {
        console.error("Erro ao verificar token:", error)
        throw new Error("Erro ao verificar token")
    }

}
  