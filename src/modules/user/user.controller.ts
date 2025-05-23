import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger'
import { ParseObjectIdPipe } from '@/common/pipes/parse-object-id.pipe'
import { Request } from 'express'
import { UserService } from './user.service'
import { CheckUserDto } from './dto/check-user.dto'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { ReqUserDto } from '@/modules/user/dto/req-user.dto'

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('reload')
  @ApiOperation({ summary: 'Load user info by token' })
  @ApiResponse({ status: 200, description: 'Successful response' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  reload(@Req() req: Request) {
    const user = req['user'] as ReqUserDto
    return this.userService.reload(user._id)
  }

  @Post('check')
  @ApiOperation({ summary: 'Check user password' })
  @ApiResponse({ status: 200, description: 'Successful response' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  check(@Req() req: Request, @Body() checkUserDto: CheckUserDto) {
    const user = req['user'] as ReqUserDto
    return this.userService.check(user.account, checkUserDto)
  }

  @Get('statistics')
  @ApiOperation({ summary: 'Get user data statistics' })
  @ApiResponse({ status: 200, description: 'Successful response' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  statistics(@Req() req: Request) {
    const user = req['user'] as ReqUserDto
    return this.userService.statistics(user._id)
  }

  @Post()
  @ApiOperation({ summary: 'Create user' })
  @ApiBody({
    description: 'The user info to create',
    type: CreateUserDto,
  })
  @ApiResponse({ status: 201, description: 'Successful response' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto)
  }

  @Get()
  @ApiOperation({ summary: 'Find all user' })
  @ApiResponse({ status: 200, description: 'Successful response' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  findAll() {
    return this.userService.findAll()
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find user by ID' })
  @ApiParam({ name: 'id', description: 'The user ID', type: String })
  @ApiResponse({ status: 200, description: 'Successful response' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  findOne(@Param('id', ParseObjectIdPipe) id: string) {
    return this.userService.findOne(id)
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update user by ID' })
  @ApiParam({ name: 'id', description: 'The user ID', type: String })
  @ApiBody({
    description: 'The user info to update',
    type: UpdateUserDto,
  })
  @ApiResponse({ status: 200, description: 'Successful response' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  update(@Param('id', ParseObjectIdPipe) id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete user by ID' })
  @ApiParam({ name: 'id', description: 'The user ID', type: String })
  @ApiResponse({ status: 200, description: 'Successful response' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  remove(@Param('id', ParseObjectIdPipe) id: string) {
    return this.userService.remove(id)
  }
}
