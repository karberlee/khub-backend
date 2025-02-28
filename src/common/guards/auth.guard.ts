import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common'
import { JWTService } from '@/common/utils/jwt.service'

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly authApiList: string[]

  constructor(
    private readonly jwtService: JWTService,
  ) {
    this.authApiList = [
      '/auth/login',
      '/auth/signup',
      '/auth/sendCode',
      '/auth/github/callback',
      '/prometheus/metrics',
      '/health',
    ]
  }

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest()
    const url = request.url
    
    // 忽略 login 请求
    if (url.startsWith('/auth') || this.authApiList.indexOf(url) > -1) return true

    const token = request.headers['authorization']?.split(' ')[1] // 获取 Bearer token
    if (!token) {
      throw new ForbiddenException({
        errType: 1,
        message: `Forbidden! Authorization token missing!`
      })
    }

    try {
      const decoded = this.jwtService.verifyToken(token)
      if (!decoded) {
        throw new ForbiddenException({
          errType: 2,
          message: `Forbidden! Invalid token!`
        })
      }
      request.user = decoded // 将解码后的用户信息附加到请求对象上
      return true
    } catch (error) {
      $.logger.error("error:", error)
      throw error
    }
  }
}
