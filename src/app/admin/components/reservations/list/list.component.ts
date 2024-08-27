import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../../../../services/common/models/reservation.service';
import { Admin_List_Reservation } from '../../../../contracts/reservation/admin_list_reservation';
import { BaseComponent, SpinnerType } from '../../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertifyService, MessageType } from '../../../../services/admin/alertify.service';
declare var $: any;

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  constructor(
    private reservationService: ReservationService,
    private spinner: NgxSpinnerService,
    private alertService: AlertifyService
  ) {}

  ngOnInit(): void {
    this.loadReservations();
  }

  reservations: Admin_List_Reservation[] = []; // Listeleme için veri

  async loadReservations() {
    try {
      this.reservations = await this.reservationService.getAllReservations();
      console.log('reservations', this.reservations);
    } catch (error) {
      console.error('Veriler yüklenirken hata oluştu:', error);
    }
  }

  async removeReservation(reservationId: number) {

    this.spinner.show(SpinnerType.SquareJellyBox);

    const result = await this.reservationService.remove(reservationId);
    if(result?.isSuccess){
      this.alertService.message("İşlem başarılı", {
        messageType: MessageType.Success
      });
      this.spinner.hide(SpinnerType.SquareJellyBox);
      this.loadReservations();
    }
    else{
      this.alertService.message("İşlem hatalı", {
        messageType: MessageType.Error
      });
      this.spinner.hide(SpinnerType.SquareJellyBox);
    }
    // $('.' + reservationId).fadeOut(1000, () => {
    //   console.log('test');
    //   this.spinner.hide(SpinnerType.SquareJellyBox);
    // });
  }
}
