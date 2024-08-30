import { IsString, IsInt } from 'class-validator'
import { PartialType } from '@nestjs/mapped-types'
import { CreateSiteDto } from './create-site.dto'

export class UpdateSiteDto extends PartialType(CreateSiteDto) {
  @IsString()
  readonly siteName?: string

  @IsString()
  readonly siteLink?: string

  @IsString()
  readonly account?: string

  @IsString()
  readonly password?: string

  @IsString()
  readonly description?: string
}
