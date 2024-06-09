import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { response } from "express";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    try {
      console.log("Filter")
      const ctx = host.switchToHttp();
      const response = ctx.getResponse();
      const request = ctx.getRequest();
      const status = exception.getStatus();

      if (true) {
        console.log("In here")
        return {
          statusCode: status,
          message: exception.message,
        };
      } else {
        return {
          statusCode: status,
          message: exception.message,
          stack: exception.stack,
        };
      }
    } catch (error) {
      // Log the error or handle it in some way
      console.error(error);
      return {
        statusCode: 500,
        message: 'Internal Server Error',
      };
    }
  }
}