import { IsString, IsNumber, IsArray, IsOptional } from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class CreateAssetDto {
  @IsString()
  @ApiProperty({
    description: 'The workspace id of the asset',
    example: '66fa3cf3edb76dda1b355941',
  })
  readonly workspaceId: string

  @IsString()
  @ApiProperty({
    description: 'The name of the asset',
    example: 'My Asset',
  })
  readonly name: string

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional({
    description: 'The price of the asset',
    example: 88,
  })
  readonly price?: number

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'The obtainDate of the asset',
    example: '2000-01-01',
  })
  readonly obtainDate?: string

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'The obtainWay of the asset',
    example: 'online',
  })
  readonly obtainWay?: string

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'The category of the asset',
    example: '3C',
  })
  readonly category?: string

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional({
    description: 'The status of the asset',
    example: 1,
  })
  readonly status?: number

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'The thumbnail of the asset',
    example: 'https://domain/path/to/image',
  })
  readonly thumbnail?: string

  @IsOptional()
  @IsArray()
  @ApiPropertyOptional({
    description: 'The images of the asset',
    example: ['https://domain/path/to/image1', 'https://domain/path/to/image2'],
  })
  readonly images?: string[]

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'The comment of the asset',
    example: 'great goods',
  })
  readonly comment?: string
}
