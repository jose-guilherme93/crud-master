import type { JwtPayload } from 'jsonwebtoken'
export {}

declare global {
  namespace Express {
    interface Request {
      user?: string | JwtPayload | undefined
    }
  }
}
