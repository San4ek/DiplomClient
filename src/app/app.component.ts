import {Component, OnInit} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from '@angular/material/sidenav';
import {MatIcon} from '@angular/material/icon';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatToolbar} from '@angular/material/toolbar';
import {NavItemComponent} from './shared/nav-item/nav-item.component';
import {AuthService} from './services/auth/auth.service';
import {BehaviorSubject, filter} from 'rxjs';
import {LoadingComponent} from './shared/loading/loading.component';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'side-nav',
  imports: [RouterOutlet, MatSidenavContainer, MatSidenavContent, MatIcon, MatIconButton, MatToolbar, MatSidenav, NavItemComponent, MatButton, LoadingComponent, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  isAuthenticated = new BehaviorSubject<boolean>(false);
  isTokensLoading = new BehaviorSubject<boolean>(false);

  constructor(private authService: AuthService, private router: Router) {
    this.isAuthenticated.next(this.authService.isAuthenticated());
  }

  ngOnInit(): void {
    this.authService.getEvents()
      .pipe(filter((e) => e.type === 'token_received' || e.type === 'session_terminated' || e.type === 'discovery_document_load_error'))
      .subscribe(() => {
        this.isAuthenticated.next(this.authService.isAuthenticated());
        this.isTokensLoading.next(false as boolean);
      });
  }

  handleAuth() {
    this.isTokensLoading.next(true);
    if (this.isAuthenticated.value) {
      this.router.navigate(['/profile']);
    } else {
      this.authService.login();
    }
  }
}
