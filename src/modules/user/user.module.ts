import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { UserSchema } from './schemas/user.schema'
import { SiteSchema } from '@/modules/site/schemas/site.schema'
import { NoteSchema } from '@/modules/note/schemas/note.schema'
import { DocSchema } from '@/modules/doc/schemas/doc.schema'

@Module({
  imports: [MongooseModule.forFeature([
    { name: 'User', schema: UserSchema },
    { name: 'Site', schema: SiteSchema },
    { name: 'Note', schema: NoteSchema },
    { name: 'Doc', schema: DocSchema },
  ])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
