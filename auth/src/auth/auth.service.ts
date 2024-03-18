import {
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from './../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { AuthEntity } from './entities/auth.entity';
import { RpcException } from '@nestjs/microservices';
import {jwtSecret} from "./auth.module";


@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private jwtService: JwtService) {}

    async validateToken(token: AuthEntity): Promise<any> {
        try {
            const decoded = this.jwtService.verify(token.accessToken, {
                secret: jwtSecret,
            });
            return { isValid: true, decoded };
        } catch (error) {
            return { isValid: false, error: error.message };
        }
    }

    async login({email, password}): Promise<AuthEntity> {
        const user = await this.prisma.user.findUnique({ where: { email: email } });
        if (!user) {
            throw new RpcException(new NotFoundException(`No user found for email: ${email}`));
        }
        const isPasswordValid = user.password === password;
        if (!isPasswordValid) {
            throw new RpcException(new UnauthorizedException('Invalid password'));
        }
        return {
            accessToken: this.jwtService.sign({ userId: user.id }),
        };
    }
}