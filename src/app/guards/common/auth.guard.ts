import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../services/ui/custom-toastr.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from '../../base/base.component';
import { _isAuthenticated } from '../../services/common/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private jwtHelper: JwtHelperService, 
    private router: Router, 
    private toastrService: CustomToastrService, 
    private spinner: NgxSpinnerService,
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.spinner.show(SpinnerType.SquareSpin);

   /*  const token: string = localStorage.getItem("accessToken");
    let expired: boolean;
    console.log(token)
    try {
      const decoded = this.jwtHelper.decodeToken(token);
      expired = this.jwtHelper.isTokenExpired(token);
    } catch(err) {
      expired = true;
    }
 */
    if (!_isAuthenticated) {
      this.router.navigate(["login"], { queryParams: { returnUrl: state.url } });
      this.toastrService.message('Oturum Açma Gerekiyor!', 'Yetkisiz Erişim', {
        messageType: ToastrMessageType.Warning,
        position: ToastrPosition.TopRight
      });
    }

    this.spinner.hide(SpinnerType.SquareSpin);
    return true;
  }
}