import { Component, OnInit } from '@angular/core';
import { BaseComponent, SpinnerType } from '../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrl: './reservations.component.scss'
})
export class ReservationsComponent extends BaseComponent implements OnInit {
  
  constructor(spinner: NgxSpinnerService) {super(spinner)}
  
  ngOnInit(): void {
    this.showSpinner(SpinnerType.SquareSpin)
  }

}
