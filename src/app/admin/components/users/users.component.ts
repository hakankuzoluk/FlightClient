import { Component, OnInit } from '@angular/core';
import { BaseComponent, SpinnerType } from '../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpClientService } from '../../../services/common/http-client.service';
import { User } from '../../../contracts/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent extends BaseComponent implements OnInit {
  
  constructor(spinner: NgxSpinnerService, private httpClientService : HttpClientService) {
    super(spinner);
  }
  
  
  
  ngOnInit(): void {
    this.showSpinner(SpinnerType.SquareSpin)



    this.httpClientService.get<User>({
      controller:"users"
    }).subscribe(data => console.log(data.userName));

    //this.httpClientService.post({
    //  controller: "users"},
    //  {
    //    UserName: "Deneme1",
    //    Password: "DenemePass",
    //    Role:"User"
    //  }
    //).subscribe();

    /*this.httpClientService.put({controller:"users"},{
      id : "1",
      UserName:"Update1",
      Password:"Update"

    }).subscribe(); */

    /*this.httpClientService.delete({controller:"users"},
      "13"
    ).subscribe();*/


  }
 

}
