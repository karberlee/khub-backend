import { IsString, IsInt } from 'class-validator'
import { PartialType } from '@nestjs/mapped-types'
import { ApiPropertyOptional } from '@nestjs/swagger'
import { CreateNoteDto } from './create-note.dto'

export class UpdateNoteDto extends PartialType(CreateNoteDto) {
  @IsString()
  @ApiPropertyOptional({
    description: 'The title of the note',
    example: 'My Note',
  })
  readonly title?: string

  @IsString()
  @ApiPropertyOptional({
    description: 'The content of the note',
    example: 'My note content.',
  })
  readonly content?: string

  @IsInt()
  @ApiPropertyOptional({
    description: 'The level of the note',
    example: 0,
  })
  readonly level?: number
}