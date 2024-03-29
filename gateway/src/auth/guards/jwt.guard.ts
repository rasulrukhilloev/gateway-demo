import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { TokenValidResult } from '../proto/auth';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) {
      return false;
    }

    return this.authService.authenticate({ accessToken: token }).pipe(
      map((authResult: TokenValidResult) => {
        if (authResult.isValid) {
          request.user = authResult.decoded;
          return true;
        } else {
          return false;
        }
      }),
    );
  }
}
