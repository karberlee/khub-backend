import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import * as dotenv from 'dotenv'
dotenv.config()
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe({
    transform: true, // 自动转换类型
    whitelist: true, // 自动去除请求中不存在于 DTO 中的字段
    forbidNonWhitelisted: true, // 禁止请求中包含 DTO 中不存在的字段
    disableErrorMessages: false, // 禁用错误消息（默认为 false）
  }))
  const port = process.env.PORT || 3000
  await app.listen(port)
  console.log(`Application is running on port: ${port}`)
}
bootstrap()
