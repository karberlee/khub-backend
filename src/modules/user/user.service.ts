import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { User } from './schemas/user.schema'
import { Site } from '@/modules/site/schemas/site.schema'
import { Note } from '@/modules/note/schemas/note.schema'
import { Doc } from '@/modules/doc/schemas/doc.schema'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { UserStatistics } from '@/types/type'

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
        return $.util.failRes(404, `User with ID ${id} not exist!`)
      }
      return $.util.successRes(0, user)
    } catch (error) {
      $.logger.error("error:", error)
      throw new InternalServerErrorException(error)
    }
  }

  async statistics(id: string) {
    try {
      const statistics: UserStatistics = {
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
      return $.util.successRes(0, statistics)
    } catch (error) {
      $.logger.error("error:", error)
      throw new InternalServerErrorException(error)
    }
  }

  async create(createUserDto: CreateUserDto) {
    try {
      createUserDto.role = 1
      createUserDto.createTime = new Date().toISOString()
      createUserDto.account = createUserDto.account.trim().toLowerCase()
      if (!createUserDto.name) createUserDto.name = 'New User'
      const res = await this.userModel.create(createUserDto)
      return $.util.successRes(0, res)
    } catch (error) {
      $.logger.error("error:", error)
      throw new InternalServerErrorException(error)
    }
  }

  async findAll() {
    try {
      const res = await this.userModel.find()
      return $.util.successRes(0, res)
    } catch (error) {
      $.logger.error("error:", error)
      throw new InternalServerErrorException(error)
    }
  }

  async findOne(id: string) {
    try {
      const user = await this.userModel.findOne({ _id: id })
      if (!user) {
        return $.util.failRes(404, `User with ID ${id} not exist!`)
      }
      return $.util.successRes(0, user)
    } catch (error) {
      $.logger.error("error:", error)
      throw new InternalServerErrorException(error)
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.userModel.findById(id)
      if (!user) {
        return $.util.failRes(404, `User with ID ${id} not exist!`)
      }
      Object.assign(user, updateUserDto) // 更新字段
      const res = await user.save()
      return $.util.successRes(0, res)
    } catch (error) {
      $.logger.error("error:", error)
      throw new InternalServerErrorException(error)
    }
  }

  async remove(id: string) {
    try {
      const res = await this.userModel.findByIdAndDelete(id)
      if (!res) {
        return $.util.failRes(404, `User with ID ${id} not exist!`)
      }
      return $.util.successRes(0, res)
    } catch (error) {
      $.logger.error("error:", error)
      throw new InternalServerErrorException(error)
    }
  }
}
