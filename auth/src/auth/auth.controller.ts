import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AuthEntity } from './entities/auth.entity';
import {
  AuthServiceController,
  AuthServiceControllerMethods,
} from '../proto/auth';

@Controller('auth')
@AuthServiceControllerMethods()
export class AuthController implements AuthServiceController {
  constructor(private readonly authService: AuthService) {}

  async login(loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  async authenticate(token: AuthEntity) {
    return this.authService.validateToken(token);
  }

  // @MessagePattern('refreshToken')
}
