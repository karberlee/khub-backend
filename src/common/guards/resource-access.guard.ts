import { Injectable, CanActivate, ExecutionContext, ForbiddenException, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Workspace } from '@/modules/workspace/schemas/workspace.schema'
import { Asset } from '@/modules/asset/schemas/asset.schema'

@Injectable()
export class ResourceAccessGuard implements CanActivate {
  constructor(
    @InjectModel('Workspace') private readonly workspaceModel: Model<Workspace>,
    @InjectModel('Asset') private readonly assetModel: Model<Asset>,
  ) { }

  private readonly modelMapping: object = {
    asset: this.assetModel,
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const user = request.user
    if (user.role === 0) {
      return true
    }
    const url = request.url
    // 获取 GET 请求的查询参数
    const query = request.query
    // 提取路径部分 (去掉查询参数)
    const path = url.split('?')[0]
    // 获取第一个路径段（例如 '/target/aaa/bbb' 会提取 'target'）
    const firstPathSegment = path.split('/')[1]

    const currentModel: Model<any> = this.modelMapping[firstPathSegment]

    let workspaceId: string

    // 查询类接口（docId -> 找 workspaceId/从 query 中拿 workspaceId）
    if (['GET', 'PUT', 'PATCH', 'DELETE'].includes(request.method)) {
      const id = request.params.id
      if (id) { // 如果params中存在id，即PATCH修改/DELETE删除/GET通过id查询单个等
        const resource = await currentModel.findById(id).exec()
        if (!resource) {
          throw new NotFoundException({
            errType: 1,
            message: `${firstPathSegment} not exist!`
          })
        }
        workspaceId = resource.workspaceId.toString()
      } else { // 如果params中不存在id，即GET条件查询
        workspaceId = query.workspaceId
      }
    }

    // 创建类接口（从 body 中拿 workspaceId）
    if (request.method === 'POST') {
      workspaceId = request.body.workspaceId
    }

    const workspaceCheck = await this.workspaceModel.findOne({
      _id: workspaceId,
      owner: user._id,
      active: true,
    }).exec()

    if (!workspaceCheck) {
      throw new ForbiddenException({
        errType: 2,
        message: `Forbidden! Permission denied!`
      })
    }

    // 可选 RBAC 检查
    // if (this.mode === 'write' && workspaceCheck.role === 'viewer') {
    //   throw new ForbiddenException({
    //     errType: 2,
    //     message: `Forbidden! Readonly!`
    //   })
    // }

    return true
  }

}
