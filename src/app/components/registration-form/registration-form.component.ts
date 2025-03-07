import {Component} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {NgIf} from '@angular/common';
import {MatInput} from '@angular/material/input';

@Component({
  selector: 'app-registration-form',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    NgIf,
    MatInput,
  ],
  templateUrl: './registration-form.component.html',
  styleUrl: './registration-form.component.css'
})
export class RegistrationFormComponent {

  registerForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      nickname: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      console.log('Регистрация успешна', this.registerForm.value);
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}
