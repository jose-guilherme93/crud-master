import { createLogger, format, transports } from 'winston'
import LokiTransport from 'winston-loki'

const { combine, timestamp, printf } = format

const customFormat = printf(info => {
  const icons = {
    info: 'ℹ️',
    warn: '⚠️',
    error: '❌',
    debug: '🐛',
  }
  return `${info.timestamp} ${icons[info.level as keyof typeof icons] || ''} [${info.level.toUpperCase()}]: ${info.message}`
})

export const logger = createLogger({
  level: 'info',
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    customFormat,
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'app.log' }),
    new LokiTransport({
      host: 'http://loki:3100',
      labels: { job: 'gamecatalog-app' },
      json: true,
      level: 'silly',
      format: format.combine(
        format.timestamp(),
        format.json(),
      ),
    }),
  ],
})
