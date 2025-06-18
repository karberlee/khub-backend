import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Workspace } from './schemas/workspace.schema'
import { Site } from '@/modules/site/schemas/site.schema'
import { Note } from '@/modules/note/schemas/note.schema'
import { Doc } from '@/modules/doc/schemas/doc.schema'
import { CreateWorkspaceDto } from './dto/create-workspace.dto'
import { UpdateWorkspaceDto } from './dto/update-workspace.dto'
import { ReqUserDto } from '@/modules/user/dto/req-user.dto'
import { StatisticModel } from '@/types/type'

@Injectable()
export class WorkspaceService {
  constructor(
    @InjectModel('Workspace') private readonly workspaceModel: Model<Workspace>,
    @InjectModel('Site') private readonly siteModel: Model<Site>,
    @InjectModel('Note') private readonly noteModel: Model<Note>,
    @InjectModel('Doc') private readonly docModel: Model<Doc>,
  ) { }

  async create(user: ReqUserDto, createWorkspaceDto: CreateWorkspaceDto, isDefault: boolean = false) {
    try {
      const workspaceObj = { ...createWorkspaceDto }
      workspaceObj['owner'] = user._id
      workspaceObj['default'] = isDefault
      const workspace = new this.workspaceModel(workspaceObj)
      await workspace.save()
      return { message: 'Success!' }
    } catch (error) {
      $.logger.error("error:", error)
      throw error
    }
  }

  async findAll(user: ReqUserDto, query: any = {}) {
    try {
      const selector: object = {}
      if (user && user.role > 0) {
        selector['owner'] = user._id
      }
      const res = await this.workspaceModel.find(
        selector,
        [ '_id', 'name', 'default', 'active', 'createTime' ], // 返回字段指定
        { 
          sort: { createTime: -1 },
          // limit: 1,
          // skip: 1,
        }
      )
      return res
    } catch (error) {
      $.logger.error("error:", error)
      throw error
    }
  }

  async getStatistic(user: ReqUserDto, id: string) {
    try {
      const statistic: StatisticModel = {
        siteCount: 0,
        noteCount: 0,
        doc: {
          publicCount: 0,
          privateCount: 0,
          totalCount: 0
        }
      }
      statistic.siteCount = await this.siteModel.countDocuments({ userId: user._id, workspaceId: id })
      statistic.noteCount = await this.noteModel.countDocuments({ userId: user._id, workspaceId: id })
      statistic.doc.publicCount = await this.docModel.countDocuments({ owner: user._id, workspaceId: id, public: true })
      statistic.doc.privateCount = await this.docModel.countDocuments({ owner: user._id, workspaceId: id, public: false })
      statistic.doc.totalCount = await this.docModel.countDocuments({ owner: user._id, workspaceId: id })
      return statistic
    } catch (error) {
      $.logger.error("error:", error)
      throw error
    }
  }

  async update(user: ReqUserDto, id: string, updateWorkspaceDto: UpdateWorkspaceDto) {
    try {
      const workspace = await this.workspaceModel.findOne({ _id: id })
      if (!workspace) {
        throw new NotFoundException({
          errType: 1,
          message: `Workspace with ID ${id} not exist!`
        })
      }
      if (workspace.owner != user._id) {
        throw new ForbiddenException({
          errType: 1,
          message: `Forbidden! You are not the owner with workspace ${id}!`
        })
      }
      Object.assign(workspace, updateWorkspaceDto)
      await workspace.save()
      return { message: 'Success!' }
    } catch (error) {
      $.logger.error("error:", error)
      throw error
    }
  }

  async remove(user: ReqUserDto, id: string) {
    try {
      const workspace = await this.workspaceModel.findOne({ _id: id, owner: user._id })
      if (!workspace) {
        throw new NotFoundException({
          errType: 1,
          message: `Workspace with ID ${id} not exist!`
        })
      }
      await this.workspaceModel.findByIdAndDelete(workspace._id)
      return { message: 'Success!' }
    } catch (error) {
      $.logger.error("error:", error)
      throw error
    }
  }
}
