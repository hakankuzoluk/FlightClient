import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlightsModule } from './flights/flights.module';
import { HomeModule } from './home/home.module';
import { RegisterModule } from './register/register.module';
import { ReservationsModule } from '../../admin/components/reservations/reservations.module';
import { ReservationListComponent } from './reservation-list/reservation-list.component';
import { ReservationListModule } from './reservation-list/reservation-list.module';



@NgModule({
  declarations: [
  
    ReservationListComponent
  ],
  imports: [
    CommonModule,
    FlightsModule,
    HomeModule,
    RegisterModule,
    //LoginModule,
    ReservationsModule,
    ReservationListModule
  ],
  exports: [ReservationsModule]
})
export class ComponentsModule { }
