import { IsString, IsInt } from 'class-validator'
import { PartialType } from '@nestjs/mapped-types'
import { ApiPropertyOptional } from '@nestjs/swagger'
import { CreateSiteDto } from './create-site.dto'

export class UpdateSiteDto extends PartialType(CreateSiteDto) {
  @IsString()
  @ApiPropertyOptional({
    description: 'The name of the site',
    example: 'Google',
  })
  readonly siteName?: string

  @IsString()
  @ApiPropertyOptional({
    description: 'The link of the site',
    example: 'https://google.com',
  })
  readonly siteLink?: string

  @IsString()
  @ApiPropertyOptional({
    description: 'The account of the site',
    example: 'email@example.com',
  })
  readonly account?: string

  @IsString()
  @ApiPropertyOptional({
    description: 'The password of the site account',
    example: 'password',
  })
  readonly password?: string

  @IsString()
  @ApiPropertyOptional({
    description: 'The description of the site',
    example: 'site description',
  })
  readonly description?: string
}
