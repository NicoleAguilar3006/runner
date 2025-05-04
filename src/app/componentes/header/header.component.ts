import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AccountService } from '../../service/account/account.service';
import { Observable, retry } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  router = inject(Router);
  isLogged: boolean = false;
  loaded: boolean = false;

  constructor(
    private accountService: AccountService
  ) { }

  isLoggedIn() {
    return this.accountService.isLoggedIn()
  }

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      this.accountService.isLoggedIn();
      this.loaded = true;
    }
  }

  logout() {; 
    this.accountService.logout();
    this.router.navigate(['/sign-in']);
  }
}
