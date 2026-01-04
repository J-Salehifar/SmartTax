import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  username = '';
  password = '';
  error = '';

  constructor(private api: ApiService, private router: Router) {}

  login() {
    this.api.login(this.username, this.password).subscribe({
      next: (res: any) => {
        localStorage.setItem('access', res.access);
        localStorage.setItem('refresh', res.refresh);
        this.router.navigate(['/dashboard']);
      },
      error: () => {
        this.error = 'Invalid username or password';
      }
    });
  }
}
