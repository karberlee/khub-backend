import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common'
import { Request, Response } from 'express'

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const request = host.switchToHttp().getRequest<Request>()
    const response = host.switchToHttp().getResponse<Response>()
    const status = exception.getStatus()
    const message = exception.message || 'Internal server error'
    const type = exception.name

    response
      .status(status)
      .json({
        code: status,
        message,
        type,
        timestamp: new Date().toISOString(),
        path: request.url,
      })
  }
}
