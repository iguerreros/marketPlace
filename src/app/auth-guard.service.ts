import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

const ACCESS_TOKEN_KEY = environment.ACCESS_TOKEN_KEY;
const USER_SESSION_KEY = environment.USER_SESSION_KEY;

@Injectable()

export class AuthGuardService implements CanActivate {

  constructor(private _router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    
    const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY) ? localStorage.getItem(ACCESS_TOKEN_KEY): sessionStorage.getItem(ACCESS_TOKEN_KEY);
    const userSession = localStorage.getItem(USER_SESSION_KEY)? localStorage.getItem(USER_SESSION_KEY): sessionStorage.getItem(USER_SESSION_KEY);
    if (!accessToken || !userSession) {
     
      this._router.navigate(['/login']);
      return false;
    }

    return true;
  }

}