import { Injectable } from '@nestjs/common'
import { sign, verify, SignOptions, VerifyOptions } from 'jsonwebtoken'

@Injectable()
export class JWTService {
  private readonly jwtSecret: string;
  private readonly jwtExpires: string;
  private readonly defaultSignOptions: SignOptions;

  constructor() {
    this.jwtSecret = process.env.JWT_SECRET_KEY
    this.jwtExpires = process.env.JWT_EXPIRES
    this.defaultSignOptions = { expiresIn: this.jwtExpires };
  }

  // 生成 Token
  generateToken(payload: object, options?: SignOptions): string {
    return sign(payload, this.jwtSecret, { ...this.defaultSignOptions, ...options })
  }

  // 验证 Token
  verifyToken(token: string, options?: VerifyOptions): object | string | boolean {
    try {
      return verify(token, this.jwtSecret, options)
    } catch (err) {
      return false
    }
  }

  // 刷新 Token
  refreshToken(token: string, options?: SignOptions): string | boolean {
    const payload: any = this.verifyToken(token)
    if (payload) {
      return this.generateToken(
        { _id: payload._id, account: payload.account, role: payload.role },
        { ...this.defaultSignOptions, ...options }
      )
    }
    return false
  }

}