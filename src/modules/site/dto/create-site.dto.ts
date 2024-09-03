import { IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateSiteDto {
  @IsString()
  @ApiProperty({
    description: 'The name of the site',
    example: 'Google',
  })
  readonly siteName: string

  @IsString()
  @ApiProperty({
    description: 'The link of the site',
    example: 'https://google.com',
  })
  readonly siteLink: string

  @IsString()
  @ApiProperty({
    description: 'The account of the site',
    example: 'email@example.com',
  })
  readonly account: string

  @IsString()
  @ApiProperty({
    description: 'The password of the site account',
    example: 'password',
  })
  readonly password: string

  @IsString()
  @ApiProperty({
    description: 'The description of the site',
    example: 'site description',
  })
  readonly description: string
}
