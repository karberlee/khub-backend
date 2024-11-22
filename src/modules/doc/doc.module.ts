import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { DocService } from './doc.service'
import { DocController } from './doc.controller'
import { DocSchema } from './schemas/doc.schema'

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Doc', schema: DocSchema }])],
  controllers: [DocController],
  providers: [DocService],
})
export class DocModule {}
