import { logger } from "../../scripts/logger.ts"
import { pool } from "../../utils/connectDatabase.ts"
import * as z from 'zod'
import type { Request, Response } from "express"

const tokenSchema = z.object({
  recoveryToken: z.string().length(64).regex(/^[a-f0-9]{64}$/i)

})
export const resetPasswordController = async (req: Request, res: Response) => {
  const { recoveryToken } = req.query
  
  tokenSchema.parse({recoveryToken})
  
  if(!recoveryToken) {
    logger.warn("token not found in req.query")
    res.status(400).json({ message: "Token required" })
  }

  const {newPasswordHash: password} = req.body
  if(password.length < 6) 
  return res.status(400).json({ message: "password needs at least 6 digits" })
 
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
      WHERE id = $2 RETURNING *`,[password, responseDb.rows[0].user_id])

    return res.status(200).json({message: responseDbRecoveryPassword.rows[0]})
  }
    
  } catch(error) {
    console.error(error)
  }

   res.status(500).json({error: "error"})
}