import { sign, verify, SignOptions, VerifyOptions } from 'jsonwebtoken'

const secretKey: string = process.env.JWT_SECRET_KEY
const defaultSignOptions: SignOptions = { expiresIn: process.env.JWT_EXPIRES }

export const JWT = {
  // 生成 Token
  generateToken(payload: object, options?: SignOptions): string {
    return sign(payload, secretKey, { ...defaultSignOptions, ...options })
  },

  // 验证 Token
  verifyToken(token: string, options?: VerifyOptions): object | string | boolean {
    try {
      return verify(token, secretKey, options)
    } catch (err) {
      return false
    }
  },

  // 刷新 Token
  refreshToken(token: string, options?: SignOptions): string | boolean {
    const payload = this.verifyToken(token)
    if (payload) {
      return this.generateToken({ _id: payload._id, account: payload.account, role: payload.role }, options)
    }
    return false
  }
}