import { IsString, IsInt, IsOptional } from 'class-validator'
import { Type } from 'class-transformer'

export class GetAssetDto {
  @IsString()
  workspaceId: string

  @IsOptional()
  @IsString()
  search?: string

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  status?: number
}
