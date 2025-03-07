import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpInterceptorFn,
  HttpRequest
} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {catchError, from, Observable, switchMap, throwError} from 'rxjs';
import {AuthService} from '../../../services/auth/auth.service';

@Injectable()
export class AuthResponseInterceptor implements HttpInterceptor {
  constructor(private oauthService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          return from(this.oauthService.silentRefresh()).pipe( // <-- Преобразуем Promise в Observable
            switchMap(() => next.handle(req)), // Повторяем запрос после обновления токена
            catchError(() => {
              this.oauthService.logout();
              return throwError(() => error);
            })
          );
        }
        return throwError(() => error);
      })
    );
  }
}
