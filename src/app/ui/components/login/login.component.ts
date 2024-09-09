import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/common/models/user.service';
import { BaseComponent, SpinnerType } from '../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../../../services/common/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { HttpClientService } from '../../../services/common/http-client.service';
import { UserAuthService } from '../../../services/common/models/user-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent extends BaseComponent implements OnInit {
  
  constructor(private userAuthService : UserAuthService, spinner : NgxSpinnerService, private authService : AuthService, private activatedRoute : ActivatedRoute,
     private router: Router, private socialAuthService : SocialAuthService, private httpClientService : HttpClientService) 
  {
     super(spinner);
      socialAuthService.authState.subscribe(async (user : SocialUser) => {
      console.log(user);
      this.showSpinner(SpinnerType.SquareJellyBox)
      await userAuthService.googleLogin(user, () => {
        authService.idendityCheck()
        this.hideSpinner(SpinnerType.SquareJellyBox)
      })
     });
  }
  
  ngOnInit(): void {
  }

  async login(usernameOrEmail: string,password : string) {
    this.showSpinner(SpinnerType.SquareLoader)
    await this.userAuthService.login(usernameOrEmail,password, () =>{
       
        this.authService.idendityCheck();


        this.activatedRoute.queryParams.subscribe(params => {
          const returnUrl : string = params["returnUrl"];
          if(returnUrl)
            this.router.navigate([returnUrl])
          else
            this.router.navigate([""])
        })
        this.hideSpinner(SpinnerType.SquareLoader)
      })
  }

}
