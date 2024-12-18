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
export class TokenInterceptor implements NestInterceptor {
  private readonly JWT_EXPIRES: string = process.env.JWT_EXPIRES

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const response = context.switchToHttp().getResponse()

    return next.handle().pipe(
      tap((data) => {
        const user = data.body
        if (user) {
          const token = JWT.generateToken(
            { _id: user._id, account: user.account, type: user.type, role: user.role },
            { expiresIn: this.JWT_EXPIRES }
          )
          response.setHeader('Authorization', `Bearer ${token}`)
        }
      }),
    )
  }
}
