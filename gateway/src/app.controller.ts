import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CardsService } from './cards.service';
import { JwtAuthGuard } from './guards/jwt.guard';
import { CreateCardDto } from './dto/create-card.dto';

@Controller()
export class AppController {
  constructor(private readonly cardsService: CardsService) {}

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

  @Get('cards/status/:referenceId')
  async checkCardCreationStatus(
    @Param('referenceId') referenceId: string,
  ): Promise<any> {
    return this.cardsService.checkStatus(referenceId);
  }
}
