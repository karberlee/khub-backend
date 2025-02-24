import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common'
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
      return res
    } catch (error) {
      $.logger.error("error:", error)
      throw error
    }
  }

  async findAll(user: ReqUserDto, query: any = {}) {
    try {
      const selector: object = { public: true }

      if (query?.manage) {
        selector['owner'] = user._id
      }
      delete query.manage

      if (query?.search) {
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
      return res
    } catch (error) {
      $.logger.error("error:", error)
      throw error
    }
  }

  async findMine(user: ReqUserDto, query: any) {
    try {
      const selector: object = { public: true }
      if (query?.hasOwnProperty('public')) {
        selector['public'] = query.public
      }
      const res = await this.docModel.find(selector).populate(this.ownerPopulateObj)
      return res
    } catch (error) {
      $.logger.error("error:", error)
      throw error
    }
  }

  async findOne(user: ReqUserDto, id: string) {
    try {
      const doc = await this.docModel.findOne({ _id: id }).populate(this.ownerPopulateObj)
      if (!doc) {
        throw new NotFoundException({
          errType: 1,
          message: `Doc with ID ${id} not exist!`
        })
      }
      return doc
    } catch (error) {
      $.logger.error("error:", error)
      throw error
    }
  }

  async update(user: ReqUserDto, id: string, updateDocDto: UpdateDocDto) {
    try {
      const doc = await this.docModel.findOne({ _id: id }).populate(this.ownerPopulateObj)
      if (!doc) {
        throw new NotFoundException({
          errType: 1,
          message: `Doc with ID ${id} not exist!`
        })
      }
      if (doc.owner['_id'] != user._id) {
        throw new ForbiddenException({
          errType: 1,
          message: `Forbidden! You are not the owner with doc ${id}!`
        })
      }
      Object.assign(doc, updateDocDto)
      doc.updateTime = new Date().toISOString()
      const res = await doc.save()
      return res
    } catch (error) {
      $.logger.error("error:", error)
      throw error
    }
  }

  async remove(user: ReqUserDto, id: string) {
    try {
      const doc = await this.docModel.findOne({ _id: id }).populate(this.ownerPopulateObj)
      if (!doc) {
        throw new NotFoundException({
          errType: 1,
          message: `Doc with ID ${id} not exist!`
        })
      }
      if (doc.owner['_id'] != user._id) {
        throw new ForbiddenException({
          errType: 1,
          message: `Forbidden! You are not the owner with doc ${id}!`
        })
      }
      const res = await this.docModel.findByIdAndDelete(doc._id)
      return res
    } catch (error) {
      $.logger.error("error:", error)
      throw error
    }
  }
}
