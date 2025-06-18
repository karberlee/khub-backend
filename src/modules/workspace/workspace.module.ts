import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { WorkspaceService } from './workspace.service'
import { WorkspaceController } from './workspace.controller'
import { WorkspaceSchema } from './schemas/workspace.schema'
import { SiteSchema } from '@/modules/site/schemas/site.schema'
import { NoteSchema } from '@/modules/note/schemas/note.schema'
import { DocSchema } from '@/modules/doc/schemas/doc.schema'

@Module({
  imports: [MongooseModule.forFeature([
    { name: 'Workspace', schema: WorkspaceSchema },
    { name: 'Site', schema: SiteSchema },
    { name: 'Note', schema: NoteSchema },
    { name: 'Doc', schema: DocSchema },
  ])],
  controllers: [WorkspaceController],
  providers: [WorkspaceService],
  exports: [WorkspaceService],
})
export class WorkspaceModule {}
