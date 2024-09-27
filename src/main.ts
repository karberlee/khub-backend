import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import * as dotenv from 'dotenv'
dotenv.config()
import '@/shared/global'
import { AuthGuard } from "@/common/guards/auth.guard";
import { AppModule } from './app.module'

async function bootstrap() {

  const app = await NestFactory.create(AppModule)

  // 处理跨域
  app.enableCors({
    origin: true, // 允许的源
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // 允许的方法
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept',
      'Origin', 'X-Requested-With', 'user_id', 'login_id', 'token', 'app_link'], // 设置服务器支持的所有头信息字段
    exposedHeaders: ['WWW-Authenticate', 'Server-Authorization', 'Authorization'], // 设置获取其他自定义字段
  })

  // 设置全局守卫
  app.useGlobalGuards(new AuthGuard())

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
