import { Component, OnInit } from '@angular/core';
import { OidcSecurityService } from "angular-auth-oidc-client";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  isUserLoggedIn: boolean = false;

  constructor(private oidcSecurityService: OidcSecurityService) {
//     authService.isUserLoggedIn.subscribe(value => {
//       this.isUserLoggedIn = value;
//     });
//     this.isUserLoggedIn = authService.isLoggedIn();
  }

  login() {
//     this.authService.login();
  }

  logout() {
//     this.authService.logout();
//     this.isUserLoggedIn = false;
  }

  ngOnInit(): void {
    this.oidcSecurityService.isAuthenticated$.subscribe(({isAuthenticated}) => {
//       this.isUserLoggedIn = isUserLoggedIn;
    });
  }
}
