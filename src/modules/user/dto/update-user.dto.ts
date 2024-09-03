import { IsString, IsInt } from 'class-validator'
import { PartialType } from '@nestjs/mapped-types'
import { ApiPropertyOptional } from '@nestjs/swagger'
import { CreateUserDto } from './create-user.dto'

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  @ApiPropertyOptional({
    description: 'The account of the user',
    example: 'account',
  })
  readonly account?: string

  @IsString()
  @ApiPropertyOptional({
    description: 'The password of the user',
    example: 'password',
  })
  readonly password?: string

  @IsInt()
  @ApiPropertyOptional({
    description: 'The role of the user',
    example: 1,
  })
  readonly role?: number
}
