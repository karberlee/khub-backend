import { IsString, IsInt, IsOptional } from 'class-validator'
import { Type } from 'class-transformer'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class CreateUserDto {
  @IsString()
  @ApiProperty({
    description: 'The account of the user',
    example: 'account',
  })
  account: string

  @IsString()
  @ApiProperty({
    description: 'The password of the user',
    example: 'password',
  })
  readonly password: string

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'The name of the user',
    example: 'name',
  })
  name?: string

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'The avatar of the user',
    example: 'https://xxx.com/user/avatar/xxx.jpg',
  })
  avatar?: string

  @IsOptional() // 指示 role 是可选的
  @Type(() => Number)  // 确保转换为数字
  @IsInt()
  @ApiPropertyOptional({
    description: 'The role of the user',
    example: 1,
  })
  role?: number

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'The type of the account',
    example: 'email_signup',
  })
  type?: string

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'The create time of the user',
    example: '2000-01-01 09:00',
  })
  createTime?: string

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'The verify code to sign up',
    example: '123456',
  })
  readonly verifyCode?: string
}
