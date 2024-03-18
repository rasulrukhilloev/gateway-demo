import {Body, Controller, Post} from '@nestjs/common';
import { AuthService } from './auth.service';
import {LoginDto} from "./dto/login.dto";
import {MessagePattern} from "@nestjs/microservices";
import {AuthEntity} from "./entities/auth.entity";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('login')
  async login(loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @MessagePattern('authenticate')
  async validate(token: AuthEntity) {
    return this.authService.validateToken(token);
  }
}
