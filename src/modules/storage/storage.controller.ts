import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { StorageService } from './storage.service'

@Controller('storage')
export class StorageController {
  constructor(private readonly storageService: StorageService) {}

  @Post('upload/image')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './public/images', // 文件存储目录
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
        fileSize: 1024 * 1024 * 5, // 限制文件大小（5MB）
      },
    }),
  )
  uploadImage(@UploadedFile() file: Express.Multer.File) {
    $.logger.info(file)  // 上传的文件信息
    return $.util.successRes(0, { 
      message: 'File uploaded successfully',
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
