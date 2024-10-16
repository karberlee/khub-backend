import { IsString, IsInt, IsOptional } from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { Type } from 'class-transformer'

export class CreateNoteDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'The owner id of the note',
    example: '66fa3cf3edb76dda1b355941',
  })
  userId?: string

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'The title of the note',
    example: 'My Note',
  })
  readonly title?: string

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'The content of the note',
    example: 'My note content.',
  })
  readonly content?: string

  @IsOptional()
  @Type(() => Number)  // 确保转换为数字
  @IsInt()
  @ApiPropertyOptional({
    description: 'The level of the note',
    example: 0,
  })
  level?: number

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'The create time of the note',
    example: '2000-01-01 09:00',
  })
  createTime?: string

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'The update time of the note',
    example: '2020-01-01 09:00',
  })
  updateTime?: string
}
