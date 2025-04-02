import { IsOptional, IsBoolean } from 'class-validator'
import { PartialType } from '@nestjs/mapped-types';
import { ApiPropertyOptional } from '@nestjs/swagger'
import { CreateWorkspaceDto } from './create-workspace.dto'

export class UpdateWorkspaceDto extends PartialType(CreateWorkspaceDto) {
  @IsOptional()
  @IsBoolean()
  @ApiPropertyOptional({
    description: 'Is the workspace active',
    example: true,
  })
  readonly active?: boolean
}
