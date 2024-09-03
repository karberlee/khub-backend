import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import * as dotenv from 'dotenv'
dotenv.config()
import '@/shared/global'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // DTO 处理
  app.useGlobalPipes(new ValidationPipe({
    transform: true, // 自动转换类型
    whitelist: true, // 自动去除请求中不存在于 DTO 中的字段
    forbidNonWhitelisted: true, // 禁止请求中包含 DTO 中不存在的字段
    disableErrorMessages: false, // 禁用错误消息（默认为 false）
  }))

  // Swagger 配置
  const config = new DocumentBuilder()
    .setTitle('KHub API') // API 文档的标题
    .setDescription('The KHub API Document') // API 文档的描述
    .setVersion('1.0') // API 的版本
    .addBearerAuth() // 如果需要 Bearer Token 认证
    .build()
  
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('apidocs', app, document) // 指定 Swagger UI 的路径

  const port = process.env.PORT || 3000
  await app.listen(port)
  $.logger.log(`Application is running on port: ${port}`)
}
bootstrap()
