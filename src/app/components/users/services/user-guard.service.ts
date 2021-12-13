import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { User } from '../model/User';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuardService implements CanActivate {

  constructor(private usr: UserService,
    private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser: User | undefined = this.usr.tokenResolve();
    if (currentUser) {
      if (currentUser.roles != undefined) {
        if (route.data['roles'] && route.data['roles'].indexOf(currentUser.roles[0]) === -1) {
          this.router.navigate(['/403']);
          return false;
        }
      }

      return true;
    }

    this.router.navigate(['/Users/Login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
