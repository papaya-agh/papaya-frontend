import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/internal/operators/first';
import { LoginRequest } from '../../declarations/models/login-request';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  loading = false;

  constructor(private authService: AuthService,
              private router: Router,
              private formBuilder: FormBuilder,
              private messageService: MessageService
  ) {
    if (this.authService.isLoggedIn) {
      this.router.navigate([ '/' ]);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: [ '', Validators.required ],
      password: [ { value: '', disabled: true } ]
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    const loginRequest: LoginRequest = {
      username: this.f.username.value
    };

    this.loading = true;
    this.authService.login(loginRequest)
      .pipe(first())
      .subscribe(
        valid => {
          if (!valid) {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid username or password' });
          } else {
            this.router.navigate([ '/' ]);
          }
          this.loading = false;
        },
        error => {
          this.loading = false;
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.errorMessage });
        });
  }
}
