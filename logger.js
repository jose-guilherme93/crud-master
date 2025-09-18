
import { createLogger, format, transports } from 'winston';

const { combine, timestamp, printf, colorize } = format;

// Define o formato customizado do log
const customFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}]: ${message}`;
});


const logger = createLogger({
  level: 'info',
  format: combine(
    colorize(),         
    timestamp(),        
    customFormat        
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'app.log' }) 
  ]
});

// Função utilitária para logar mensagens de nível 'info'
function info(message) {
  logger.info(message);
}

export { logger, info };
