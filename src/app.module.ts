import { Module, MiddlewareConsumer } from '@nestjs/common'
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core'
import { MongooseModule } from '@nestjs/mongoose'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { HttpExceptionFilter } from '@/common/filters/http-exception.filter'
import { LoggingInterceptor } from '@/common/interceptors/logging.interceptor'
import { RefreshInterceptor } from '@/common/interceptors/refresh.interceptor'
import { PrometheusMiddleware } from '@/common/middlewares/prometheus.middlewares'
import { PrometheusModule } from '@/modules/prometheus/prometheus.module'
import { HealthModule } from '@/modules/health/health.module'
import { AuthModule } from '@/modules/auth/auth.module'
import { UserModule } from '@/modules/user/user.module'
import { SiteModule } from '@/modules/site/site.module'

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI), 
    PrometheusModule,
    HealthModule,
    AuthModule,
    UserModule,
    SiteModule
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
