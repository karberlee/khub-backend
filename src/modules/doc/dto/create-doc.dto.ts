import { IsString, IsArray, IsBoolean, IsOptional } from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { Type } from 'class-transformer'

export class CreateDocDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'The owner id of the doc',
    example: '66fa3cf3edb76dda1b355941',
  })
  userId?: string

  @IsString()
  @ApiProperty({
    description: 'The title of the doc',
    example: 'My Doc',
  })
  readonly title: string

  @IsOptional()
  @IsArray()
  @ApiPropertyOptional({
    description: 'The tags of the doc',
    example: ['Linux', 'Docker', 'DevOps'],
  })
  readonly tags?: string[]

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'The content of the doc',
    example: 'My doc content.',
  })
  readonly content?: string

  @IsBoolean()
  @ApiProperty({
    description: 'The publish status of the doc',
    example: true,
  })
  readonly public: boolean

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'The create time of the doc',
    example: '2000-01-01 09:00',
  })
  createTime?: string

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'The update time of the doc',
    example: '2020-01-01 09:00',
  })
  updateTime?: string
}
