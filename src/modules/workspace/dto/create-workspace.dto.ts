import { IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateWorkspaceDto {
  @IsString()
  @ApiProperty({
    description: 'The name of the workspace',
    example: 'My Workspace',
  })
  readonly name: string
}
