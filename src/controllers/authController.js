import jwt from "jsonwebtoken";
import { searchUserByEmail } from "../models/authModel.js"
import dotenv from "dotenv";
dotenv.config()


export const loginController = async (req, res) => {
  try {
    const { email, password_hash } = req.body

    const responseDBSearch = await searchUserByEmail(email)
   
    if (!responseDBSearch || responseDBSearch === 0) {
      return res.status(404).json({ message: "Usuário não cadastrado" })
    }

    if (password_hash !== responseDBSearch.password_hash) {
      return res.status(401).json({ message: "Senha inválida" })
    }

    const token = jwt.sign(
      { id: responseDBSearch.id, email: responseDBSearch.email },
      process.env.JWT_SECRET,
      { expiresIn: "1Min" }
    );

    return res.json({
      message: "Login realizado com sucesso",
      token
    });
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: "Erro interno no servidor" })
  }
}

export const forgotPasswordController = (req, res) => {
  res.json({ message: "Em construção" })
}

export const resetPasswordController = (req, res) => {
  res.json({ message: "Em construção" })
}
