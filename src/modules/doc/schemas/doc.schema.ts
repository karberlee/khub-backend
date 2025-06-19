import { Schema, Document } from 'mongoose'
import { User } from '@/modules/user/schemas/user.schema'

export const DocSchema = new Schema<Doc>(
  {
    // userId: { type: String, required: true },
    // new Schema({...}) 会自动把 string 转为 ObjectId，但 @Prop() 不会
    // 而 _id 是 MongoDB 的主键字段，Mongoose 总是自动 cast 它
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, default: '', required: true },
    tags: { type: [String], default: [] },
    content: { type: String, default: '' },
    public: { type: Boolean, required: true },
    createTime: { type: String, required: true },
    updateTime: { type: String, required: true }
  }, 
  { 
    optimisticConcurrency: true, // 开启__v自增
    collection: 'doc' // 设置collection
  }
)

export interface Doc extends Document {
  // userId: string
  owner: User['_id']
  title: string
  tags: string[]
  content: string
  public: boolean
  createTime: string
  updateTime: string
}