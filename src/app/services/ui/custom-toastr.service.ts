import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CustomToastrService {

  constructor(private toastr : ToastrService) { }

  message(message: string, title: string, toastrOptions:Partial<ToastrOptions>) {
    this.toastr[toastrOptions.messageType](message,title, {
      positionClass : toastrOptions.position,
      timeOut: toastrOptions.timeOut || 3000,
      progressBar: true,  // İlerleme çubuğu ekle
      closeButton: true
    });
  }
}

export class ToastrOptions{
  messageType: ToastrMessageType;
  position : ToastrPosition;
  timeOut: number;
   
}

export enum  ToastrMessageType {
  Success ="success",
  Info="info",
  Warning="warning",
  Error="error"

}

export enum ToastrPosition {
  TopRight ="toast-top-right",
  BottomRight="toast-bottom-right",
  TopLeft="toast-top-left",
  BottomLeft="toast-bottom-left",
  TopCenter="toast-top-center",
  BottomCenter="toast-bottom-center",
  TopFullWidth="toast-top-full-width",
  BottomFullWidth="toast-bottom-full-width"
}