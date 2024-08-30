import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UserModule } from '@/modules/user/user.module'
import { SiteModule } from '@/modules/site/site.module'

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI), 
    UserModule,
    SiteModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
