import { IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CheckUserDto {
  @IsString()
  @ApiProperty({
    description: 'The password of the user',
    example: 'password',
  })
  readonly password: string
}
