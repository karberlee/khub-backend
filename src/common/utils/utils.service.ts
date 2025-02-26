import { Injectable } from '@nestjs/common'
import { randomInt } from 'crypto'

@Injectable()
export class UtilsService {
  generateVerifyCode(length: number): string {
    let verifyCode = ''
    for (let i = 0; i < length; i++) {
      const randomDigit = randomInt(0, 10)
      verifyCode += randomDigit.toString()
    }
    return verifyCode
  }
}