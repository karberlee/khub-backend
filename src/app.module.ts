import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { mongoConfig } from './config/mongo.config'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UserModule } from '@/modules/user/user.module'

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI), 
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
