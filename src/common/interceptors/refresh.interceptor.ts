import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'
import { JWT } from '@/common/utils/jwt'

@Injectable()
export class RefreshInterceptor implements NestInterceptor {
  private readonly JWT_EXPIRES: string = process.env.JWT_EXPIRES

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest()
    const response = context.switchToHttp().getResponse()
    const url = request.url

    const token = request.headers['authorization']?.split(' ')[1] // 获取 Bearer token

    return next.handle().pipe(
      tap(() => {
        if (url.indexOf('/auth') === -1) {
          const newToken = JWT.refreshToken(token, { expiresIn: this.JWT_EXPIRES })
          if (newToken) {
            response.setHeader('Authorization', `Bearer ${newToken}`)
          }
        }
      }),
    )
  }
}
