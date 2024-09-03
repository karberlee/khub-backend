import { IsString, IsInt } from 'class-validator'
import { Type } from 'class-transformer'
import { ApiProperty } from '@nestjs/swagger'

export class CreateUserDto {
  @IsString()
  @ApiProperty({
    description: 'The account of the user',
    example: 'account',
  })
  readonly account: string

  @IsString()
  @ApiProperty({
    description: 'The password of the user',
    example: 'password',
  })
  readonly password: string

  @Type(() => Number)  // 确保转换为数字
  @IsInt()
  @ApiProperty({
    description: 'The role of the user',
    example: 1,
  })
  readonly role: number
}
