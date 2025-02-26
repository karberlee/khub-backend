import { Injectable } from '@nestjs/common'
import * as nodemailer from 'nodemailer'

interface MailOptions {
  from: string
  to: string
  subject: string
  text?: string
  html?: string
}

@Injectable()
export class MailService {
  private transporter

  constructor() {
    // 配置 SMTP 邮件服务器
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST, // 邮件服务主机
      port: process.env.SMTP_PORT, // 端口号
      secure: process.env.SMTP_SECURE === 'TRUE', // 是否启用SSL/TLS
      auth: {
          user: process.env.SMTP_USER, // 发件邮箱
          pass: process.env.SMTP_PASS, // 邮箱密码或授权码
      },
    })

    // Tencent QQ邮箱
    // this.transporter = nodemailer.createTransport({
    //   host: 'smtp.qq.com', // 邮件服务主机
    //   port: 587, // 端口号
    //   secure: true, // 是否启用SSL/TLS
    //   auth: {
    //       // user: process.env.SMTP_USER, // 发件邮箱
    //       // pass: process.env.SMTP_PASS, // 授权码
    //   },
    // })

    // Alibaba 企业邮箱
    // this.transporter = nodemailer.createTransport({
    //   host: 'smtp.qiye.aliyun.com' || 'smtp.mxhichina.com', // 邮件服务主机
    //   port: 465, // 端口号
    //   secure: true,
    //   auth: {
    //       user: process.env.SMTP_USER, // 发件邮箱
    //       pass: process.env.SMTP_PASS, // 邮箱密码
    //   },
    //   tls: {
    //     rejectUnauthorized: false // 仅在开发或测试环境中使用
    //   }
    // })
  }

  async sendMail(to: string, subject: string, text: string, html: string): Promise<void> {
    try {
      const options: MailOptions = {
        from: process.env.SMTP_USER,
        to,
        subject,
        text,
        html,
      }
      $.logger.info('Email content:', options)
      const info = await this.transporter.sendMail(options)
      $.logger.info('Email sent: ' + info.response)
    } catch (error) {
      $.logger.error('Error occurred: ' + error.message)
      throw error // 抛出错误供外部处理
    }
  }

  getVerifyCodeTemplate(verifyCode: string): string {
    return `
      <div
        style="
          width: 100%;
          display: flex;
          justify-content: center;
        "
      >
        <div 
          style="
            width: 500px;
            height: fit-content;
            border-radius: 10px;
            box-shadow: 0px 0px 10px 5px #bfbfbf;
            overflow: hidden;
          "
        >
          <div 
            style="
              font-size: 32px;
              font-weight: 700;
              text-align: center;
              background-color: #131a26;
              color: #e7e7e7;
              height: 120px;
              line-height: 120px;
            "
          >
            KHub: Your Verify Code
          </div>
          <div
            style="
              padding: 16px 32px;
              color: #131a26;
            "
          >
            <div>We have received your application to sign up on our website.If it is not you, please ignore this email.</div>
            <div
              style="
                margin-top: 16px;
              "
            >The verify code is:</div>
          </div>
          <div
            style="
              font-size: 32px;
              font-weight: 700;
              color: #4caf50;
              background-color: #beff9e;
              text-align: center;
              margin: 0 32px;
              padding: 16px 0;
            "
          >
            ${verifyCode}
          </div>
          <div
            style="
              padding: 16px 32px;
              font-weight: 700;
              color: #ff002b;
            "
          >
            <div>Available within five minutes.</div>
          </div>
          <div 
            style="
              background-color: #131a26;
              color: #e7e7e7;
              height: 32px;
              line-height: 16px;
              margin-top: 32px;
              padding: 32px;
            "
          >
            <div>The email was sent by KHub. Do not reply.</div>
            <div><a href="${process.env.SITE_LINK}">Explore</a> our website.</div>
          </div>
        </div>
      </div>
    `
  }

}