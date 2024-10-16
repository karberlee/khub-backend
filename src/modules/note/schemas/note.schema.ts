import { Schema, Document } from 'mongoose'

export const NoteSchema = new Schema<Note>(
  {
    userId: { type: String, required: true },
    title: { type: String, default: '' },
    content: { type: String, default: '' },
    level: { type: Number, default: 0 },
    createTime: { type: String, required: true },
    updateTime: { type: String, required: true }
  }, 
  { 
    optimisticConcurrency: true, // 开启__v自增
    collection: 'note' // 设置collection
  }
)

export interface Note extends Document {
  userId: string
  title: string
  content: string
  level: number
  createTime: string
  updateTime: string
}