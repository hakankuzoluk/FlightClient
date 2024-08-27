import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { List_Flight } from '../../../../contracts/list_flight';
import { FlightsService } from '../../../../services/common/models/flights.service';
import { BaseComponent, SpinnerType } from '../../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertifyService, MessageType, Position } from '../../../../services/admin/alertify.service';
import { _MatInternalFormField } from '@angular/material/core';
import { MatPaginator } from '@angular/material/paginator';

declare var $ : any;

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseComponent implements OnInit {
  
  constructor(private flightService: FlightsService, spinner : NgxSpinnerService, private alertify : AlertifyService) {
    super(spinner);
  }

  displayedColumns: string[] = ['departure', 'destination', 'date', 'price', 'capacity',  'delete', 'update'];
  dataSource : MatTableDataSource<List_Flight> = null
  @ViewChild(MatPaginator) paginator: MatPaginator;
  async getFlights() {
    this.showSpinner(SpinnerType.SquareJellyBox)
    const allFlights : {totalFlightCount : number, flights :List_Flight[]} = await this.flightService.read(this.paginator ? this.paginator.pageIndex : 0,this.paginator ? this.paginator.pageSize : 5, () =>this.hideSpinner(SpinnerType.SquareJellyBox), errorMessage => this.alertify.message(errorMessage,{
      dismissOther:true,
      messageType: MessageType.Error,
      position: Position.TopRight
    }));
    
    console.log(allFlights)
    this.dataSource = new MatTableDataSource<List_Flight>(allFlights.flights);
    this.paginator.length = allFlights.totalFlightCount;
  }

  async pageChanged() {
    await this.getFlights();

  }


  async ngOnInit() {
    await this.getFlights();
  }

}

