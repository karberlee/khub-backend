import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose'
import { Schema as MongooseSchema, Document, Types } from 'mongoose'
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
  // new Schema({...}) 会自动把 string 转为 ObjectId，但 @Prop() 不会
  // 而 _id 是 MongoDB 的主键字段，Mongoose 总是自动 cast 它
  // @Prop({ type: Types.ObjectId, ref: 'User', required: true }) 这种写法不会自动将string转换成ObjectId类型
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true }) // 这种会自动转换
  owner: User['_id']  // 这是一个引用用户的字段，指向 User 模型

  @Prop({ required: true })
  name: string

  @Prop({ required: true, default: false })
  default: boolean

  @Prop({ required: true, default: true })
  active: boolean
}

export const WorkspaceSchema = SchemaFactory.createForClass(Workspace)
