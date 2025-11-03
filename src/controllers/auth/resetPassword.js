import { logger } from "../../scripts/logger.js"
import { pool } from "../../utils/connectDatabase.js"
import * as z from 'zod'


const tokenSchema = z.object({
  recoveryToken: z.string().length(64).regex(/^[a-f0-9]{64}$/i)

})
export const resetPasswordController = async (req, res) => {
  const { recoveryToken } = req.query
  tokenSchema.parse({recoveryToken})
  if(!recoveryToken) {
    logger.warn("token not found in req.query")
    res.status(400).json({ message: "Token de recuperação é obrigatório" })
  }

  const {newPasswordHash} = req.body
  if(newPasswordHash.length < 6) 
  return res.status(400).json({ message: "senha precisa ter mais de 6 digitos" })
 
  try {
    const responseDb = await pool.query(`
      SELECT * 
      FROM recovery 
      WHERE code = $1`, [recoveryToken])
    

  if(responseDb.rows.length == 0 || responseDb.rowCount === 0) {
    return res.status(401).json({message: "código de verificação inválido"})

  } else {
    const responseDbRecoveryPassword =
    await pool.query(`
      UPDATE users 
      SET password_hash = $1 
      WHERE id = $2 RETURNING *`,[newPasswordHash, responseDb.rows[0].user_id])

    return res.status(200).json({message: responseDbRecoveryPassword.rows[0]})
  }
    
  } catch(error) {
    console.error(error)
  }

   res.status(500).json({error: "error"})
}