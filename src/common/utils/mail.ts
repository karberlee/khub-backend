import * as nodemailer from 'nodemailer'

interface MailOptions {
    from: string
    to: string
    subject: string
    text?: string
    html?: string
}

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST, // 邮件服务主机
  port: process.env.SMTP_PORT, // 端口号
  secure: process.env.SMTP_SECURE === 'TRUE', // 是否启用SSL/TLS
  auth: {
      user: process.env.SMTP_USER, // 发件邮箱
      pass: process.env.SMTP_PASS, // 邮箱密码或授权码
  },
})

// Tencent QQ邮箱
// const transporter = nodemailer.createTransport({
//   host: 'smtp.qq.com', // 邮件服务主机
//   port: 587, // 端口号
//   secure: true, // 是否启用SSL/TLS
//   auth: {
//       // user: process.env.SMTP_USER, // 发件邮箱
//       // pass: process.env.SMTP_PASS, // 授权码
//   },
// })

// Alibaba 企业邮箱
// const transporter = nodemailer.createTransport({
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

export const MailTool = {
  async sendMail(to: string, subject: string, text: string): Promise<void> {
    try {
      const options: MailOptions = {
        from: process.env.SMTP_USER,
        to,
        subject,
        text
      }
      $.logger.info('Email Content:', options)
      const info = await transporter.sendMail(options)
      $.logger.info('Email sent: ' + info.response)
    } catch (error) {
      $.logger.error('Error occurred: ' + error.message)
      throw error // 抛出错误供外部处理
    }
  }
}
