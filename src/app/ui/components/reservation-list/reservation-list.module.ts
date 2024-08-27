import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReservationListComponent } from './reservation-list.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path :"", component:ReservationListComponent
    }])
  ]
})
export class ReservationListModule { }
