import { Inject, Injectable, Req } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { CreateCardDto } from './dto/create-card.dto';
import { uuid } from 'uuidv4';

@Injectable()
export class CardsService {
  constructor(
    @Inject('CARDS_SERVICE') private readonly cards_client: ClientProxy,
  ) {}

  create(cardsDto: CreateCardDto, userId: number) {
    //Observable<any>
    const referenceId = uuid();

    const cardData = {
      ...cardsDto,
      userId,
      referenceId,
    };

    this.cards_client.emit('create-card', cardData); //.pipe(timeout(12000));
    return referenceId;
  }

  getCards() {
    return this.cards_client.send('get-cards', {});
  }

  checkStatus(referenceId: string) {
    return this.cards_client.send('check-card-status', referenceId);
  }
}
