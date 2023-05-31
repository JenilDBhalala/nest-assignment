import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { errorLogger, infoLogger } from 'src/utils/winston.logger';

@Catch()
export class AppExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const res = host.switchToHttp().getResponse();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal Server Error';

    //handling HttpException
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.message;

      //setting message of validation errors thrown by class-validators
      const response: any = exception.getResponse();

      if (response.message) {
        message = response.message;
      }
    }

    const body = {
      statusCode: status,
      message,
    };

    const logObj =
      process.env['ENVIRONMENT'] === 'developement'
        ? {
            timestamp: new Date().toLocaleString(),
            exception,
            path: exception.stack,
          }
        : {
            timestamp: new Date().toLocaleString(),
            exception,
          };

    //bad request exceptions will log into info_logger directory
    if (body.statusCode === HttpStatus.BAD_REQUEST) {
      infoLogger.info(logObj);
    } else {
      errorLogger.error(logObj);
    }

    res.status(status).json(body);
  }
}
