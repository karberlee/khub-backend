import { IsString, IsInt } from 'class-validator'
import { PartialType } from '@nestjs/mapped-types'
import { CreateUserDto } from './create-user.dto'

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  readonly account?: string

  @IsString()
  readonly password?: string

  @IsInt()
  readonly role?: number
}
