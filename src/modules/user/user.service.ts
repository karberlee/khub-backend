import { Injectable, NotFoundException } from '@nestjs/common'
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
      console.log('res:', res)
      return res
    } catch (error) {
      console.log("error:", error)
      return error
    }
  }

  async findAll() {
    try {
      const res = await this.userModel.find()
      console.log('res:', res)
      return res
    } catch (error) {
      console.log("error:", error)
      return error
    }
  }

  async findOne(id: string) {
    try {
      const res = await this.userModel.findOne({ _id: id })
      console.log('res:', res)
      return res
    } catch (error) {
      console.log("error:", error)
      return error
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const res = await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true }).exec();
      console.log('res:', res)
      if (!res) {
        throw new NotFoundException(`User with ID ${id} not found`)
      }
      return res
    } catch (error) {
      console.log("error:", error)
      return error
    }
  }

  async remove(id: string) {
    try {
      const res = await this.userModel.findByIdAndDelete(id)
      console.log('res:', res)
      if (!res) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      return res;
    } catch (error) {
      console.log("error:", error)
      return error
    }
  }
}