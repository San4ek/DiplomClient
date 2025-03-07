import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatError, MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-auth-code-form',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    NgIf
  ],
  templateUrl: './auth-code-form.component.html',
  styleUrl: './auth-code-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthCodeFormComponent {

  authCodeForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.authCodeForm = this.fb.group({
      code: ['', [Validators.required, Validators.pattern('[0-9]{4}')]],
    });
  }

  onSubmit() {
    if (this.authCodeForm.valid) {
      console.log('Регистрация успешна', this.authCodeForm.value);
    } else {
      this.authCodeForm.markAllAsTouched();
    }
  }
}
