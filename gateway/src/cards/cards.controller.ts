import {
  Body,
  Controller,
  Get,
  Inject,
  OnModuleInit,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CardsService } from './cards.service';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { CreateCardDto } from './dto/create-card.dto';
import { ClientKafka } from '@nestjs/microservices';

@Controller()
export class CardsController implements OnModuleInit {
  constructor(
    private readonly cardsService: CardsService,
    @Inject('CARDS_SERVICE') private readonly cardsClient: ClientKafka,
  ) {}

  onModuleInit() {
    this.cardsClient.subscribeToResponseOf('get-cards');
  }

  @UseGuards(JwtAuthGuard)
  @Post('cards')
  async createCard(@Body() cardsDto: CreateCardDto, @Req() req: any) {
    return this.cardsService.create(cardsDto, req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('cards')
  async getCards() {
    return await this.cardsService.getCards();
  }

  // @Get('cards/status/:referenceId')
  // async checkCardCreationStatus(
  //   @Param('referenceId') referenceId: string,
  // ): Promise<any> {
  //   return this.cardsService.checkStatus(referenceId);
  // }
}
