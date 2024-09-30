import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { User } from '@/modules/user/schemas/user.schema'
import { CreateUserDto } from '@/modules/user/dto/create-user.dto'

@Injectable()
export class AuthService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) { }

  async login(authDto: CreateUserDto) {
    try {
      const user = await this.userModel.findOne({ account: authDto.account })
      if (!user) {
        return $.util.failRes(404, `User with account ${authDto.account} not exist!`)
      }
      if (user.password !== authDto.password) {
        return $.util.failRes(401, `Password Incorrect!`)
      }
      return $.util.successRes(0, { 
        _id: user._id,
        account: user.account,
        name: user.name,
        role: user.role
      })
    } catch (error) {
      $.logger.error("error:", error)
      throw new InternalServerErrorException(error)
    }
  }

  async register(registerDto: CreateUserDto) {
    try {
      registerDto.role = 1
      if (!registerDto.name) registerDto.name = 'New User'
      const user = await this.userModel.create(registerDto)
      return $.util.successRes(0, { 
        _id: user._id,
        account: user.account,
        name: user.name,
        role: user.role
      })
    } catch (error) {
      $.logger.error("error:", error)
      throw new InternalServerErrorException(error)
    }
  }

  // create(createAuthDto: CreateAuthDto) {
  //   return 'This action adds a new auth';
  // }

  // findAll() {
  //   return `This action returns all auth`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} auth`;
  // }

  // update(id: number, updateAuthDto: UpdateAuthDto) {
  //   return `This action updates a #${id} auth`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} auth`;
  // }
}
