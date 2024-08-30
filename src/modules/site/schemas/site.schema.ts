import { Schema, Document } from 'mongoose'

export const SiteSchema = new Schema<Site>(
  {
    siteName: { type: String, required: true },
    siteLink: { type: String },
    account: { type: String, required: true },
    password: { type: String, required: true },
    description: { type: String }
  }, 
  { 
    optimisticConcurrency: true, // 开启__v自增
    collection: 'site' // 设置collection
  }
)

export interface Site extends Document {
  siteName: string
  siteLink: string
  account: string
  password: string
  description: string
}