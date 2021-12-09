import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuardService implements CanActivate{

  constructor(private usr: UserService,
    private router: Router) { }

  canActivate(): boolean{
    if(!this.usr.isAuthenticated()){
      this.router.navigate(['/Users/Login']);
      return false
    }
    return true;
  }
}
