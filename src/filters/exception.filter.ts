import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

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

      //setting message of validation errors thrown by  class-validators
      const response: any = exception.getResponse();

      if (response.message) {
        message = response.message;
      }
    }

    const body = {
      statusCode: status,
      message,
    };

    res.status(status).json(body);
  }
}
