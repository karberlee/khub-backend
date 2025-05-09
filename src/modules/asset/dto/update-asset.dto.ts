import { PartialType } from '@nestjs/mapped-types'
import { CreateAssetDto } from './create-asset.dto'
import { ValidateIf } from 'class-validator'
import { ApiPropertyOptional } from '@nestjs/swagger'

export class UpdateAssetDto extends PartialType(CreateAssetDto) {
  @ValidateIf(() => false) // 永远不会被验证（相当于禁用）
  @ApiPropertyOptional({ description: 'Workspace ID should not be updated', deprecated: true, type: () => String })
  readonly workspaceId?: never // 使用 `never` 提示它不应该存在
}
