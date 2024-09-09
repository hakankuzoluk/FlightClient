import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { threadId } from 'worker_threads';
import { User } from '../../../contracts/user';
import { Create_User } from '../../../contracts/users/create_user';
import { firstValueFrom, Observable } from 'rxjs';
import { Token } from '../../../contracts/token/token';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../ui/custom-toastr.service';
import { TokenResponse } from '../../../contracts/token/tokenResponse';
import { SocialUser } from '@abacritt/angularx-social-login';
import { List_User } from '../../../contracts/users/list_user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClientService : HttpClientService, private toastrService : CustomToastrService) { }

  async create(user : User): Promise<Create_User> {
    const observable : Observable<Create_User | User > = this.httpClientService.post<Create_User | User >({
      controller:"users",

    }, user);

    return await firstValueFrom(observable) as Create_User; 
  }

  async getAllUsers(page: number = 0, size: number = 5, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void): Promise<{ totalUsersCount: number; users: List_User[] }> {
    const observable: Observable<{ totalUsersCount: number; users: List_User[] }> = this.httpClientService.get({
      controller: "users",
      queryString: `page=${page}&size=${size}`
    });

    const promiseData = firstValueFrom(observable);
    promiseData.then(value => successCallBack())
      .catch(error => errorCallBack(error));

    return await promiseData;
  }
  async assignRoleToUser(id: string, roles: string[], successCallBack?: () => void, errorCallBack?: (error) => void) {
    const observable: Observable<any> = this.httpClientService.post({
      controller: "users",
      action: "assign-role-to-user"
    }, {
      userId: id,
      roles: roles
    });

    const promiseData = firstValueFrom(observable);
    promiseData.then(() => successCallBack())
      .catch(error => errorCallBack(error));

    await promiseData;
  }

  async getRolesToUser(userId: string, successCallBack?: () => void, errorCallBack?: (error) => void): Promise<string[]> {
    const observable: Observable<{ userRoles: string[] }> = this.httpClientService.get({
      controller: "users",
      action: "get-roles-to-user"
    }, userId);

    const promiseData = firstValueFrom(observable);
    promiseData.then(() => successCallBack())
      .catch(error => errorCallBack(error));

    return (await promiseData).userRoles;
  }

   /* async login(usernameOrEmail : string, password : string, callBackFunction? : () => void) : Promise<any> {
    const observable: Observable<any | TokenResponse> = this.httpClientService.post<any | TokenResponse>({
      controller:"users",
      action:"login"
    }, {usernameOrEmail, password})

    const tokenResponse : TokenResponse = await firstValueFrom(observable) as TokenResponse;
    if(tokenResponse) {
      localStorage.setItem("accessToken", tokenResponse.token.accessToken)
      localStorage.setItem("expiration", tokenResponse.token.expiration.toString())

      this.toastrService.message("Kullanıcı Girişi Başarıyla Sağlanmıştır.", "Giriş Başarılı", {
        messageType : ToastrMessageType.Success,
        position : ToastrPosition.TopRight
      })
    }
      
    callBackFunction();
  }

  async googleLogin(user : SocialUser, callBackFunction?:() => void) {

    const observable : Observable<SocialUser | TokenResponse> = this.httpClientService.post<SocialUser | TokenResponse>({
      action:"google-login",
      controller:"users"
    }, user)

    const tokenResponse : TokenResponse = await firstValueFrom(observable) as TokenResponse;

    if(tokenResponse) 
      localStorage.setItem("accessToken",tokenResponse.token.accessToken);
      this.toastrService.message("Google İle Giriş Başarıyla Sağlandı","Giriş Başarılı", {
      messageType: ToastrMessageType.Success,
      position : ToastrPosition.TopRight
    })
    

    callBackFunction();
  } */
}
