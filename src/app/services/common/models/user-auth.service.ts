import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../ui/custom-toastr.service';
import { IUserInfo, LoginResponse, TokenResponse } from '../../../contracts/token/tokenResponse';
import { firstValueFrom, Observable } from 'rxjs';
import { SocialUser } from '@abacritt/angularx-social-login';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {
  userStorageKey = "user_info";
  getUser():IUserInfo
  {
    const info = localStorage.getItem(this.userStorageKey);
    return !!info ? JSON.parse(info) as IUserInfo : null;
  }

  constructor(private httpClientService : HttpClientService, private toastrService : CustomToastrService, private router : Router) { }
  
  async login(usernameOrEmail : string, password : string, callBackFunction? : () => void) : Promise<any> {
    const observable: Observable<any | LoginResponse> = this.httpClientService.post<any | LoginResponse>({
      controller:"auth",
      action:"login"
    }, {usernameOrEmail, password})

    const tokenResponse : LoginResponse = await firstValueFrom(observable) as LoginResponse;
    if(tokenResponse) {
      localStorage.setItem("accessToken", tokenResponse.token.accessToken)
      localStorage.setItem("refreshToken", tokenResponse.token.refreshToken)
      localStorage.setItem(this.userStorageKey, JSON.stringify({
        nameSurname:tokenResponse.nameSurname 
      }))
      
      //localStorage.setItem("expiration", tokenResponse.token.expiration.toString())

      this.toastrService.message("Kullanıcı Girişi Başarıyla Sağlanmıştır.", "Giriş Başarılı", {
        messageType : ToastrMessageType.Success,
        position : ToastrPosition.TopRight
      })
    }
      
    callBackFunction();
  }

  async googleLogin(user : SocialUser, callBackFunction?:() => void) {

    const observable : Observable<SocialUser | TokenResponse> = this.httpClientService.post<SocialUser | LoginResponse>({
      action:"google-login",
      controller:"auth"
    }, user)

    const tokenResponse : LoginResponse = await firstValueFrom(observable) as LoginResponse;

    if(tokenResponse) 
      localStorage.setItem("accessToken",tokenResponse.token.accessToken);
      localStorage.setItem("refreshToken", tokenResponse.token.refreshToken);
      localStorage.setItem(this.userStorageKey, JSON.stringify({
        nameSurname:tokenResponse.nameSurname 
      }))

      this.toastrService.message("Google İle Giriş Başarıyla Sağlandı","Giriş Başarılı", {
      messageType: ToastrMessageType.Success,
      position : ToastrPosition.TopRight
    })
    this.router.navigate([""])
    

    callBackFunction();
  }

  async refreshTokenLogin(refreshToken:string, callBackFunction?:(state) => void) {

    const observable : Observable<any | TokenResponse> = this.httpClientService.post({
      action:"refreshtokenlogin",
      controller:"auth"
    }, {refreshToken : refreshToken})

    try{
      const tokenResponse : TokenResponse = await firstValueFrom(observable) as TokenResponse;

      if(tokenResponse) {
        localStorage.setItem("accessToken",tokenResponse.token.accessToken);
        localStorage.setItem("refreshToken", tokenResponse.token.refreshToken);
      }
      callBackFunction(tokenResponse ? true : false);
    }catch {
      callBackFunction(false);
    }
  }
}
