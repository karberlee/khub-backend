import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common'
import { ParseObjectIdPipe } from '@/common/pipes/parse-object-id.pipe'
import { Request } from 'express'
import { WorkspaceService } from './workspace.service'
import { CreateWorkspaceDto } from './dto/create-workspace.dto'
import { UpdateWorkspaceDto } from './dto/update-workspace.dto'
import { ReqUserDto } from '@/modules/user/dto/req-user.dto'

@Controller('workspace')
export class WorkspaceController {
  constructor(private readonly workspaceService: WorkspaceService) {}

  @Post()
  create(@Req() req: Request, @Body() createWorkspaceDto: CreateWorkspaceDto) {
    const user = req['user'] as ReqUserDto
    return this.workspaceService.create(user, createWorkspaceDto)
  }

  @Get()
  findAll(@Req() req: Request) {
    const user = req['user'] as ReqUserDto
    const query = req.query
    return this.workspaceService.findAll(user, query)
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.workspaceService.findOne(+id);
  // }

  @Patch(':id')
  update(@Req() req: Request, @Param('id', ParseObjectIdPipe) id: string,  @Body() updateWorkspaceDto: UpdateWorkspaceDto) {
    const user = req['user'] as ReqUserDto
    return this.workspaceService.update(user, id, updateWorkspaceDto);
  }

  @Delete(':id')
  remove(@Req() req: Request, @Param('id', ParseObjectIdPipe) id: string) {
    const user = req['user'] as ReqUserDto
    return this.workspaceService.remove(user, id)
  }
}
