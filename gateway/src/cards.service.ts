import { Inject, Injectable, Req } from '@nestjs/common';
import { catchError, Observable, throwError } from 'rxjs';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { AuthEntity } from './entities/auth.entity';
import { LoginDto } from './dto/login.dto';
import { CreateCardDto } from './dto/create-card.dto';
import { AuthService } from './auth.service';

@Injectable()
export class CardsService {
  constructor(
    @Inject('CARDS_SERVICE') private readonly cards_client: ClientProxy,
    private readonly authService: AuthService,
  ) {}

  create(cardsDto: CreateCardDto, userId: number): Observable<any> {
    const cardData = {
      ...cardsDto,
      userId,
    };
    return this.cards_client.send('create-card', cardData);
  }

  getCards() {
    return this.cards_client.send('get-cards', {});
  }
}
