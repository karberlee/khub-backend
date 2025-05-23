import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger'
import { ParseObjectIdPipe } from '@/common/pipes/parse-object-id.pipe'
import { Request } from 'express'
import { SiteService } from './site.service'
import { CreateSiteDto } from './dto/create-site.dto'
import { UpdateSiteDto } from './dto/update-site.dto'
import { ReqUserDto } from '@/modules/user/dto/req-user.dto'

@ApiTags('Site')
@Controller('site')
export class SiteController {
  constructor(private readonly siteService: SiteService) {}

  @Post()
  @ApiOperation({ summary: 'Create site' })
  @ApiBody({
    description: 'The site info to create',
    type: CreateSiteDto,
  })
  @ApiResponse({ status: 201, description: 'Successful response' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  create(@Req() req: Request, @Body() createSiteDto: CreateSiteDto) {
    const user = req['user'] as ReqUserDto
    return this.siteService.create(user, createSiteDto)
  }

  @Get()
  @ApiOperation({ summary: 'Find all site' })
  @ApiResponse({ status: 200, description: 'Successful response' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  findAll(@Req() req: Request) {
    const user = req['user'] as ReqUserDto
    return this.siteService.findAll(user)
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find site by ID' })
  @ApiParam({ name: 'id', description: 'The site ID', type: String })
  @ApiResponse({ status: 200, description: 'Successful response' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  findOne(@Req() req: Request, @Param('id', ParseObjectIdPipe) id: string) {
    const user = req['user'] as ReqUserDto
    return this.siteService.findOne(user, id)
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update site by ID' })
  @ApiParam({ name: 'id', description: 'The site ID', type: String })
  @ApiBody({
    description: 'The site info to update',
    type: UpdateSiteDto,
  })
  @ApiResponse({ status: 200, description: 'Successful response' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  update(@Req() req: Request, @Param('id', ParseObjectIdPipe) id: string, @Body() updateSiteDto: UpdateSiteDto) {
    const user = req['user'] as ReqUserDto
    return this.siteService.update(user, id, updateSiteDto)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete site by ID' })
  @ApiParam({ name: 'id', description: 'The site ID', type: String })
  @ApiResponse({ status: 200, description: 'Successful response' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  remove(@Req() req: Request, @Param('id', ParseObjectIdPipe) id: string) {
    const user = req['user'] as ReqUserDto
    return this.siteService.remove(user, id)
  }
}
