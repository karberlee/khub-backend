import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common'
import { Observable, tap } from 'rxjs'
import { JWTService } from '@/common/utils/jwt.service'

@Injectable()
export class TokenInterceptor implements NestInterceptor {
  
  constructor(
    private readonly jwtService: JWTService,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const response = context.switchToHttp().getResponse()
    return next.handle().pipe(
      tap((data) => {
        if (data) {
          const token = this.jwtService.generateToken(
            { _id: data._id, account: data.account, type: data.type, role: data.role }
          )
          response.setHeader('Authorization', `Bearer ${token}`)
        }
      }),
    )
  }

}
