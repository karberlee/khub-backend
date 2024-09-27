import { sign, verify, SignOptions, VerifyOptions } from 'jsonwebtoken'

const secretKey: string = 'my_jwt_token'
const defaultSignOptions: SignOptions = { expiresIn: '1h' }

export const JWT = {
  // 生成 JWT
  generateToken(payload: object, options?: SignOptions): string {
    return sign(payload, secretKey, { ...defaultSignOptions, ...options })
  },

  // 验证 JWT
  verifyToken(token: string, options?: VerifyOptions): object | string | boolean {
    try {
      return verify(token, secretKey, options)
    } catch (err) {
      return false
    }
  }
}