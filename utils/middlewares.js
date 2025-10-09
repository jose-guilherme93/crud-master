import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import { logger } from '../logger.js'

dotenv.config()

export const validateIdParam = (req, res, next) => {
    const {id} = req.params
    if(!id || id.trim() === '') {

        return res.status(400).json({message: "é necessáirio fornecer um id válido"})
    }

    next()
}


export const validateBodyFields = (requiredFields = []) => {
  return (req, res, next) => {
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




export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"]
  const token = authHeader && authHeader.split(" ")[1]
  if (!token) return res.status(401).json({ message: "Token não fornecido" })

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Token inválido" })
    req.user = user
    next()
  });
}

