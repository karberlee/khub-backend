import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose'
import { Schema as MongooseSchema, Document } from 'mongoose'
import { Workspace } from '@/modules/workspace/schemas/workspace.schema'

@Schema({
  collection: 'asset',  // 设置collection
  timestamps: {
    createdAt: 'createTime',
    updatedAt: 'updateTime',
  },
  versionKey: '__v',  // 设置版本键
  optimisticConcurrency: true,  // 开启__v自增
})
export class Asset extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Workspace', required: true })
  workspaceId: Workspace['_id']  // 这是一个引用 workspace 的字段，指向 Workspace 模型

  @Prop({ required: true })
  name: string

  @Prop({ required: false, default: 0 })
  price: number

  @Prop({ type: Date, required: false, default: Date.now })
  obtainDate: Date

  @Prop({ required: false, default: '' })
  obtainWay: string

  @Prop({ required: false, default: '' })
  category: string

  @Prop({ required: false, default: 1 })
  status: number
  
  @Prop({ required: false, default: '' })
  thumbnail: string
  
  @Prop({ required: false, default: [] })
  images: string[]

  @Prop({ required: false, default: '' })
  comment: string
}

export const AssetSchema = SchemaFactory.createForClass(Asset)
