import { Injectable, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Asset } from './schemas/asset.schema'
import { CreateAssetDto } from './dto/create-asset.dto'
import { GetAssetDto } from './dto/get-asset.dto'
import { UpdateAssetDto } from './dto/update-asset.dto'
import { ReqUserDto } from '@/modules/user/dto/req-user.dto'

@Injectable()
export class AssetService {
  constructor(@InjectModel('Asset') private readonly assetModel: Model<Asset>) { }

  async create(createAssetDto: CreateAssetDto) {
    try {
      const assetObj = { ...createAssetDto }
      const asset = new this.assetModel(assetObj)
      const res = await asset.save()
      return res
    } catch (error) {
      $.logger.error("error:", error)
      throw error
    }
  }

  async findAll(user: ReqUserDto, query: GetAssetDto) {
    try {
      const selector: object = {}
      if (user?.role > 0) {
        selector['workspaceId'] = query.workspaceId
      }
      if (query?.search) {
        // 使用正则表达式实现模糊查询
        selector['$or'] = [
          { name: { $regex: query.search, $options: 'i' } },
          { obtainWay: { $regex: query.search, $options: 'i' } },
          { category: { $regex: query.search, $options: 'i' } },
          { comment: { $regex: query.search, $options: 'i' } },
        ] // 'i' 表示不区分大小写
      }
      if (query?.status) {
        selector['status'] = query.status
      }
      const res = await this.assetModel.find(
        selector,
        null,
        { sort: { updateTime: -1 } }
      )
      return res
    } catch (error) {
      $.logger.error("error:", error)
      throw error
    }
  }

  async findOne(id: string) {
    try {
      const asset = await this.assetModel.findOne({ _id: id })
      if (!asset) {
        throw new NotFoundException({
          errType: 1,
          message: `Asset with ID ${id} not exist!`
        })
      }
      return asset
    } catch (error) {
      $.logger.error("error:", error)
      throw error
    }
  }

  async update(id: string, updateAssetDto: UpdateAssetDto) {
    try {
      if ('workspaceId' in updateAssetDto) {
        throw new BadRequestException({
          errType: 1,
          message: 'WorkspaceId cannot be updated'
        })
      }
      const asset = await this.assetModel.findOne({ _id: id })
      if (!asset) {
        throw new NotFoundException({
          errType: 2,
          message: `Asset with ID ${id} not exist!`
        })
      }
      Object.assign(asset, updateAssetDto)
      const res = await asset.save()
      return res
    } catch (error) {
      $.logger.error("error:", error)
      throw error
    }
  }

  async remove(id: string) {
    try {
      const asset = await this.assetModel.findOne({ _id: id })
      if (!asset) {
        throw new NotFoundException({
          errType: 1,
          message: `Asset with ID ${id} not exist!`
        })
      }
      const res = await this.assetModel.findByIdAndDelete(id)
      return res
    } catch (error) {
      $.logger.error("error:", error)
      throw error
    }
  }
}
