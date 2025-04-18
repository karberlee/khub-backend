import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { User } from './schemas/user.schema'
import { Site } from '@/modules/site/schemas/site.schema'
import { Note } from '@/modules/note/schemas/note.schema'
import { Doc } from '@/modules/doc/schemas/doc.schema'
import { CheckUserDto } from './dto/check-user.dto'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { StatisticModel } from '@/types/type'

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    @InjectModel('Site') private readonly siteModel: Model<Site>,
    @InjectModel('Note') private readonly noteModel: Model<Note>,
    @InjectModel('Doc') private readonly docModel: Model<Doc>,
  ) { }
  
  async reload(id: string) {
    try {
      const user = await this.userModel.findOne({ _id: id }).select('-password -__v')
      if (!user) {
        throw new NotFoundException({
          errType: 1,
          message: `User with ID ${id} not exist!`
        })
      }
      return user
    } catch (error) {
      $.logger.error("error:", error)
      throw error
    }
  }

  async check(account: string, checkUserDto: CheckUserDto) {
    try {
      const user = await this.userModel.findOne({ account, password: checkUserDto.password })
      if (!user) {
        throw new NotFoundException({
          errType: 1,
          message: `Check User Failed!`
        })
      }
      return user
    } catch (error) {
      $.logger.error("error:", error)
      throw error
    }
  }

  async statistics(id: string) {
    try {
      const statistics: StatisticModel = {
        siteCount: 0,
        noteCount: 0,
        doc: {
          publicCount: 0,
          privateCount: 0,
          totalCount: 0
        }
      }
      statistics.siteCount = await this.siteModel.countDocuments({ userId: id })
      statistics.noteCount = await this.noteModel.countDocuments({ userId: id })
      statistics.doc.publicCount = await this.docModel.countDocuments({ owner: id, public: true })
      statistics.doc.privateCount = await this.docModel.countDocuments({ owner: id, public: false })
      statistics.doc.totalCount = await this.docModel.countDocuments({ owner: id })
      return statistics
    } catch (error) {
      $.logger.error("error:", error)
      throw error
    }
  }

  async create(createUserDto: CreateUserDto) {
    try {
      createUserDto.role = 1
      createUserDto.createTime = new Date().toISOString()
      createUserDto.account = createUserDto.account.trim().toLowerCase()
      if (!createUserDto.name) createUserDto.name = 'New User'
      const res = await this.userModel.create(createUserDto)
      return res
    } catch (error) {
      $.logger.error("error:", error)
      throw error
    }
  }

  async findAll() {
    try {
      const res = await this.userModel.find()
      return res
    } catch (error) {
      $.logger.error("error:", error)
      throw error
    }
  }

  async findOne(id: string) {
    try {
      const user = await this.userModel.findOne({ _id: id })
      if (!user) {
        throw new NotFoundException({
          errType: 1,
          message: `User with ID ${id} not exist!`
        })
      }
      return user
    } catch (error) {
      $.logger.error("error:", error)
      throw error
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.userModel.findById(id)
      if (!user) {
        throw new NotFoundException({
          errType: 1,
          message: `User with ID ${id} not exist!`
        })
      }
      Object.assign(user, updateUserDto) // 更新字段
      const res = await user.save()
      return res
    } catch (error) {
      $.logger.error("error:", error)
      throw error
    }
  }

  async remove(id: string) {
    try {
      const res = await this.userModel.findByIdAndDelete(id)
      if (!res) {
        throw new NotFoundException({
          errType: 1,
          message: `User with ID ${id} not exist!`
        })
      }
      return res
    } catch (error) {
      $.logger.error("error:", error)
      throw error
    }
  }
}
