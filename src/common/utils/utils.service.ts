import { Injectable, BadRequestException } from '@nestjs/common'
import { randomInt } from 'crypto'
import { Types } from 'mongoose'

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

  toObjectId(id: string | Types.ObjectId): Types.ObjectId {
    if (id instanceof Types.ObjectId) return id
    if (typeof id === 'string' && Types.ObjectId.isValid(id)) {
      return new Types.ObjectId(id)
    }
    throw new BadRequestException({
      errType: 1,
      message: `Invalid ObjectId: ${id}`
    })
  }
}