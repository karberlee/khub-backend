import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger'
import { AuthService } from './auth.service'
import { CreateUserDto } from '@/modules/user/dto/create-user.dto'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @ApiOperation({ summary: 'Login' })
  @ApiBody({
    description: 'The user info to login',
    type: CreateUserDto,
  })
  @ApiResponse({ status: 201, description: 'Successful response' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
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
