import { logger } from "../../../logger.js"
import jwt from "jsonwebtoken"
import {searchUserByEmail} from '../../models/authModel.js'





export const loginController = async (req, res) => {
  const { email, password_hash } = req.body
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