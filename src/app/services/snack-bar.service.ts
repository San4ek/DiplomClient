import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {Observable, Subject} from 'rxjs';
import { concatMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {
  private snackSubject = new Subject<{ message: string, styleClass: string }>();

  constructor(private snackBar: MatSnackBar) {
    this.snackSubject.pipe(
      concatMap(({ message, styleClass }) => {
        return new Observable(observer => {
          this.snackBar.open(message, 'Закрыть', {
            duration: 3000,
            panelClass: [styleClass],
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          }).afterDismissed().subscribe(() => {
            observer.complete();
          });
        });
      })
    ).subscribe();
  }

  showMessage(message: string): void {
    this.snackSubject.next({ message: message, styleClass: 'custom-error-snackbar' });
  }

  showError(error: string): void {
    this.snackSubject.next({ message: error, styleClass: 'custom-error-snackbar' });
  }
}
