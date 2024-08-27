import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private jwtHelper : JwtHelperService) { }
  idendityCheck() {
    const token: string = localStorage.getItem("accessToken");
    let expired: boolean;
    console.log(token)
    try {
      const decoded = this.jwtHelper.decodeToken(token);
      expired = this.jwtHelper.isTokenExpired(token);
    } catch(err) {
      expired = true;
    }

    _isAuthenticated = token != null && !expired;
  }

  get isAuthenticated() : boolean {
    return _isAuthenticated;
  }

}

export let _isAuthenticated : boolean;
