import { logger } from "../../../logger.js"
import * as crypto from 'node:crypto'
import {createTransport} from "nodemailer"
import * as z from 'zod'
import { searchEmailRegistered } from "../../models/authModel.js"
import { insertTokenInDB } from "../../models/authModel.js"

const emailSchema = z.object({
  email: z.email().min(4).max(100)
})

export const recoveryController = async (req, res) => {
  const { email }  = req.body
  emailSchema.parse({email})
  logger.info(`try to recovery password with: ${email}`)
  const recoveryToken = crypto.randomBytes(32).toString('hex')
  const responseDbSearch = await searchEmailRegistered(email)
  
  if(!responseDbSearch.rowCount || responseDbSearch.length === 0) {
    logger.warn("email not found")
    return res.status(404).json({message: "Email não cadastrado"})
  } else {

    await insertTokenInDB(responseDbSearch.rows[0], recoveryToken)
  }
  
  const transporter = createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.USERNAME_MAILER,
      pass: process.env.USER_PASSWORD_TRANSPORTER_MAILER
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

