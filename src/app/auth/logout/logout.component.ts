import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  template: '<p-toast></p-toast>'
})
export class LogoutComponent implements OnInit {

  constructor(private authService: AuthService,
              private router: Router,
              private messageService: MessageService) {
  }

  ngOnInit() {
    this.authService.logout();
    setTimeout(() => this.messageService.add({ severity: 'success', summary: 'Success!', detail: 'You have been logged out' }));
    this.router.navigate([ '/login' ]);
  }
}
