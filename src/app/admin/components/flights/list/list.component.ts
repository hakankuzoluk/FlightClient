import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { List_Flight } from '../../../../contracts/list_flight';
import { FlightsService } from '../../../../services/common/models/flights.service';
import { BaseComponent, SpinnerType } from '../../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertifyService, MessageType, Position } from '../../../../services/admin/alertify.service';
import { _MatInternalFormField } from '@angular/material/core';
import { MatPaginator } from '@angular/material/paginator';
import { DatePipe } from '@angular/common';
import { List_Flight_User } from '../../../../contracts/list_flight_user';

declare var $ : any;

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [DatePipe] 
})
export class ListComponent extends BaseComponent implements OnInit {
  formattedDateTime: string;
  constructor(private flightService: FlightsService, spinner : NgxSpinnerService, private alertify : AlertifyService,private datePipe: DatePipe) {
    super(spinner);
  }

  displayedColumns: string[] = ['departure', 'destination', 'date', 'price', 'capacity',  'delete', 'update'];
  dataSource : MatTableDataSource<List_Flight_User> = null
  @ViewChild(MatPaginator) paginator: MatPaginator;
  async getFlights() {
    this.showSpinner(SpinnerType.SquareJellyBox)
    const allFlights : {totalFlightCountUser : number, flightsUser :List_Flight_User[]} = await this.flightService.read2(this.paginator ? this.paginator.pageIndex : 0,this.paginator ? this.paginator.pageSize : 5, () =>this.hideSpinner(SpinnerType.SquareJellyBox), errorMessage => this.alertify.message(errorMessage,{
      dismissOther:true,
      messageType: MessageType.Error,
      position: Position.TopRight
    }));
    
    console.log(allFlights)
    this.dataSource = new MatTableDataSource<List_Flight_User>(allFlights.flightsUser);
    this.paginator.length = allFlights.totalFlightCountUser;
  }

  async pageChanged() {
    await this.getFlights();

  }


  async ngOnInit() {
    const now = new Date();
    this.formattedDateTime = this.datePipe.transform(now, 'yyyy-MM-dd - HH:mm');
    await this.getFlights();
    this.dataSource.data.forEach(flight => {
      console.log(flight.date); // Bu değer Date nesnesi olmalı
    });
  }

}

