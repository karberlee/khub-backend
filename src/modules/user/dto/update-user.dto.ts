import { IsString, IsInt } from 'class-validator'
import { PartialType } from '@nestjs/mapped-types'
import { ApiPropertyOptional } from '@nestjs/swagger'
import { Type } from 'class-transformer'
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

  @IsString()
  @ApiPropertyOptional({
    description: 'The name of the user',
    example: 'name',
  })
  readonly name?: string

  @IsString()
  @ApiPropertyOptional({
    description: 'The avatar of the user',
    example: 'https://xxx.com/user/avatar/xxx.jpg',
  })
  readonly avatar?: string

  @Type(() => Number)  // 确保转换为数字
  @IsInt()
  @ApiPropertyOptional({
    description: 'The role of the user',
    example: 1,
  })
  readonly role?: number
}
