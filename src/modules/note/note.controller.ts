import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger'
import { ParseObjectIdPipe } from '@/common/pipes/parse-object-id.pipe'
import { Request } from 'express'
import { NoteService } from './note.service'
import { CreateNoteDto } from './dto/create-note.dto'
import { UpdateNoteDto } from './dto/update-note.dto'
import { ReqUserDto } from '@/modules/user/dto/req-user.dto'

@ApiTags('Note')
@Controller('note')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Post()
  @ApiOperation({ summary: 'Create note' })
  @ApiBody({
    description: 'The note info to create',
    type: CreateNoteDto,
  })
  @ApiResponse({ status: 201, description: 'Successful response' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  create(@Req() req: Request, @Body() createNoteDto: CreateNoteDto) {
    const user = req['user'] as ReqUserDto
    return this.noteService.create(user, createNoteDto)
  }

  @Get()
  @ApiOperation({ summary: 'Find all note' })
  @ApiResponse({ status: 200, description: 'Successful response' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  findAll(@Req() req: Request) {
    const user = req['user'] as ReqUserDto
    return this.noteService.findAll(user)
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find note by ID' })
  @ApiParam({ name: 'id', description: 'The note ID', type: String })
  @ApiResponse({ status: 200, description: 'Successful response' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  findOne(@Req() req: Request, @Param('id', ParseObjectIdPipe) id: string) {
    const user = req['user'] as ReqUserDto
    return this.noteService.findOne(user, id)
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update note by ID' })
  @ApiParam({ name: 'id', description: 'The note ID', type: String })
  @ApiBody({
    description: 'The note info to update',
    type: UpdateNoteDto,
  })
  @ApiResponse({ status: 200, description: 'Successful response' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  update(@Req() req: Request, @Param('id', ParseObjectIdPipe) id: string, @Body() updateNoteDto: UpdateNoteDto) {
    const user = req['user'] as ReqUserDto
    return this.noteService.update(user, id, updateNoteDto)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete note by ID' })
  @ApiParam({ name: 'id', description: 'The note ID', type: String })
  @ApiResponse({ status: 200, description: 'Successful response' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  remove(@Req() req: Request, @Param('id', ParseObjectIdPipe) id: string) {
    const user = req['user'] as ReqUserDto
    return this.noteService.remove(user, id)
  }
}
