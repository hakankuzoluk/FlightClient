import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationsComponent } from './reservations.component';
import { MatTabsModule } from '@angular/material/tabs';



@NgModule({
  declarations: [
    ReservationsComponent
  ],
  imports: [
    CommonModule,
    MatTabsModule
  ],
  exports: [ReservationsComponent]
})
export class ReservationsModule { }
