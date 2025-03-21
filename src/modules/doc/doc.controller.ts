import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger'
import { ParseObjectIdPipe } from '@/common/pipes/parse-object-id.pipe'
import { Request } from 'express'
import { DocService } from './doc.service'
import { CreateDocDto } from './dto/create-doc.dto'
import { UpdateDocDto } from './dto/update-doc.dto'
import { ReqUserDto } from '@/modules/user/dto/req-user.dto'

@ApiTags('Doc')
@Controller('doc')
export class DocController {
  constructor(private readonly docService: DocService) {}

  @Post()
  @ApiOperation({ summary: 'Create doc' })
  @ApiBody({
    description: 'The doc to create',
    type: CreateDocDto,
  })
  @ApiResponse({ status: 201, description: 'Successful response' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  create(@Req() req: Request, @Body() createDocDto: CreateDocDto) {
    const user = req['user'] as ReqUserDto
    return this.docService.create(user, createDocDto)
  }

  @Get()
  @ApiOperation({ summary: 'Find all doc' })
  @ApiResponse({ status: 200, description: 'Successful response' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  findAll(@Req() req: Request) {
    const user = req['user'] as ReqUserDto
    const query = req.query
    return this.docService.findAll(user, query)
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find doc by ID' })
  @ApiParam({ name: 'id', description: 'The doc ID', type: String })
  @ApiResponse({ status: 200, description: 'Successful response' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  findOne(@Req() req: Request, @Param('id', ParseObjectIdPipe) id: string) {
    const user = req['user'] as ReqUserDto
    return this.docService.findOne(user, id)
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update doc by ID' })
  @ApiParam({ name: 'id', description: 'The doc ID', type: String })
  @ApiBody({
    description: 'The doc to update',
    type: UpdateDocDto,
  })
  @ApiResponse({ status: 200, description: 'Successful response' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  update(@Req() req: Request, @Param('id', ParseObjectIdPipe) id: string, @Body() updateDocDto: UpdateDocDto) {
    const user = req['user'] as ReqUserDto
    return this.docService.update(user, id, updateDocDto)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete doc by ID' })
  @ApiParam({ name: 'id', description: 'The doc ID', type: String })
  @ApiResponse({ status: 200, description: 'Successful response' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  remove(@Req() req: Request, @Param('id', ParseObjectIdPipe) id: string) {
    const user = req['user'] as ReqUserDto
    return this.docService.remove(user, id)
  }
}
