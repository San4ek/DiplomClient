import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PersonalInfoFormComponent} from '../../components/personal-info-form/personal-info-form.component';

@Component({
  selector: 'app-personal-page',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    PersonalInfoFormComponent
  ],
  templateUrl: './personal-page.component.html',
  styleUrl: './personal-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersonalPageComponent {
}
