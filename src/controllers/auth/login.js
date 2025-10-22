
import * as z from 'zod'
import { logger } from "../../../logger.js"
import  jwt  from 'jsonwebtoken'

import {insertTokenSession, searchUserByEmail} from '../../models/authModel.js'


const userSchema = z.object({
  email: z.email().min(4).max(100),
  password_hash: z.string().min(8, "a senha deve conter ao menos 8 caracteres").max(64, "a senha deve conter no máximo 64 caracteres")
})

export const loginController = async (req, res) => {

  const { email, password_hash } = req.body
  const ip = req.get['x-forwarded-for'] || req.socket.remoteAddress
  const browser = req.headers['user-agent'];

  userSchema.parse({email, password_hash})
  logger.info(`try to login with ${email} email`)

  try {
    const responseDBSearch = await searchUserByEmail(email)
    if (!responseDBSearch || responseDBSearch === 0 || password_hash !== responseDBSearch.password_hash) {
      logger.warn("invalid email or password")
      return res.status(404).json({ message: "invalid email or password" })
    }

    const expiresAt = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString()
    const sessionParameters = {
      sessionId: crypto.randomUUID(),
      userId: responseDBSearch.id,
      browser,
      ip,
      expiresAt
      
    }
    const sessionToken = jwt.sign({
      sub: sessionParameters.sessionId,
      exp: Math.floor(Date.now() / 1000) + 60 * 60

    }, process.env.JWT_SECRET)
    
    
    const token = await insertTokenSession(sessionParameters)
   
    logger.info(`token inserted successfully: ${token.created_at}`)
    logger.info(`login success with: ${email}`)

    return res.json({
      message: "Login realizado com sucesso",
    })

  } catch (error) {
    logger.error(error)
    
    res.status(500).json({ message: "Erro interno no servidor" })
    throw error
  }
  
}