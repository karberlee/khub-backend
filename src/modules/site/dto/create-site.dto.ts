import { IsString, IsOptional } from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class CreateSiteDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'The owner id of the site',
    example: '66fa3cf3edb76dda1b355941',
  })
  userId?: string

  @IsString()
  @ApiProperty({
    description: 'The name of the site',
    example: 'Google',
  })
  readonly siteName: string

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'The link of the site',
    example: 'https://google.com',
  })
  readonly siteLink: string

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'The account of the site',
    example: 'email@example.com',
  })
  readonly account: string

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'The password of the site account',
    example: 'password',
  })
  readonly password: string

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'The description of the site',
    example: 'site description',
  })
  readonly description: string
}
