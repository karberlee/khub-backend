import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Site } from './schemas/site.schema'
import { CreateSiteDto } from './dto/create-site.dto'
import { UpdateSiteDto } from './dto/update-site.dto'

@Injectable()
export class SiteService {
  create(createSiteDto: CreateSiteDto) {
    return 'This action adds a new site'
  }

  findAll() {
    return `This action returns all site`
  }

  findOne(id: string) {
    return `This action returns a #${id} site`
  }

  update(id: string, updateSiteDto: UpdateSiteDto) {
    return `This action updates a #${id} site`
  }

  remove(id: string) {
    return `This action removes a #${id} site`
  }
}
