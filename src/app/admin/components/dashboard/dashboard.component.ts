import { Component, OnInit } from '@angular/core';
import { AlertifyService, MessageType, Position } from '../../../services/admin/alertify.service';
import { BaseComponent, SpinnerType } from '../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { SignalrService } from '../../../services/common/signalr.service';
import { ReceiveFunctions } from '../../../constants/receive-functions';
import { HubUrls } from '../../../constants/hub-urls';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent extends BaseComponent implements OnInit {
  constructor(private alertify : AlertifyService, spinner: NgxSpinnerService, private signalRService : SignalrService) 
  {
    super(spinner)
    signalRService.start(HubUrls.FlightHub)
  }
  
  ngOnInit(): void {
    this.signalRService.on(ReceiveFunctions.FlightAddedMessageReceiveFunction ,message => {
      this.alertify.message(message, {
        messageType : MessageType.Notify,
        position : Position.TopRight
      })
    })
  }
  
  d() {
    this.alertify.message("Merhaba", {messageType:MessageType.Success,position:Position.TopCenter});
  }

  b() {
    this.alertify.dismiss();
  }

}
