import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Req } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import * as fs from 'fs'
import * as path from 'path'
import { StorageService } from './storage.service'
import { ReqUserDto } from '@/modules/user/dto/req-user.dto'

@Controller('storage')
export class StorageController {
  constructor(private readonly storageService: StorageService) {}

  @Post('upload/image/:type')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        // destination: './public/images', // 文件存储目录
        destination: (req, file, cb) => {
          // 使用参数 type 来指定上传目录
          const user = req['user'] as ReqUserDto
          const uploadPath = `./public/images/${user._id}/${req.params.type}` // 例如 ./public/images/<user_id>/avatars 或 ./public/images/<user_id>/thumbnails
          
          // 创建目录（如果不存在）
          const fullPath = path.resolve(uploadPath)
          
          if (!fs.existsSync(fullPath)) {
            fs.mkdirSync(fullPath, { recursive: true })
          }

          // 设置文件存储目录
          cb(null, fullPath)
        },
        filename: (req, file, cb) => {
          const filename = `${Date.now()}-${file.originalname}`
          cb(null, filename)
        },
      }),
      fileFilter: (req, file, cb) => {
        const allowedMimes = ['image/jpeg', 'image/png', 'image/gif'] // 允许的图片格式
        if (allowedMimes.includes(file.mimetype)) {
          cb(null, true) // 通过验证
        } else {
          cb(new Error('Invalid file type. Only images are allowed!'), false) // 其他类型拒绝
        }
      },
      limits: {
        fileSize: 1024 * 1024 * 20, // 限制文件大小（20MB）
      },
    }),
  )
  uploadImage(@Req() req: Request, @Param('type') type: string, @UploadedFile() file: Express.Multer.File) {
    $.logger.info(file)  // 上传的文件信息
    const user = req['user'] as ReqUserDto
    return $.util.successRes(0, { 
      message: 'File uploaded successfully',
      path: `public/images/${user._id}/${type}`,
      file: file.filename,
    })
  }

  // @Post()
  // create(@Body() createStorageDto: CreateStorageDto) {
  //   return this.storageService.create(createStorageDto);
  // }

  // @Get()
  // findAll() {
  //   return this.storageService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.storageService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateStorageDto: UpdateStorageDto) {
  //   return this.storageService.update(+id, updateStorageDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.storageService.remove(+id);
  // }
}
