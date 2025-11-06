
import type { NextFunction, Response, Request } from 'express'
import jwt, { type JwtPayload } from 'jsonwebtoken'

declare global {
  namespace Express {
    interface Request {
      user?: string | JwtPayload | undefined
    }
  }
}


export const validateIdParam = (req: Request, res: Response, next: NextFunction) => {
    const {id} = req.params
    if(!id || id.trim() === '') {

        return res.status(400).json({message: "need a valid id"})
    }

    next()
}


export const validateBodyFields = (requiredFields = []) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const missingFields = requiredFields.filter(field => {
      const value = req.body[field]
      return value === undefined || value === null || value === ''
    })

    if (Object.keys(req.body).length <= 0 || missingFields.length > 0) {
      return res.status(400).json({
        message: `Campos obrigatórios ausentes para criar PUT: ${missingFields.join(', ')}`
      })
    }

    next()
  }
}



export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"]
  const token = authHeader && authHeader.split(" ")[1]
  if (!token) return res.status(401).json({ message: "Token não fornecido" })

  const jwtSecret = process.env.JWT_SECRET
  if (!jwtSecret) return res.status(500).json({ message: "JWT_SECRET undefined" })

  jwt.verify(token, jwtSecret, (err, user) => {
    if (err) return res.status(403).json({ message: "Token inválido" })
    req.user = user
    next()
  });
}

