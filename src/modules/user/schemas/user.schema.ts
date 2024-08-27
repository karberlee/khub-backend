import { Schema, Document } from 'mongoose'

export const UserSchema = new Schema<User>({
  account: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: Number, required: true }
})

export interface User extends Document {
  account: string
  password: string
  role: number
}