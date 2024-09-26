import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { AuthService } from './auth.service'
import { CreateUserDto } from '@/modules/user/dto/create-user.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  login(@Body() authDto: CreateUserDto) {
    return this.authService.login(authDto)
  }

  // @Post()
  // create(@Body() createAuthDto: CreateUserDto) {
  //   return this.authService.create(createAuthDto)
  // }

  // @Get()
  // findAll() {
  //   return this.authService.findAll()
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.authService.findOne(+id)
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
  //   return this.authService.update(+id, updateAuthDto)
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.authService.remove(+id)
  // }
}
