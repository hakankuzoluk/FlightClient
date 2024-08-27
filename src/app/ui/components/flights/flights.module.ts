import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlightsComponent } from './flights.component';
import { RouterModule } from '@angular/router';
import path from 'path';
import {MatTabsModule} from '@angular/material/tabs';
import {MatListModule} from '@angular/material/list';
import { ListComponent } from './list/list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReservationsModule } from '../reservations/reservations.module';




@NgModule({
  declarations: [
    FlightsComponent,
    ListComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path:"", component:FlightsComponent}
    ]),
    MatTabsModule,
    MatListModule,
    FormsModule,
    ReactiveFormsModule,
    ReservationsModule,
    

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class FlightsModule { }
