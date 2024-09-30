import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common'
import { JWT } from '@/common/utils/jwt'

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly authApiList: String[] = [
    '/auth/login',
    '/auth/register'
  ]

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest()
    const url = request.url
    
    // 忽略 login 请求
    if (this.authApiList.indexOf(url) > -1) return true

    const token = request.headers['authorization']?.split(' ')[1] // 获取 Bearer token

    if (!token) {
      throw new ForbiddenException('Token is missing')
    }

    try {
      const decoded = JWT.verifyToken(token)
      if (!decoded) throw new ForbiddenException('Invalid token')
      request.user = decoded // 将解码后的用户信息附加到请求对象上
      return true
    } catch (error) {
      throw new ForbiddenException('Invalid token')
    }
  }
}
