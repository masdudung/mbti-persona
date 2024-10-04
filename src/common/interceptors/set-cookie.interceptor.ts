import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class SetCookieInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        const response = context.switchToHttp().getResponse();

        response.cookie('refreshToken', data.data.refreshToken, {
          httpOnly: true,
          secure: true,
          sameSite: 'Strict',
          maxAge: 60 * 60 * 24 * 7,
        });

        // delete refreshToken
        delete data.data.refreshToken;

        return data;
      }),
    );
  }
}
