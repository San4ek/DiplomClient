import {ChangeDetectionStrategy, Component, Input, numberAttribute} from '@angular/core';
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {animate, style, transition, trigger} from "@angular/animations";
import {Observable} from 'rxjs';
import {AsyncPipe} from '@angular/common';

@Component({
    selector: 'app-loading',
  imports: [
    MatProgressSpinner,
    AsyncPipe
  ],
    templateUrl: './loading.component.html',
    styleUrl: './loading.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingComponent {

    @Input({required:true})
    isLoading!: Observable<boolean>;

    @Input({transform: numberAttribute, required: true})
    diameter!: number;
}
