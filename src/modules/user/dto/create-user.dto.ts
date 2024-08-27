import { IsString, IsInt } from 'class-validator'

export class CreateUserDto {
  @IsString()
  readonly account: string

  @IsString()
  readonly password: string

  @IsInt()
  readonly role: number
}
