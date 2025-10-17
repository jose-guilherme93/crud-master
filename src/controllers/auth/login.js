import jwt from "jsonwebtoken"
import * as z from 'zod'
import { logger } from "../../../logger.js"


import {searchUserByEmail} from '../../models/authModel.js'


const emailSchema = z.object({
  email: z.email().min(4).max(100),
  password_hash: z.string().min(6).max(255)
})


export const loginController = async (req, res) => {
  const { email, password_hash } = req.body
  emailSchema.parse({email, password_hash})
  logger.info(`try to login with ${email} email`)

  try {

    const responseDBSearch = await searchUserByEmail(email)
   
    if (!responseDBSearch || responseDBSearch === 0 || password_hash !== responseDBSearch.password_hash) {
      logger.warn("invalid email or password")
      return res.status(404).json({ message: "invalid email or password" })
    }

    const token = jwt.sign(
      { id: responseDBSearch.id, email: responseDBSearch.email },
      process.env.JWT_SECRET,
      { expiresIn: "1Y" }
    );
    logger.info(`login sucess with: ${email}`)
    return res.json({
      message: "Login realizado com sucesso",
      token
    });
  } catch (error) {
    logger.error(error)
    return res.status(500).json({ message: "Erro interno no servidor" })
  }
}