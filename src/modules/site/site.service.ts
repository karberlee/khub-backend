import { Injectable, NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common'
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
      return res
    } catch (error) {
      $.logger.error("error:", error)
      throw new InternalServerErrorException('Internal server error')
    }
  }

  async findAll() {
    try {
      const res = await this.siteModel.find()
      return res
    } catch (error) {
      $.logger.error("error:", error)
      throw new InternalServerErrorException('Internal server error')
    }
  }

  async findOne(id: string) {
    try {
      const res = await this.siteModel.findOne({ _id: id })
      if (!res) {
        throw new NotFoundException(`Site with ID ${id} not found`)
      }
      return res
    } catch (error) {
      $.logger.error("error:", error)
      if (error instanceof NotFoundException) {
        throw error
      }
      throw new InternalServerErrorException('Internal server error')
    }
  }

  async update(id: string, updateSiteDto: UpdateSiteDto) {
    try {
      const site = await this.siteModel.findById(id)
      if (!site) {
        throw new NotFoundException(`Site with ID ${id} not found`)
      }
      Object.assign(site, updateSiteDto)
      const res = await site.save()
      return res
    } catch (error) {
      $.logger.error("error:", error)
      if (error instanceof NotFoundException) {
        throw error
      }
      throw new InternalServerErrorException('Internal server error')
    }
  }

  async remove(id: string) {
    try {
      const res = await this.siteModel.findByIdAndDelete(id)
      if (!res) {
        throw new NotFoundException(`Site with ID ${id} not found`)
      }
      return res
    } catch (error) {
      $.logger.error("error:", error)
      if (error instanceof NotFoundException) {
        throw error
      }
      throw new InternalServerErrorException('Internal server error')
    }
  }
}
