import { IsString } from 'class-validator'

export class CreateSiteDto {
  @IsString()
  readonly siteName: string

  @IsString()
  readonly siteLink: string

  @IsString()
  readonly account: string

  @IsString()
  readonly password: string

  @IsString()
  readonly description: string
}
