import { Controller, Get, Post, Body, Req, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common'
import { Request } from 'express'
import { ParseObjectIdPipe } from '@/common/pipes/parse-object-id.pipe'
import { ResourceAccessGuard } from '@/common/guards/resource-access.guard'
import { AssetService } from './asset.service'
import { CreateAssetDto } from './dto/create-asset.dto'
import { GetAssetDto } from './dto/get-asset.dto'
import { UpdateAssetDto } from './dto/update-asset.dto'
import { ReqUserDto } from '@/modules/user/dto/req-user.dto'

@Controller('asset')
@UseGuards(ResourceAccessGuard)  // 为控制器中的所有方法使用守卫
export class AssetController {
  constructor(private readonly assetService: AssetService) {}

  @Post()
  create(@Body() createAssetDto: CreateAssetDto) {
    return this.assetService.create(createAssetDto)
  }

  @Get()
  findAll(@Req() req: Request, @Query() query: GetAssetDto) {
    const user = req['user'] as ReqUserDto
    return this.assetService.findAll(user, query)
  }

  @Get(':id')
  findOne(@Param('id', ParseObjectIdPipe) id: string,) {
    return this.assetService.findOne(id)
  }

  @Patch(':id')
  update(@Param('id', ParseObjectIdPipe) id: string, @Body() updateAssetDto: UpdateAssetDto) {
    return this.assetService.update(id, updateAssetDto)
  }

  @Delete(':id')
  remove(@Param('id', ParseObjectIdPipe) id: string) {
    return this.assetService.remove(id)
  }
}
