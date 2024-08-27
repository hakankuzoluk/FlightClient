import { Component, Input, OnInit } from '@angular/core';
import { List_Reservation } from '../../../contracts/reservation/list_reservation';
import { ReservationService } from '../../../services/common/models/reservation.service';
import { UserAuthService } from '../../../services/common/models/user-auth.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../../services/ui/custom-toastr.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from '../../../base/base.component';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrl: './reservation-list.component.scss',
})
export class ReservationListComponent implements OnInit {
  resUser = this.user.getUser();
  constructor(
    private reservationService: ReservationService,
    private user: UserAuthService,
    private toastrService : CustomToastrService,
    private spinner : NgxSpinnerService
  ) {}
  ngOnInit() {
    this.loadReservations();
  }

  reservationUser: List_Reservation[] = [];

  async loadReservations() {
    try {
      this.reservationUser = await this.reservationService.get();
      console.log('resuser', this.resUser);
      console.log('reservations', this.reservationUser);
    } catch (error) {
      console.error('Veriler yüklenirken hata oluştu:', error);
    }
  }
  async removeReservation(reservationId: number) {

    this.spinner.show(SpinnerType.SquareJellyBox);

    const result = await this.reservationService.remove(reservationId);
    if(result?.isSuccess){
      this.toastrService.message("Bilet İptal İşlemi Başarılı","Bilet İptali", {
        messageType : ToastrMessageType.Info,
        position : ToastrPosition.TopRight
      })
      this.spinner.hide(SpinnerType.SquareJellyBox);
      this.loadReservations();
    }
    else{
      this.toastrService.message("Bilet İptal İşlemi Başarılı","Bilet İptali", {
        messageType : ToastrMessageType.Error,
        position : ToastrPosition.TopRight
      })
      this.spinner.hide(SpinnerType.SquareJellyBox);
    }
    // $('.' + reservationId).fadeOut(1000, () => {
    //   console.log('test');
    //   this.spinner.hide(SpinnerType.SquareJellyBox);
    // });
  }
}
