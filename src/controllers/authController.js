import jwt from "jsonwebtoken"
import nodemailer from "nodemailer"

import dotenv from "dotenv";
import * as crypto from 'node:crypto'
import { verifyToken } from '../../utils/verifyToken.js'
import { searchUserByEmail,
  searchEmailRegistered, insertTokenInDB } from "../models/authModel.js"
import { pool } from "../../utils/connectDatabase.js"

dotenv.config()


export const loginController = async (req, res) => {
  try {
    const { email, password_hash } = req.body

    const responseDBSearch = await searchUserByEmail(email)
   
    if (!responseDBSearch || responseDBSearch === 0) {
      return res.status(404).json({ message: "Usuário não cadastrado" })
    }

    if (password_hash !== responseDBSearch.password_hash) {
      return res.status(401).json({ message: "Senha ou email inválido" })
    }

    const token = jwt.sign(
      { id: responseDBSearch.id, email: responseDBSearch.email },
      process.env.JWT_SECRET,
      { expiresIn: "1Y" }
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



export const recoveryController = async (req, res) => {
  const { email }  = req.body
  
  const recoveryToken = crypto.randomBytes(32).toString('hex')
  const responseDbSearch = await searchEmailRegistered(email)
  
  if(!responseDbSearch.rowCount || responseDbSearch.length === 0) {
    return res.status(404).json({message: "Email não cadastrado"})
  } else {

    await insertTokenInDB(responseDbSearch.rows[0], recoveryToken)
  }
  
    
 
  const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "17cf6e8189d6b7",
      pass: "a35bd2ee747fc2"
    }
  })

const sendEmail = async () => {
  const info = await transporter.sendMail({
    from: '"Maddison Foo Koch" <maddison53@ethereal.email>',
    to: "bar@example.com, baz@example.com",
    subject: "Redefinição de senha de usuário",
    text: "", 
    html: `<p> Para redefinir sua senha, clique no link abaixo <p/>
    <a href="http://localhost:3000/auth/reset-password/?recoveryToken=${recoveryToken}">
            Redefinir Senha
          </a>`
   
  })

  console.log("Message sent:", info.messageId)
}

sendEmail().catch(console.error)


  res.status(200).json({
    message: "email encontrado. inserindo na tabela recovery...",
    data:  responseDbSearch.fields.email,
    code: recoveryToken
    })
  }


export const forgotPasswordController = (req, res) => {
  res.json({ message: "Em construção" })
}

export const resetPasswordController = async (req, res) => {
  const { recoveryToken } = req.query
  if(!recoveryToken)
  res.status(400).json({ message: "Token de recuperação é obrigatório" })

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

