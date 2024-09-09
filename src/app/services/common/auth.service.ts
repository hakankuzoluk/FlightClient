import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClientService } from './http-client.service';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private jwtHelper : JwtHelperService, private httpClientService : HttpClientService) { }
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

  hasAnyRole(): Observable<boolean> {
    const requestParams = {
      controller: 'users',
      action: 'has-any-role'
    };
    return this.httpClientService.get<{hasRole:boolean}>(requestParams).pipe(map(res=>res?.hasRole));
  }

}

export let _isAuthenticated : boolean;
