import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { AuthService } from './auth.service'
import { WorkspaceModule } from '@/modules/workspace/workspace.module'
import { AuthController } from './auth.controller'
import { UserSchema } from '@/modules/user/schemas/user.schema'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    WorkspaceModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
