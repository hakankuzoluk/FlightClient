import { Component, OnInit } from '@angular/core';
import { BaseComponent, SpinnerType } from '../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrl: './flights.component.scss'
})
export class FlightsComponent extends BaseComponent implements OnInit {
  
  constructor(spinner: NgxSpinnerService) {super(spinner)}
  
  
  ngOnInit(): void {
   this.showSpinner(SpinnerType.SquareJellyBox)
  }

}
