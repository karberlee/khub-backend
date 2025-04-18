import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Site } from './schemas/site.schema'
import { CreateSiteDto } from './dto/create-site.dto'
import { UpdateSiteDto } from './dto/update-site.dto'
import { ReqUserDto } from '@/modules/user/dto/req-user.dto'

@Injectable()
export class SiteService {
  constructor(@InjectModel('Site') private readonly siteModel: Model<Site>) { }

  async create(user: ReqUserDto, createSiteDto: CreateSiteDto) {
    try {
      createSiteDto.userId = user._id
      const res = await this.siteModel.create(createSiteDto)
      return res
    } catch (error) {
      $.logger.error("error:", error)
      throw error
    }
  }

  async findAll(user: ReqUserDto) {
    try {
      const selector: object = {}
      if (user && user.role > 0) {
        selector['userId'] = user._id
      }
      const res = await this.siteModel.find(selector)
      return res
    } catch (error) {
      $.logger.error("error:", error)
      throw error
    }
  }

  async findOne(user: ReqUserDto, id: string) {
    try {
      const site = await this.siteModel.findOne({ _id: id, userId: user._id })
      if (!site) {
        throw new NotFoundException({
          errType: 1,
          message: `Site with ID ${id} not exist!`
        })
      }
      return site
    } catch (error) {
      $.logger.error("error:", error)
      throw error
    }
  }

  async update(user: ReqUserDto, id: string, updateSiteDto: UpdateSiteDto) {
    try {
      const site = await this.siteModel.findOne({ _id: id, userId: user._id })
      if (!site) {
        throw new NotFoundException({
          errType: 1,
          message: `Site with ID ${id} not exist!`
        })
      }
      Object.assign(site, updateSiteDto)
      const res = await site.save()
      return res
    } catch (error) {
      $.logger.error("error:", error)
      throw error
    }
  }

  async remove(user: ReqUserDto, id: string) {
    try {
      const site = await this.siteModel.findOne({ _id: id, userId: user._id })
      if (!site) {
        throw new NotFoundException({
          errType: 1,
          message: `Site with ID ${id} not exist!`
        })
      }
      const res = await this.siteModel.findByIdAndDelete(site._id)
      return res
    } catch (error) {
      $.logger.error("error:", error)
      throw error
    }
  }
}
