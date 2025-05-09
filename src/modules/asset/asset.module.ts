import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { WorkspaceSchema } from '@/modules/workspace/schemas/workspace.schema'
import { AssetService } from './asset.service'
import { AssetController } from './asset.controller'
import { AssetSchema } from './schemas/asset.schema'

@Module({
  imports: [MongooseModule.forFeature([
    { name: 'Workspace', schema: WorkspaceSchema },
    { name: 'Asset', schema: AssetSchema },
  ])],
  controllers: [AssetController],
  providers: [AssetService],
})
export class AssetModule {}
