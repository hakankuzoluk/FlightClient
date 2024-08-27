import { Token } from "./token";

export class TokenResponse {
    token : Token;

}

export class LoginResponse extends TokenResponse
{
    nameSurname:string; 
}

export interface IUserInfo
{
nameSurname:string; 

}