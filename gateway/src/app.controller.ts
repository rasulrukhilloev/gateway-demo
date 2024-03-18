import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AuthEntity } from './entities/auth.entity';
import { CardsService } from './cards.service';
import { JwtAuthGuard } from './guards/jwt.guard';
import { CreateCardDto } from './dto/create-card.dto';
import { UsersService } from './users.service';

@Controller()
export class AppController {
  constructor(
    private readonly authService: AuthService,
    private readonly cardsService: CardsService,
    private readonly usersService: UsersService,
  ) {}

  // ------ AUTH -----

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  // ------ CARDS -----
  @UseGuards(JwtAuthGuard)
  @Post('cards')
  async createCard(@Body() cardsDto: CreateCardDto, @Req() req: any) {
    return this.cardsService.create(cardsDto, req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('cards')
  async getCards() {
    return this.cardsService.getCards();
  }

  // ------ USERS -----

  @Post('users')
  async createUser(@Body() userDto) {
    return this.usersService.create(userDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('users/:id')
  async getUser(@Param('id') id: number) {
    return this.usersService.getUser(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('users')
  async getUsers() {
    return this.usersService.getUsers();
  }
}
