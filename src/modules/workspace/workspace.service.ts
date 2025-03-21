import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Workspace } from './schemas/workspace.schema'
import { CreateWorkspaceDto } from './dto/create-workspace.dto'
import { UpdateWorkspaceDto } from './dto/update-workspace.dto'
import { ReqUserDto } from '@/modules/user/dto/req-user.dto'

@Injectable()
export class WorkspaceService {
  constructor(@InjectModel('Workspace') private readonly workspaceModel: Model<Workspace>) { }

  async create(user: ReqUserDto, createWorkspaceDto: CreateWorkspaceDto) {
    try {
      const workspaceObj = { ...createWorkspaceDto }
      workspaceObj['owner'] = user._id
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
        null, // 返回字段指定
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

  // findOne(id: number) {
  //   return `This action returns a #${id} workspace`;
  // }

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
