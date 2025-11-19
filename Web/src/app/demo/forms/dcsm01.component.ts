// angular import
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-docsystem',
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './dcsm01.component.html',
  styleUrls: ['./dcsm01.component.scss']
})
export class Dcsm01Component implements OnInit {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
  }

  ngOnInit() {
   
  }

  onSubmit() {
    if (this.loginForm.value != null) {
      const { username, password } = this.loginForm.value;
      
      this.authService.login({ username, password }).subscribe({
        next: (response) => {
          console.log('Login successful:', response);
          this.router.navigate(['/default']);
        },
        error: (error) => {
          console.error('Login failed:', error);
        }
      });
    }
  }

}
