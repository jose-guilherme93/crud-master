import { logger } from '@/scripts/logger.js'
import type { NextFunction, Response, Request } from 'express'
import jwt from 'jsonwebtoken'
import { finished } from 'node:stream'

export const validateBodyFields = (requiredFields = []) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const missingFields = requiredFields.filter(field => {
      const value = req.body[field]
      return value === undefined || value === null || value === ''
    })

    if (Object.keys(req.body).length <= 0 || missingFields.length > 0) {
      return res.status(400).json({
        message: `Campos obrigatórios ausentes para criar PUT: ${missingFields.join(', ')}`,
      })
    }

    next()
  }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (!token) return res.status(401).json({ message: 'Token não fornecido' })

  const jwtSecret = process.env.JWT_SECRET
  if (!jwtSecret) return res.status(500).json({ message: 'JWT_SECRET undefined' })

  jwt.verify(token, jwtSecret, (err, user) => {
    if (err) return res.status(403).json({ message: 'Token inválido' })
    req.user = user
    next()
  })
}

/**
 * @description Cria um middleware do Express para loggar detalhes de requisições HTTP
 * no logger Winston após a resposta ser enviada.
 *
 * @param {Request} req - Objeto de requisição do Express
 * @param {Response} res - Objeto de resposta do Express
 * @param {NextFunction} next - Função para passar para o próximo middleware
 */
export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {

  const start = Date.now()

  finished(res, (err) => {
    const duration = Date.now() - start
    const { method, url } = req
    const { statusCode } = res

    if (err) {
      logger.error(`[HTTP-Error] Falha ao logar requisição para ${method} ${url}: ${err.message}`)
      return
    }

    const logMessage = `[HTTP] ${method} ${url} - Status: ${statusCode} - Duração: ${duration}ms`

    if (statusCode >= 500) logger.error(logMessage)
    else if (statusCode >= 400) logger.warn(logMessage)
    else logger.info(logMessage)
  })

  next()
}
