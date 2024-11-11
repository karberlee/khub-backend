import { randomInt } from 'crypto'

export const successRes = function(code: number, body: any): object {
  return { code, body }
}

export const failRes = function(code: number, message: string): object {
  return { code, message }
}

export const generateVerifyCode = function(length: number): string {
  let verifyCode = ''
  for (let i = 0; i < length; i++) {
    const randomDigit = randomInt(0, 10)
    verifyCode += randomDigit.toString()
  }
  return verifyCode
}