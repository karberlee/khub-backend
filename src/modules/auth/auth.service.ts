import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { User } from '@/modules/user/schemas/user.schema'
import { CreateUserDto } from '@/modules/user/dto/create-user.dto'
import * as mailTemplates from "@/common/utils/mailTemplates";

@Injectable()
export class AuthService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) { }

  async login(authDto: CreateUserDto) {
    try {
      const user = await this.userModel.findOne({ account: authDto.account.trim().toLowerCase() })
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

  async signup(signupDto: CreateUserDto) {
    try {
      signupDto.role = 1
      signupDto.account = signupDto.account.trim().toLowerCase()
      if (!signupDto.name) signupDto.name = 'New User'
      const user = await this.userModel.create(signupDto)
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

  async sendCode(email: string) {
    try {
      const verifyCode = $.util.generateVerifyCode(6)
      $.logger.info('verifyCode:', verifyCode)
      const htmlTemplate = mailTemplates.verifyCodeTemplate(verifyCode)
      $.MailTool.sendMail(email, 'KHub Verify Code', null, htmlTemplate)
      return $.util.successRes(0, { message: 'Verify code is sent!' })
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
