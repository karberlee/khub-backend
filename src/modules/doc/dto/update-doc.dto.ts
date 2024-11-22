import { IsString, IsBoolean, IsArray } from 'class-validator'
import { PartialType } from '@nestjs/mapped-types'
import { ApiPropertyOptional } from '@nestjs/swagger'
import { CreateDocDto } from './create-doc.dto'

export class UpdateDocDto extends PartialType(CreateDocDto) {
  @IsString()
  @ApiPropertyOptional({
    description: 'The title of the doc',
    example: 'My Doc',
  })
  readonly title?: string

  @IsArray()
  @ApiPropertyOptional({
    description: 'The tags of the doc',
    example: ['Linux', 'Docker', 'DevOps'],
  })
  readonly tags?: string[]

  @IsString()
  @ApiPropertyOptional({
    description: 'The content of the doc',
    example: 'My doc content.',
  })
  readonly content?: string

  @IsBoolean()
  @ApiPropertyOptional({
    description: 'The publish status of the doc',
    example: true,
  })
  readonly public?: boolean
}
