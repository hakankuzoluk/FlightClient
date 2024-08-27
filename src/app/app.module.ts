import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminModule } from './admin/admin.module';
import { UiModule } from './ui/ui.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {ToastrModule} from 'ngx-toastr';
import {NgxSpinnerModule} from 'ngx-spinner';
import { BaseComponent } from './base/base.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { DeleteDirective } from './directives/admin/delete.directive';
import { DeleteDialogComponent } from './dialogs/delete-dialog/delete-dialog.component';
import {JwtModule} from '@auth0/angular-jwt'
import { AuthGuard } from './guards/common/auth.guard';
import { LoginComponent } from './ui/components/login/login.component';
import {GoogleLoginProvider, GoogleSigninButtonModule, SocialAuthServiceConfig, SocialLoginModule} from '@abacritt/angularx-social-login';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpErrorHandlerInterceptorService } from './services/common/http-error-handler-interceptor.service';
import { MatTabsModule } from '@angular/material/tabs';
import { AuthorizeMenuDialogComponent } from './dialogs/authorize-menu-dialog/authorize-menu-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,


  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AdminModule,
    UiModule,
    ToastrModule.forRoot({
      closeButton: true,
      progressBar: true
    }), NgxSpinnerModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem("accessToken"),
        allowedDomains: ["localhost:7221"]
      }
    }),
    SocialLoginModule,
    GoogleSigninButtonModule,
    MatTabsModule,
    
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(), 
    {provide: "baseUrl", useValue:" https://localhost:7221/api", multi:true},
    {
      provide : "SocialAuthServiceConfig",
      useValue : {
        autoLogin : false,
        providers : [
          {
            id : GoogleLoginProvider.PROVIDER_ID,
            provider : new GoogleLoginProvider("382929194512-tio87umjn5785i991fdd63130ahemfkd.apps.googleusercontent.com")
          }
        ],
        onError: err => console.log(err)
      } as SocialAuthServiceConfig
    },
    {provide:HTTP_INTERCEPTORS, useClass:HttpErrorHandlerInterceptorService, multi: true}
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
