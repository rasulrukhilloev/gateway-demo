import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from './../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { RpcException } from '@nestjs/microservices';
import { LoginDto } from './dto/login.dto';
import { AuthEntity, TokenValidResult } from '../proto/auth';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async validateToken(token: AuthEntity): Promise<TokenValidResult> {
    try {
      const decoded = this.jwtService.verify(
        token.accessToken,
        // {
        //   secret: jwtSecret,
        // }
      );
      return { isValid: true, decoded };
    } catch (error) {
      return { isValid: false, error: error.message };
    }
  }

  async login(loginDto: LoginDto): Promise<AuthEntity> {
    const user = await this.prisma.user.findUnique({
      where: { email: loginDto.email },
    });
    if (!user) {
      throw new RpcException(
        new NotFoundException(`No user found for email: ${loginDto.email}`),
      );
    }
    if (!(user.password === loginDto.password)) {
      throw new RpcException(new UnauthorizedException('Invalid password'));
    }
    return {
      accessToken: this.jwtService.sign({ userId: user.id }),
    };
  }
}
