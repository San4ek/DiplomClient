import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import {inject} from '@angular/core';
import {catchError, throwError} from 'rxjs';
import {SnackBarService} from '../../../services/snack-bar/snack-bar.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {

  const snackBarService = inject(SnackBarService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'Произошла ошибка';

      if (error.status === 0) {
        errorMessage = '❌ Нет связи с сервером. Проверьте интернет!';
      } else if (error.status >= 400 && error.status < 500) {
        errorMessage = `⚠️ Ошибка клиента (${error.status}): ${error.error?.message || error.message}`;
      } else if (error.status >= 500) {
        errorMessage = `🔥 Ошибка сервера (${error.status}). Повторите попытку позже.`;
      }

      snackBarService.showError(errorMessage);

      return throwError(() => error);
    })
  );
};
