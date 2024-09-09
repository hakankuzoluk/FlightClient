import { Component, OnInit } from '@angular/core';
import { CustomToastrService, ToastrMessageType, ToastrOptions, ToastrPosition } from './services/ui/custom-toastr.service';
import { ToastrService } from 'ngx-toastr';
import { MessageType, Position } from './services/admin/alertify.service';
import { AuthService } from './services/common/auth.service';
import { Router } from '@angular/router';
import { HttpClientService } from './services/common/http-client.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'FlightAppClient';
  hasRole$ =  this.authService.hasAnyRole(); // Eksik olan `hasRole` özelliğini tanımlıyoruz
  isAuthenticated: boolean = false; // Kullanıcının oturum açıp açmadığını kontrol eden özellik

  constructor(public authService: AuthService, private toastrService : CustomToastrService, private router : Router, private httpClientService : HttpClientService) {
    authService.idendityCheck();
  }



  ngOnInit(): void {
    // this.authService.hasAnyRole().subscribe(hasRole => {
    //   this.hasRole = hasRole;
    // });
  }



  signOut() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user_info");
    localStorage.removeItem("refreshToken");
    this.authService.idendityCheck();
    this.router.navigate([""])
    this.toastrService.message("Oturum Kapatılmıştır.", "Çıkış Yapıldı", {
      messageType : ToastrMessageType.Warning,
      position : ToastrPosition.TopRight
    })
  }
}

