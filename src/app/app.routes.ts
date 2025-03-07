import {Routes} from '@angular/router';
import {RegistrationFormComponent} from './components/registration-form/registration-form.component';
import {AuthCodeFormComponent} from './components/auth-code-form/auth-code-form.component';
import {PersonalPageComponent} from './pages/personal-page/personal-page.component';

export const routes: Routes = [
  {
    path: 'registration',
    component: RegistrationFormComponent,
  },
  {
    path: '',
    component: AuthCodeFormComponent,
  },
  {
    path: 'profile',
    component: PersonalPageComponent,
  }
];
