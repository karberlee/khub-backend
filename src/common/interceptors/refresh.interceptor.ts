import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common'
import { Observable, tap } from 'rxjs'
import { JWTService } from '@/common/utils/jwt.service'

@Injectable()
export class RefreshInterceptor implements NestInterceptor {

  constructor(
    private readonly jwtService: JWTService,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest()
    const response = context.switchToHttp().getResponse()
    const url = request.url

    const token = request.headers['authorization']?.split(' ')[1] // 获取 Bearer token

    return next.handle().pipe(
      tap(() => {
        if (url.indexOf('/auth') === -1) {
          const newToken = this.jwtService.refreshToken(token)
          if (newToken) {
            response.setHeader('Authorization', `Bearer ${newToken}`)
          }
        }
      }),
    )
  }

}
