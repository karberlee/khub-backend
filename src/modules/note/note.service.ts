import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Note } from './schemas/note.schema'
import { CreateNoteDto } from './dto/create-note.dto'
import { UpdateNoteDto } from './dto/update-note.dto'
import { ReqUserDto } from '@/modules/user/dto/req-user.dto'

@Injectable()
export class NoteService {
  constructor(@InjectModel('Note') private readonly noteModel: Model<Note>) { }

  async create(user: ReqUserDto, createNoteDto: CreateNoteDto) {
    try {
      createNoteDto.userId = user._id
      const currentTime = new Date().toISOString()
      createNoteDto.createTime = currentTime
      createNoteDto.updateTime = currentTime
      const res = await this.noteModel.create(createNoteDto)
      return res
    } catch (error) {
      $.logger.error("error:", error)
      throw error
    }
  }

  async findAll(user: ReqUserDto, query: any) {
    try {
      const selector: object = {}
      if (user && user.role > 0) {
        selector['userId'] = user._id
      }
      if (query?.search) {
        // 使用正则表达式实现模糊查询
        selector['$or'] = [
          { title: { $regex: query.search, $options: 'i' } },
          { content: { $regex: query.search, $options: 'i' } }
        ] // 'i' 表示不区分大小写
      }
      if (query && query.level > -1) {
        selector['level'] = query.level
      }
      const res = await this.noteModel.find(
        selector,
        null,
        { sort: { updateTime: -1 } }
      )
      return res
    } catch (error) {
      $.logger.error("error:", error)
      throw error
    }
  }

  async findOne(user: ReqUserDto, id: string) {
    try {
      const note = await this.noteModel.findOne({ _id: id, userId: user._id })
      if (!note) {
        throw new NotFoundException({
          errType: 1,
          message: `Note with ID ${id} not exist!`
        })
      }
      return note
    } catch (error) {
      $.logger.error("error:", error)
      throw error
    }
  }

  async update(user: ReqUserDto, id: string, updateNoteDto: UpdateNoteDto) {
    try {
      const note = await this.noteModel.findOne({ _id: id, userId: user._id })
      if (!note) {
        throw new NotFoundException({
          errType: 1,
          message: `Note with ID ${id} not exist!`
        })
      }
      Object.assign(note, updateNoteDto)
      note.updateTime = new Date().toISOString()
      const res = await note.save()
      return res
    } catch (error) {
      $.logger.error("error:", error)
      throw error
    }
  }

  async remove(user: ReqUserDto, id: string) {
    try {
      const note = await this.noteModel.findOne({ _id: id, userId: user._id })
      if (!note) {
        throw new NotFoundException({
          errType: 1,
          message: `Note with ID ${id} not exist!`
        })
      }
      const res = await this.noteModel.findByIdAndDelete(note._id)
      return res
    } catch (error) {
      $.logger.error("error:", error)
      throw error
    }
  }
}
