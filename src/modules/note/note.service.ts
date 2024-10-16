import { Injectable, InternalServerErrorException } from '@nestjs/common'
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
      return $.util.successRes(0, res)
    } catch (error) {
      $.logger.error("error:", error)
      throw new InternalServerErrorException(error)
    }
  }

  async findAll(user: ReqUserDto) {
    try {
      const selector: object = {}
      if (user && user.role > 0) {
        selector['userId'] = user._id
      }
      const res = await this.noteModel.find(selector)
      return $.util.successRes(0, res)
    } catch (error) {
      $.logger.error("error:", error)
      throw new InternalServerErrorException(error)
    }
  }

  async findOne(user: ReqUserDto, id: string) {
    try {
      const note = await this.noteModel.findOne({ _id: id, userId: user._id })
      if (!note) {
        return $.util.failRes(404, `Note with ID ${id} not exist!`)
      }
      return $.util.successRes(0, note)
    } catch (error) {
      $.logger.error("error:", error)
      throw new InternalServerErrorException(error)
    }
  }

  async update(user: ReqUserDto, id: string, updateNoteDto: UpdateNoteDto) {
    try {
      const note = await this.noteModel.findOne({ _id: id, userId: user._id })
      if (!note) {
        return $.util.failRes(404, `Note with ID ${id} not exist!`)
      }
      Object.assign(note, updateNoteDto)
      note.updateTime = new Date().toISOString()
      const res = await note.save()
      return $.util.successRes(0, res)
    } catch (error) {
      $.logger.error("error:", error)
      throw new InternalServerErrorException(error)
    }
  }

  async remove(user: ReqUserDto, id: string) {
    try {
      const note = await this.noteModel.findOne({ _id: id, userId: user._id })
      if (!note) {
        return $.util.failRes(404, `Note with ID ${id} not exist!`)
      }
      const res = await this.noteModel.findByIdAndDelete(note._id)
      return $.util.successRes(0, res)
    } catch (error) {
      $.logger.error("error:", error)
      throw new InternalServerErrorException(error)
    }
  }
}
