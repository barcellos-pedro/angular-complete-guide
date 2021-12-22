import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private authService: AuthService) { }

  login(): void {
    this.authService.login();
    alert('Logged in!');
  }

  logout(): void {
    this.authService.logout();
    alert('Logged out');
  }
}
