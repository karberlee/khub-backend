import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { User } from '@/modules/user/schemas/user.schema'
import { CreateUserDto } from '@/modules/user/dto/create-user.dto'
import * as mailTemplates from '@/common/utils/mailTemplates'

@Injectable()
export class AuthService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) { }
  private readonly signup_account_type = 'email_signup'
  private readonly github_account_type = 'github_oauth'
  private readonly github_client_id = process.env.GITHUB_CLIENT_ID
  private readonly github_client_secret = process.env.GITHUB_CLIENT_SECRET
  private readonly github_redirect_uri = process.env.GITHUB_REDIRECT_URI

  async login(authDto: CreateUserDto) {
    try {
      const user = await this.userModel.findOne({ account: authDto.account.trim().toLowerCase(), type: this.signup_account_type })
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
        type: user.type,
        role: user.role
      })
    } catch (error) {
      $.logger.error("error:", error)
      throw new InternalServerErrorException(error)
    }
  }

  async signup(signupDto: CreateUserDto) {
    try {
      if (
        !signupDto.verifyCode || 
        !$.CodeCache.get(signupDto.account) || 
        $.CodeCache.get(signupDto.account) !== signupDto.verifyCode
      ) {
        return $.util.failRes(400, `Bad Verify Code!`)
      }
      signupDto.avatar = ''
      signupDto.role = 1
      signupDto.type = this.signup_account_type
      signupDto.createTime = new Date().toISOString()
      signupDto.account = signupDto.account.trim().toLowerCase()
      if (!signupDto.name) signupDto.name = 'New User'
      const user = await this.userModel.create(signupDto)
      $.CodeCache.del(signupDto.account)
      return $.util.successRes(0, { 
        _id: user._id,
        account: user.account,
        name: user.name,
        avatar: user.avatar,
        role: user.role,
        type: user.type,
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
      $.CodeCache.set(email, verifyCode)
      const htmlTemplate = mailTemplates.verifyCodeTemplate(verifyCode)
      $.MailTool.sendMail(email, 'KHub Verify Code', null, htmlTemplate)
      return $.util.successRes(0, { message: 'Verify code is sent!' })
    } catch (error) {
      $.logger.error("error:", error)
      throw new InternalServerErrorException(error)
    }
  }

  async githubCallback(query: any) {
    try {
      // 1.get github user code by user sso login
      const code = query.code
      if (query.error || !code) {
        return $.util.failRes(401, query.error)
      }

      // 2.get access_token by code from github api
      const tokenRes = await $.axios.post(
        "https://github.com/login/oauth/access_token",
        null,
        {
          params: {
            client_id: this.github_client_id,
            client_secret: this.github_client_secret,
            code: code,
            redirect_uri: this.github_redirect_uri
          },
          headers: {
            'Accept': 'application/json' // 确保返回的是 JSON 格式
          },
          timeout: 30000 // 设置30秒超时
        }
      )
      const githubTokenObj = tokenRes.data
      $.logger.info('githubTokenObj:', githubTokenObj)
      const access_token = githubTokenObj.access_token

      // 3.get user info by access_token from github api
      const userInfoRes = await $.axios.get(
        "https://api.github.com/user",
        {
          headers: {
            'Authorization': `Bearer ${access_token}`
          }
        }
      )
      const userInfo = userInfoRes.data
      $.logger.info('userInfo:', userInfo)

      // 4.search user by github id
      let githubUser = await this.userModel.findOne({ account: userInfo.id, type: this.github_account_type })

      // 5.create user account if not exist
      $.logger.info('githubUser:', githubUser)
      if (!githubUser) {
        const newUser: CreateUserDto = {
          account: userInfo.id,
          password: userInfo.login,
          name: userInfo.name,
          avatar: userInfo.avatar_url,
          role: 1,
          type: this.github_account_type,
          createTime: new Date().toISOString()
        }
        githubUser = await this.userModel.create(newUser)
        $.logger.info('create user:', githubUser)
      }

      // 6.return user info to create token
      return $.util.successRes(0, {
        _id: githubUser._id,
        account: githubUser.account,
        name: githubUser.name,
        type: githubUser.type,
        role: githubUser.role
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
