import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'
import { User } from '@/modules/user/schemas/user.schema'

@Schema({
  collection: 'workspace',  // 设置collection
  timestamps: {
    createdAt: 'createTime',
    updatedAt: 'updateTime',
  },
  versionKey: '__v',  // 设置版本键
  optimisticConcurrency: true,  // 开启__v自增
})
export class Workspace extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  owner: User['_id']  // 这是一个引用用户的字段，指向 User 模型

  @Prop({ required: true })
  name: string

  @Prop({ required: true, default: false })
  default: boolean

  @Prop({ required: true, default: true })
  active: boolean
}

export const WorkspaceSchema = SchemaFactory.createForClass(Workspace)
