import { createLogger, format, transports } from 'winston';

const { combine, timestamp, printf, colorize } = format;

const customFormat = printf(info => {
  const icons = {
    info: 'ℹ️',
    warn: '⚠️',
    error: '❌',
    debug: '🐛'
  };
  return `${info.timestamp} ${icons[info.level] || ''} [${info.level.toUpperCase()}]: ${info.message}`;
});

export const logger = createLogger({
  level: 'info',
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), // primeiro timestamp
    customFormat,                                 // depois o formato
    colorize({ all: true })                       // por último a cor
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'app.log' })
  ]
});

