import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule, MessageService } from 'primeng/primeng';
import { ToastModule } from 'primeng/toast';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PCommonModule } from './p-common/p-common.module';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { initializer } from './auth/app-init';
import { AppAuthGuard } from './auth/app-auth-guard.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CardModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    ToastModule,
    BrowserAnimationsModule,
    PCommonModule,
    KeycloakAngularModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializer,
      multi: true,
      deps: [ KeycloakService ],
    },
    AppAuthGuard,
    MessageService,
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
