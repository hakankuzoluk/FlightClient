import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorizeMenuModule } from './authorize-menu/authorize-menu.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { FlightsModule } from './flights/flights.module';
import { ReservationsModule } from './reservations/reservations.module';
import { UsersModule } from './users/users.module';
import { RoleModule } from './role/role.module';




@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    AuthorizeMenuModule,
    DashboardModule,
    FlightsModule,
    ReservationsModule,
    UsersModule,
    RoleModule,
  ]
})
export class ComponentsModule { }
