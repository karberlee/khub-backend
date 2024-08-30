import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { SiteService } from './site.service'
import { SiteController } from './site.controller'
import { SiteSchema } from './schemas/site.schema'

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Site', schema: SiteSchema }])],
  controllers: [SiteController],
  providers: [SiteService],
})
export class SiteModule {}
