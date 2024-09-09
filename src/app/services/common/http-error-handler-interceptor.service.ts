import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { error } from 'console';
import { catchError, Observable, of } from 'rxjs';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../ui/custom-toastr.service';
import { UserAuthService } from './models/user-auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorHandlerInterceptorService implements HttpInterceptor {

  constructor(private toastrService : CustomToastrService, private userAuthService : UserAuthService, private router : Router) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError(error => {
      switch (error.status){

        case HttpStatusCode.Unauthorized:

          this.userAuthService.refreshTokenLogin(localStorage.getItem("refreshToken"), (state) => {
            if(!state){
              const url = this.router.url;
              if(url =="/flights"){
                  this.toastrService.message("Bilet almak için giriş yapmanız gerekmektedir", "Giriş Yap", {
                    messageType: ToastrMessageType.Warning,
                    position: ToastrPosition.TopLeft
                }) 
              }else {
                  this.toastrService.message("Bu İşlemi Yapmaya Yetkiniz Bulunmamaktadır", "Yetkisiz İşlem", {
                    messageType: ToastrMessageType.Error,
                    position: ToastrPosition.TopLeft
                })
              }
            }

          }).then(data => {
            this.toastrService.message("Bu İşlemi Yapmaya Yetkiniz Bulunmamaktadır", "Yetkisiz İşlem", {
              messageType: ToastrMessageType.Error,
              position: ToastrPosition.TopLeft
          })
          });
          break

        case HttpStatusCode.InternalServerError:
          this.toastrService.message("Sunucuya Erişelemiyor", "Sunucu Hatası", {
            messageType: ToastrMessageType.Error,
            position: ToastrPosition.TopLeft
          })
          break     
        
        // case HttpStatusCode.BadRequest:
        //     this.toastrService.message("Geçersiz İstek Yapıldı", "Geçersiz İstek", {
        //       messageType: ToastrMessageType.Error,
        //       position: ToastrPosition.TopLeft
        //     })
        //     break  

        case HttpStatusCode.NotFound:
          this.toastrService.message("Sayfaya Erişim Sağlanamıyor", "Sayfa Bulunamadı", {
            messageType: ToastrMessageType.Error,
            position: ToastrPosition.TopLeft
          })
          break 

        default:
          // this.toastrService.message("Beklenmeyen Bir Hata Meydana Gelmiştir", "HATA", {
          //   messageType: ToastrMessageType.Error,
          //   position: ToastrPosition.TopLeft
          // })
          break
      }
      
      return of(error);
    }))
  }
}
