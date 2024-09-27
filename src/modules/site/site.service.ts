import { Injectable, InternalServerErrorException } from '@nestjs/common'
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
      return $.util.successRes(0, res)
    } catch (error) {
      $.logger.error("error:", error)
      throw new InternalServerErrorException(error)
    }
  }

  async findAll() {
    try {
      const res = await this.siteModel.find()
      return $.util.successRes(0, res)
    } catch (error) {
      $.logger.error("error:", error)
      throw new InternalServerErrorException(error)
    }
  }

  async findOne(id: string) {
    try {
      const site = await this.siteModel.findOne({ _id: id })
      if (!site) {
        return $.util.failRes(404, `Site with ID ${id} not exist!`)
      }
      return $.util.successRes(0, site)
    } catch (error) {
      $.logger.error("error:", error)
      throw new InternalServerErrorException(error)
    }
  }

  async update(id: string, updateSiteDto: UpdateSiteDto) {
    try {
      const site = await this.siteModel.findById(id)
      if (!site) {
        return $.util.failRes(404, `Site with ID ${id} not exist!`)
      }
      Object.assign(site, updateSiteDto)
      const res = await site.save()
      return $.util.successRes(0, res)
    } catch (error) {
      $.logger.error("error:", error)
      throw new InternalServerErrorException(error)
    }
  }

  async remove(id: string) {
    try {
      const res = await this.siteModel.findByIdAndDelete(id)
      if (!res) {
        return $.util.failRes(404, `Site with ID ${id} not exist!`)
      }
      return $.util.successRes(0, res)
    } catch (error) {
      $.logger.error("error:", error)
      throw new InternalServerErrorException(error)
    }
  }
}
