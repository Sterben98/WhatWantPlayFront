import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { AppConstants } from 'src/app/AppConstanse';
import { LoginData } from 'src/app/components/users/model/LoginData';
import { LoginResponse } from '../model/LoginResponse';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../model/User';
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';

const baseUrl= "http://localhost:7070/auth"

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient,
    private jwtHelper: JwtHelperService) { }

  signIn(data: LoginData) : Observable<LoginResponse>{
    return this.httpClient
    .post<LoginResponse>(`${baseUrl}/signin`, data)
    .pipe(catchError(this.handleError));
  }


  signUp(user: User): Observable<LoginResponse>  {
    return this.httpClient
    .post<LoginResponse>(`${baseUrl}/`, user)
    .pipe(catchError(this.handleError));
  }

  logOut(): Observable<LoginResponse>{
    return this.httpClient
    .post<LoginResponse>(`${baseUrl}/logout`, '')
    .pipe(catchError(this.handleError));
  }

  checkUsername(): AsyncValidatorFn{
    
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.httpClient.get<any>(`${baseUrl}/username/${control.value}/`)
        .pipe(
          map(res => {
            return (res.lenght) ? { 'usernameExists': true } : null
            }
          )
        );
    };
  }

  public tokenResolve(): User | undefined{
    let login: LoginResponse;
    
    let loginStr: string | null = localStorage.getItem(
      AppConstants.LOGIN_STORAGE
    );

    if (loginStr !== '' && loginStr !== null && loginStr !== undefined) {
      login = JSON.parse(loginStr);
    } else {
      return undefined;
    }

    const token = login.token;
    let tokenExpired: boolean = false;

    if (this.jwtHelper.isTokenExpired(token)) {
      localStorage.setItem(AppConstants.LOGIN_STORAGE, '');
      tokenExpired = true;

      return undefined;
    }

    const roles= this.jwtHelper.decodeToken(token).roles;

    let loggedUser: User= {firstName:"", lastName:"", password:"", username:"", roles: roles};

    return loggedUser;
  } 
  
  public isAuthenticated(): boolean {
    let login: LoginResponse;
    
    let loginStr: string | null = localStorage.getItem(
      AppConstants.LOGIN_STORAGE
    );

    if (loginStr !== '' && loginStr !== null && loginStr !== undefined) {
      login = JSON.parse(loginStr);
    } else {
      return false;
    }

    const token = login.token;
    let tokenExpired: boolean = false;

    if (this.jwtHelper.isTokenExpired(token)) {
      localStorage.setItem(AppConstants.LOGIN_STORAGE, '');
      tokenExpired = true;
    }

    return !tokenExpired;
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {

      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }

    return throwError('Something bad happened; please try again later.');
  }


}
