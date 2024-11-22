import { Schema, Document } from 'mongoose'

export const DocSchema = new Schema<Doc>(
  {
    userId: { type: String, required: true },
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
  userId: string
  title: string
  tags: string[]
  content: string
  public: boolean
  createTime: string
  updateTime: string
}