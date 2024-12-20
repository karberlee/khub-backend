import * as path from 'path'
import { Module, MiddlewareConsumer } from '@nestjs/common'
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core'
import { ServeStaticModule } from '@nestjs/serve-static'
import { MongooseModule } from '@nestjs/mongoose'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { HttpExceptionFilter } from '@/common/filters/http-exception.filter'
import { LoggingInterceptor } from '@/common/interceptors/logging.interceptor'
import { RefreshInterceptor } from '@/common/interceptors/refresh.interceptor'
import { PrometheusMiddleware } from '@/common/middlewares/prometheus.middlewares'
import { PrometheusModule } from '@/modules/prometheus/prometheus.module'
import { HealthModule } from '@/modules/health/health.module'
import { StorageModule } from '@/modules/storage/storage.module'
import { AuthModule } from '@/modules/auth/auth.module'
import { UserModule } from '@/modules/user/user.module'
import { SiteModule } from '@/modules/site/site.module'
import { NoteModule } from '@/modules/note/note.module'
import { DocModule } from '@/modules/doc/doc.module'

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, process.env.NODE_ENV==='prod' ? '' : '..', 'public'), // 设置静态文件服务目录
      serveRoot: '/public/', // 文件在服务器上的访问路径
    }),
    MongooseModule.forRoot(process.env.MONGO_URI), 
    PrometheusModule,
    HealthModule,
    StorageModule,
    AuthModule,
    UserModule,
    SiteModule,
    NoteModule,
    DocModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: RefreshInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(PrometheusMiddleware)
      .forRoutes('*') // 监控所有路由
  }
}
