// angular import
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-docsystem',
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './dcsm01-detail.component.html',
  styleUrls: ['./dcsm01-detail.component.scss']
})
export class Dcsm01DetailComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private route: ActivatedRoute) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
  }

  ngOnInit() {
    const employeeId = this.route.snapshot.paramMap.get('id');
    console.log('Employee ID:', employeeId);
  }

  onSubmit() {

  }


}
