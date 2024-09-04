import { Injectable, NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common'
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
      const res = await this.userModel.create(createUserDto)
      return res
    } catch (error) {
      $.logger.error("error:", error)
      throw new InternalServerErrorException('Internal server error')
    }
  }

  async findAll() {
    try {
      const res = await this.userModel.find()
      return res
    } catch (error) {
      $.logger.error("error:", error)
      throw new InternalServerErrorException('Internal server error')
    }
  }

  async findOne(id: string) {
    try {
      const res = await this.userModel.findOne({ _id: id })
      if (!res) {
        throw new NotFoundException(`User with ID ${id} not found`)
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

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.userModel.findById(id)
      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`)
      }
      Object.assign(user, updateUserDto) // 更新字段
      const res = await user.save()
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
      const res = await this.userModel.findByIdAndDelete(id)
      if (!res) {
        throw new NotFoundException(`User with ID ${id} not found`)
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
