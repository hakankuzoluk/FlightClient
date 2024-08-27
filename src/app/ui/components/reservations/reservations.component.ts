import { Component, Input, OnInit } from '@angular/core';
import { List_Flight } from '../../../contracts/list_flight';
import { ReservationService } from '../../../services/common/models/reservation.service';
import { Create_Reservation } from '../../../contracts/reservation/create_reservation';
import { List_Reservation } from '../../../contracts/reservation/list_reservation';
import { BaseComponent, SpinnerType } from '../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../../services/ui/custom-toastr.service';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrl: './reservations.component.scss'
})
export class ReservationsComponent extends BaseComponent implements OnInit {
  @Input() flight: List_Flight;  // @Input ile flight özelliğini al
  



  constructor(private reservationService : ReservationService,  spinner : NgxSpinnerService, private toastrService : CustomToastrService) {
    super(spinner)
  }
  
  
  reservations : List_Reservation[];
  
  async ngOnInit() {
    console.log(this.flight);
    // this.showSpinner(SpinnerType.SquareJellyBox)
    // this.reservations = await this.reservationService.get()
    // this.hideSpinner(SpinnerType.SquareJellyBox)
  }
  async addToReservation(flight: List_Flight) {
    this.showSpinner(SpinnerType.SquareJellyBox);
    let _reservation: Create_Reservation = new Create_Reservation();
    _reservation.flightId = flight.id;
    _reservation.quantity = 1;
    await this.reservationService.add(_reservation);
    this.hideSpinner(SpinnerType.SquareJellyBox);
    this.toastrService.message(
      'Rezervasyon Yapılmıştır.',
      'Bilet Alımı Başarılı',
      {
        messageType: ToastrMessageType.Success,
        position: ToastrPosition.TopRight,
      }
    );
  } 




}
