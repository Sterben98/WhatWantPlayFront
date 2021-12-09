import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginPageComponent } from './login-page/login-page.component';
import { PasswordValidatorDirective } from 'src/app/directives/password-validator.directive';
import { RegistrationPageComponent } from './registration-page/registration-page.component';
import { UsernameValidatorDirective } from 'src/app/directives/username-validator.directive';

@NgModule({
  declarations: [
    LoginPageComponent,
    PasswordValidatorDirective,
    RegistrationPageComponent,
    UsernameValidatorDirective
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class UsersModule { }
