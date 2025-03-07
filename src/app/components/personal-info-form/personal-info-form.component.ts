import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatError, MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {AsyncPipe, NgIf} from '@angular/common';
import {UserInfoService} from '../../services/http/user-info/user-info.service';
import {BehaviorSubject} from 'rxjs';
import {UserInfo} from '../../dto/user-info/user-info';
import {HttpErrorResponse} from '@angular/common/http';
import {LoadingComponent} from '../../shared/loading/loading.component';

const INITIAL_USER_INFO: UserInfo = {
  id: "", name: "", contact: "", description: ""
}

@Component({
  selector: 'app-personal-info-form',
  imports: [
    FormsModule,
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    NgIf,
    ReactiveFormsModule,
    AsyncPipe,
    LoadingComponent
  ],
  templateUrl: './personal-info-form.component.html',
  styleUrl: './personal-info-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersonalInfoFormComponent implements OnInit {

  personalInfoForm: FormGroup;
  isEditing = new BehaviorSubject<boolean>(false);
  isLoading = new BehaviorSubject<boolean>(true);
  userInfo = new BehaviorSubject<UserInfo>(INITIAL_USER_INFO);
  isInitial = new BehaviorSubject<boolean>(false);

  constructor(private fb: FormBuilder, private service: UserInfoService) {
    this.personalInfoForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      contact: ['', [Validators.required, Validators.email]],
      description: ['', [Validators.maxLength(300)]]
    }, {
      updateOn: 'change',
    });
  }

  ngOnInit() {
    this.personalInfoForm.patchValue(INITIAL_USER_INFO);
    this.loadPersonalInfo();
  }

  loadPersonalInfo() {
    setTimeout(() => {
    }, 5000);
    this.service.get().subscribe({
      next: (userInfo) => {
        this.userInfo.next(userInfo)
        this.personalInfoForm.patchValue(userInfo)
        this.isInitial.next(false);
        this.isLoading.next(false);
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
        this.isLoading.next(false);
      }
    });
  }

  toggleEdit() {
    if (this.isEditing) {
      this.personalInfoForm.setValue(this.userInfo);
    }
    this.isEditing.next(this.isEditing.value);
  }

  save() {
    if (this.personalInfoForm.valid) {
      console.log('Сохраненные данные:', this.personalInfoForm.value);
      this.userInfo = this.personalInfoForm.value;
      this.isEditing.next(false);
    }
  }
}
