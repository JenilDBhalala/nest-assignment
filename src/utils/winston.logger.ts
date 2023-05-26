import * as winston from 'winston';
import 'winston-daily-rotate-file';

//for bad request exceptions
export const infoLogger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.DailyRotateFile({
      datePattern: 'YYYY-MM-DD',
      filename: 'logs/info_logs/info-%DATE%.log',
    }),
  ],
});

//for any other types of exceptions
export const errorLogger = winston.createLogger({
  level: 'error',
  format: winston.format.json(),
  transports: [
    new winston.transports.DailyRotateFile({
      datePattern: 'YYYY-MM-DD',
      filename: 'logs/error_logs/error-%DATE%.log',
    }),
  ],
});
