import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common'
import { Observable, tap, map } from 'rxjs'

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
    const startTime = Date.now()
    const request = context.switchToHttp().getRequest()

    // Log request details
    $.logger.info(`[Request Started] ${request.method} ${request.url} - ${startTime}`)
    $.logger.info(`[Request Body]`, request.body)

    return next.handle().pipe(
      tap((data) => {
        const duration = Date.now() - startTime
        $.logger.info(`[Request Ended] ${request.method} ${request.url} - ${duration}ms`)
        $.logger.info(`[Response Body]`, data)
      }),
      map((data) => {
        return {
          code: 0,
          body: data,
        };
      }),
    )
  }
}
