import { IsString, IsInt } from 'class-validator'
import { Type } from 'class-transformer'

export class CreateUserDto {
  @IsString()
  readonly account: string

  @IsString()
  readonly password: string

  @Type(() => Number)  // 确保转换为数字
  @IsInt()
  readonly role: number
}
