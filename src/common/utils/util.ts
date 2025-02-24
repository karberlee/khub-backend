import { randomInt } from 'crypto'

export const generateVerifyCode = function(length: number): string {
  let verifyCode = ''
  for (let i = 0; i < length; i++) {
    const randomDigit = randomInt(0, 10)
    verifyCode += randomDigit.toString()
  }
  return verifyCode
}