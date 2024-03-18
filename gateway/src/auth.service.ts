import {Inject, Injectable} from '@nestjs/common';
import {catchError, Observable, throwError} from "rxjs";
import {ClientProxy, RpcException} from "@nestjs/microservices";
import {AuthEntity} from "./entities/auth.entity";
import {LoginDto} from "./dto/login.dto";
import {CreateCardDto} from "./dto/create-card.dto";

@Injectable()
export class AuthService {

    constructor(@Inject('AUTH_SERVICE') private readonly auth_client: ClientProxy) {
    }

    authenticate(token: AuthEntity): Observable<any> {
        return this.auth_client.send('authenticate', token);
    }

    login(loginData: LoginDto): Observable<AuthEntity> {
        return this.auth_client.send('login', loginData).pipe(
            catchError(error => throwError(() => new RpcException(error)))
        );
    }


}