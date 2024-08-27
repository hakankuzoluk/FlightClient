import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FlightsService } from '../../../../services/common/models/flights.service';
import { Create_Flights } from '../../../../contracts/create_flight';
import { BaseComponent, SpinnerType } from '../../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertifyService, MessageType, Position } from '../../../../services/admin/alertify.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent extends BaseComponent implements OnInit {

  constructor(private flightService: FlightsService, spinner: NgxSpinnerService, private alertify: AlertifyService) {
    super(spinner);
  }

  ngOnInit(): void {
  }

  @Output() createdFlight : EventEmitter<Create_Flights> = new EventEmitter(); 

  create(departure: HTMLInputElement, destination: HTMLInputElement, date: HTMLInputElement, capacity: HTMLInputElement, price: HTMLInputElement) {

    this.showSpinner(SpinnerType.SquareJellyBox);

    const create_flight: Create_Flights = new Create_Flights();

    create_flight.Departure = departure.value;
    create_flight.Destination = destination.value;
    create_flight.Capacity = parseInt(capacity.value);
    create_flight.Date = new Date(date.value);
    create_flight.Price = parseFloat(price.value);

    this.flightService.create(create_flight, () => {
      this.hideSpinner(SpinnerType.SquareJellyBox);
      this.alertify.message("Sefer Başarıyla Eklendi.", {
        dismissOther: true,
        messageType: MessageType.Success,
        position: Position.TopRight
      });
      this.createdFlight.emit(create_flight)
    }, (errorMessage) => {
      this.hideSpinner(SpinnerType.SquareJellyBox);
      this.alertify.message(errorMessage, {
        dismissOther: true,
        messageType: MessageType.Error,
        position: Position.TopRight
      });
    });
  }
}