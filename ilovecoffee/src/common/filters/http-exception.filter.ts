import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Response } from 'express'; // << WICHTIG!

@Catch(HttpException)
export class HttpExceptionFilter<T extends HttpException> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    const message = (typeof exceptionResponse === 'string') ? exceptionResponse : exceptionResponse['message'] || 'unknown error';
    response.status(status).json({ message: message, timestamp: new Date().toISOString() });
  }
}
