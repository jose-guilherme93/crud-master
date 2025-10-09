import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import { logger } from '../logger.js'

dotenv.config()


export const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization

    if(!authHeader || !authHeader.startsWith("Bearer ")) {

        return res.status(401).json({message:"token não fornecido ou inválido"})
    }

    const token = authHeader.split(" ")[1]

    try {
        const decoded = jwt.verify(token, process.env.JSON_WEB_TOKEN)
        req.user = decoded
        logger.info("jwt decoded",decoded)
        next()
    } catch (error) {
        res.status(401).json({message:"token inválido"})
    }
    
}

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

    next();
  };
};
