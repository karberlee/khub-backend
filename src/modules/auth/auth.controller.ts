import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger'
import { AuthService } from './auth.service'
import { CreateUserDto } from '@/modules/user/dto/create-user.dto'
import { TokenInterceptor } from "@/common/interceptors/token.interceptor";

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseInterceptors(TokenInterceptor)
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

  @Post('signup')
  @ApiOperation({ summary: 'Sign up User' })
  @ApiBody({
    description: 'The user info to signup',
    type: CreateUserDto,
  })
  @ApiResponse({ status: 201, description: 'Successful response' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  signup(@Body() signupDto: CreateUserDto) {
    return this.authService.signup(signupDto)
  }

  @Post('sendCode')
  @ApiOperation({ summary: 'Send sign up verify code' })
  @ApiBody({
    description: 'The user email to signup',
    type: Object,
  })
  @ApiResponse({ status: 201, description: 'Successful response' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  sendCode(@Body() body: any) {
    const email = body.email
    return this.authService.sendCode(email)
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
