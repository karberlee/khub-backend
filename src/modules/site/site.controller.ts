import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger'
import { ParseObjectIdPipe } from '@/common/pipes/parse-object-id.pipe'
import { SiteService } from './site.service'
import { CreateSiteDto } from './dto/create-site.dto'
import { UpdateSiteDto } from './dto/update-site.dto'

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
  create(@Body() createSiteDto: CreateSiteDto) {
    return this.siteService.create(createSiteDto)
  }

  @Get()
  @ApiOperation({ summary: 'Find all site' })
  @ApiResponse({ status: 200, description: 'Successful response' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  findAll() {
    return this.siteService.findAll()
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find site by ID' })
  @ApiParam({ name: 'id', description: 'The site ID', type: String })
  @ApiResponse({ status: 200, description: 'Successful response' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  findOne(@Param('id', ParseObjectIdPipe) id: string) {
    return this.siteService.findOne(id)
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
  update(@Param('id', ParseObjectIdPipe) id: string, @Body() updateSiteDto: UpdateSiteDto) {
    return this.siteService.update(id, updateSiteDto)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete site by ID' })
  @ApiParam({ name: 'id', description: 'The site ID', type: String })
  @ApiResponse({ status: 200, description: 'Successful response' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  remove(@Param('id', ParseObjectIdPipe) id: string) {
    return this.siteService.remove(id)
  }
}
