import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlightsModule } from './components/flights/flights.module';
import { HomeModule } from './components/home/home.module';
import { ComponentsModule } from './components/components.module';




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FlightsModule,
    HomeModule,
    ComponentsModule
  ]
})
export class UiModule { }
