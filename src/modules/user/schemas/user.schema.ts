import { Schema, Document } from 'mongoose'

export const UserSchema = new Schema<User>(
  {
    account: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: Number, required: true }
  }, 
  { 
    optimisticConcurrency: true, // 开启__v自增
    collection: 'user' // 设置collection
  }
)

export interface User extends Document {
  account: string
  password: string
  role: number
}