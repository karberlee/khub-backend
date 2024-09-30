import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { User } from './schemas/user.schema'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) { }

  async create(createUserDto: CreateUserDto) {
    try {
      createUserDto.role = 1
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
