import { logger } from '../../scripts/logger.js'
import type { Response, Request } from 'express'
import * as crypto from 'node:crypto'
import { createTransport } from 'nodemailer'
import * as z from 'zod'
import { searchEmailRegistered } from '../../models/authModel.js'
import { insertRecoveryTokenInDB } from '../../models/authModel.js'

const emailSchema = z.object({
  email: z.email().min(4).max(100),
})

export const recoveryController = async (req: Request, res: Response) => {
  const { email }  = req.body
  emailSchema.parse({ email })
  logger.info(`try to recovery password with: ${email}`)
  const recoveryToken = crypto.randomBytes(32).toString('hex')
  const responseDbSearch = await searchEmailRegistered(email)

  if(!responseDbSearch.rowCount) {
    logger.warn('email not found')
    return res.status(404).json({ message: 'Email não cadastrado' })
  } else {

    await insertRecoveryTokenInDB(responseDbSearch.rows[0]!, recoveryToken)
  }

  const transporter = createTransport({
    host: 'sandbox.smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: process.env.USERNAME_MAILER,
      pass: process.env.USER_PASSWORD_TRANSPORTER_MAILER,
    },
  })

  const sendEmail = async () => {
    const info = await transporter.sendMail({
      from: '"Maddison Foo Koch" <maddison53@ethereal.email>',
      to: 'bar@example.com, baz@example.com',
      subject: 'Redefinição de senha de usuário',
      text: '',
      html: `<p> Para redefinir sua senha, clique no link abaixo <p/>
    <a href="http://localhost:3000/auth/reset-password/?recoveryToken=${recoveryToken}">
            Redefinir Senha
          </a>`,

    })

    logger.info('Message sent:', info.messageId)
  }

  sendEmail().catch(console.error)

  res.status(200).json({
    message: 'email encontrado. inserindo na tabela recovery...',
    data: responseDbSearch.rows[0]!.email,
    code: recoveryToken,
  })
}
