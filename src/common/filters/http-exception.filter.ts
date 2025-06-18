import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common'
import { Request, Response } from 'express'

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const request = host.switchToHttp().getRequest<Request>()
    const response = host.switchToHttp().getResponse<Response>()
    const status = exception.getStatus()
    const message = exception.message || 'Internal server error'
    // const type = exception.name

    // 获取异常的详细内容
    const exceptionResponse = exception.getResponse()
    const detail = exceptionResponse['message'] || ''

    // 处理自定义字段 errorType
    let errType = 0
    if (exceptionResponse && typeof exceptionResponse === 'object' && 'errType' in exceptionResponse) {
      errType = exceptionResponse['errType'] as number
    }

    $.logger.error(`API ${request.url} exception:`, exceptionResponse)

    response
      .status(status)
      .json({
        code: status,
        message,
        errType,
        detail,
        // type,
        // timestamp: new Date().toISOString(),
        // path: request.url,
      })
  }
}
