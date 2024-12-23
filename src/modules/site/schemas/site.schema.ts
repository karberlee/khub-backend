import { Schema, Document } from 'mongoose'

export const SiteSchema = new Schema<Site>(
  {
    userId: { type: String, required: true },
    siteName: { type: String, required: true },
    siteLink: { type: String, default: '' },
    account: { type: String, default: '' },
    password: { type: String, default: '' },
    description: { type: String, default: '' }
  }, 
  { 
    optimisticConcurrency: true, // 开启__v自增
    collection: 'site' // 设置collection
  }
)

export interface Site extends Document {
  userId: string
  siteName: string
  siteLink: string
  account: string
  password: string
  description: string
}