import { Component, OnInit } from '@angular/core';
import { LoginResult } from '../../declarations/models/login-result';
import { LoginService } from '../common/service/login.service';
import { LoginRequest } from '../../declarations/models/login-request';

@Component({
  selector: 'app-another-component',
  templateUrl: './another-component.component.html',
  styleUrls: [ './another-component.component.css' ]
})
export class AnotherComponentComponent implements OnInit {

  loginResult: LoginResult;

  constructor(private loginService: LoginService) {
  }

  ngOnInit() {
    const loginRequest: LoginRequest = {
      username: 'username',
      admin: true,
    };

    this.loginService.requestLogin(loginRequest).subscribe(result => this.loginResult = result);
  }
}
