import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Doc } from './schemas/doc.schema'
import { CreateDocDto } from './dto/create-doc.dto'
import { UpdateDocDto } from './dto/update-doc.dto'
import { ReqUserDto } from '@/modules/user/dto/req-user.dto'

@Injectable()
export class DocService {
  constructor(@InjectModel('Doc') private readonly docModel: Model<Doc>) { }
  private readonly ownerPopulateObj = { path: 'owner', select: '_id name createTime' }

  async create(user: ReqUserDto, createDocDto: CreateDocDto) {
    try {
      createDocDto.owner = user._id
      const currentTime = new Date().toISOString()
      createDocDto.createTime = currentTime
      createDocDto.updateTime = currentTime
      const res = await this.docModel.create(createDocDto)
      return $.util.successRes(0, res)
    } catch (error) {
      $.logger.error("error:", error)
      throw new InternalServerErrorException(error)
    }
  }

  async findAll(user: ReqUserDto, query: any = {}) {
    try {
      const selector: object = { public: true }

      if (query && query.manage) {
        selector['owner'] = user._id
      }
      delete query.manage

      if (query && query.search) {
        // 使用正则表达式实现模糊查询
        selector['$or'] = [
          { title: { $regex: query.search, $options: 'i' } },
          { content: { $regex: query.search, $options: 'i' } },
          { tags: { $regex: query.search, $options: 'i' } },
        ] // 'i' 表示不区分大小写
      }
      delete query.search

      Object.assign(selector, query)
      const res = await this.docModel.find(selector).populate(this.ownerPopulateObj)
      return $.util.successRes(0, res)
    } catch (error) {
      $.logger.error("error:", error)
      throw new InternalServerErrorException(error)
    }
  }

  async findMine(user: ReqUserDto, query: any) {
    try {
      const selector: object = { public: true }
      if (query && query.hasOwnProperty('public')) {
        selector['public'] = query.public
      }
      const res = await this.docModel.find(selector).populate(this.ownerPopulateObj)
      return $.util.successRes(0, res)
    } catch (error) {
      $.logger.error("error:", error)
      throw new InternalServerErrorException(error)
    }
  }

  async findOne(user: ReqUserDto, id: string) {
    try {
      const doc = await this.docModel.findOne({ _id: id }).populate(this.ownerPopulateObj)
      if (!doc) {
        return $.util.failRes(404, `Doc with ID ${id} not exist!`)
      }
      return $.util.successRes(0, doc)
    } catch (error) {
      $.logger.error("error:", error)
      throw new InternalServerErrorException(error)
    }
  }

  async update(user: ReqUserDto, id: string, updateDocDto: UpdateDocDto) {
    try {
      const doc = await this.docModel.findOne({ _id: id }).populate(this.ownerPopulateObj)
      if (!doc) {
        return $.util.failRes(404, `Doc with ID ${id} not exist!`)
      }
      if (doc.owner['_id'] != user._id) {
        return $.util.failRes(403, `Forbidden! You are not the owner with doc ${id}!`)
      }
      Object.assign(doc, updateDocDto)
      doc.updateTime = new Date().toISOString()
      const res = await doc.save()
      return $.util.successRes(0, res)
    } catch (error) {
      $.logger.error("error:", error)
      throw new InternalServerErrorException(error)
    }
  }

  async remove(user: ReqUserDto, id: string) {
    try {
      const doc = await this.docModel.findOne({ _id: id }).populate(this.ownerPopulateObj)
      if (!doc) {
        return $.util.failRes(404, `Doc with ID ${id} not exist!`)
      }
      if (doc.owner['_id'] != user._id) {
        return $.util.failRes(403, `Forbidden! You are not the owner with doc ${id}!`)
      }
      const res = await this.docModel.findByIdAndDelete(doc._id)
      return $.util.successRes(0, res)
    } catch (error) {
      $.logger.error("error:", error)
      throw new InternalServerErrorException(error)
    }
  }
}
