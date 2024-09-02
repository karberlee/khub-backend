import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Site } from './schemas/site.schema'
import { CreateSiteDto } from './dto/create-site.dto'
import { UpdateSiteDto } from './dto/update-site.dto'

@Injectable()
export class SiteService {
  constructor(@InjectModel('Site') private readonly siteModel: Model<Site>) { }

  async create(createSiteDto: CreateSiteDto) {
    try {
      const res = await this.siteModel.create(createSiteDto)
      $.logger.info('res:', res)
      return res
    } catch (error) {
      $.logger.error("error:", error)
      return error
    }
  }

  async findAll() {
    try {
      const res = await this.siteModel.find()
      $.logger.info('res:', res)
      return res
    } catch (error) {
      $.logger.error("error:", error)
      return error
    }
  }

  async findOne(id: string) {
    try {
      const res = await this.siteModel.findOne({ _id: id })
      $.logger.info('res:', res)
      return res
    } catch (error) {
      $.logger.error("error:", error)
      return error
    }
  }

  async update(id: string, updateSiteDto: UpdateSiteDto) {
    try {
      const user = await this.siteModel.findById(id)
      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`)
      }
      Object.assign(user, updateSiteDto)
      const res = await user.save()
      $.logger.info('res:', res)
      return res
    } catch (error) {
      $.logger.error("error:", error)
      return error
    }
  }

  async remove(id: string) {
    try {
      const res = await this.siteModel.findByIdAndDelete(id)
      $.logger.info('res:', res)
      if (!res) {
        throw new NotFoundException(`User with ID ${id} not found`)
      }
      return res;
    } catch (error) {
      $.logger.error("error:", error)
      return error
    }
  }
}
