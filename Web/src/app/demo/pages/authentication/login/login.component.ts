// angular import
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AuthService } from 'src/app/services/auth.service';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';

@Component({
  selector: 'app-login',
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private sweetAlert: SweetAlertService) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
  }

  ngOnInit() {
   
  }

  onPasswordKeyPress(event: KeyboardEvent) {
    const char = String.fromCharCode(event.which);
    if (!/[A-Za-z0-9]/.test(char)) {
      event.preventDefault();
    }
  }

  onSubmit() {
    if (this.loginForm.value != null) {
      const { username, password } = this.loginForm.value;
      
      this.authService.login({ username, password }).subscribe({
        next: (response) => {
          this.sweetAlert.success('Login', 'Login successful!');
          this.router.navigate(['/default']);
        },
        error: (error) => {
          this.sweetAlert.error('Login', 'Login failed!');
        }
      });
    }
  }
}
