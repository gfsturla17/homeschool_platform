import { ExceptionFilter, Catch, ArgumentsHost, HttpException, Logger, BadRequestException } from "@nestjs/common";
import { response } from "express";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    try {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse();
      const request = ctx.getRequest();
      const status = exception.getStatus();
      if (process.env.NODE_ENV === 'production') {
        return {
          statusCode: status,
          message: exception.message,
        };
      } else {

        let requestInfo = {
          statusCode: status,
          message: exception.message,
          stack: exception.stack,
        };
        if (exception instanceof BadRequestException) {
          console.log("Log Bad Request Details: ", exception.getResponse());
        }

        this.logger.error(requestInfo)
        return requestInfo;
      }
    } catch (error) {
      return {
        statusCode: 500,
        message: 'Internal Server Error',
      };
    }
  }
}