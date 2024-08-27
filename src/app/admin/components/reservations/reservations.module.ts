import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationsComponent } from './reservations.component';
import { RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';



@NgModule({
  declarations: [
    ReservationsComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path:"", component:ReservationsComponent}
    ])
  ]
})
export class ReservationsModule { }
