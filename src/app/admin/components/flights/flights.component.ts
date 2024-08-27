import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from '../../../base/base.component';
import { Create_Flights } from '../../../contracts/create_flight';
import { ListComponent } from './list/list.component';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrl: './flights.component.scss'
})
export class FlightsComponent extends BaseComponent implements OnInit {
  showFiller = false;


  constructor(spinner: NgxSpinnerService) { super(spinner);}
  ngOnInit(): void {
    this.showSpinner(SpinnerType.SquareSpin)
  }
  
  @ViewChild(ListComponent) listComponents :ListComponent
  
  
  createdFlight(createdFlight:Create_Flights) {
    this.listComponents.getFlights()
  }

}
