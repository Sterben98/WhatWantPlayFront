import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/common/header/header.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { LoginResponse } from './components/users/model/LoginResponse';
import { AppConstants } from './AppConstanse';

export function tokenGetter() {
  let loginStored: LoginResponse;

  let loginStr: string | null = localStorage.getItem(
    AppConstants.LOGIN_STORAGE
  );

  if (loginStr !== '' && loginStr !== null && loginStr !== undefined) {
    loginStored = JSON.parse(loginStr);
  } else {
    return '';
  }

  return loginStored.token;
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomePageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
        allowedDomains: ['localhost:7070']
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
