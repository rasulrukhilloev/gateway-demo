import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt.guard';
import { LoginDto } from './dto/login.dto';
import { UsersService } from './users.service';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('users')
  async createUser(@Body() userDto) {
    return this.usersService.create(userDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('users/:id')
  async getUser(@Param('id') id: number) {
    return this.usersService.getUser({ userId: id });
  }

  @UseGuards(JwtAuthGuard)
  @Get('users')
  async getUsers() {
    return this.usersService.getUsers();
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
