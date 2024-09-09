import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Create_Flights } from '../../../contracts/create_flight';
import { HttpErrorResponse } from '@angular/common/http';
import { List_Flight } from '../../../contracts/list_flight';
import { firstValueFrom, Observable } from 'rxjs';
import { List_Flight_V2 } from '../../../contracts/list_flight_v2';
import { List_Flight_User } from '../../../contracts/list_flight_user';

@Injectable({
  providedIn: 'root'
})
export class FlightsService {

  constructor(private httpClientService: HttpClientService) { }

  create(flight: Create_Flights, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void) {
    this.httpClientService.post(
      { controller: "flights" },
      flight
    ).subscribe(result => {
      if (successCallBack) {
        successCallBack();
      }
    }, (errorResponse: HttpErrorResponse) => {
      const _error: Array<{ key: string, value: Array<string> }> = errorResponse.error; 

      let message = "";

      _error.forEach((v) => {
        v.value.forEach((_v) => {
          message += `${_v}<br>`;   //Tekrar incele karışık kod
        })
      });
        errorCallBack(message);
    });
  }

  async read(page : number = 0, size : number =5,successCallBack?: () => void, errorCallBack?: (errorMessage : string) => void) : Promise<{totalFlightCount : number, flights :List_Flight[]}> { //Tekrar incele anlamadım.
     const promiseData : Promise<{totalFlightCount : number, flights :List_Flight[]}> = this.httpClientService.get<{totalFlightCount : number, flights :List_Flight[]}>({
      controller:"flights",
      queryString:`page=${page}&size=${size}`
    }).toPromise();

    promiseData.then(d => successCallBack())
      .catch((errorResponse : HttpErrorResponse) => errorCallBack(errorResponse.message))
    return await promiseData;

  }

  async delete(id : string) {
    const deleteObservable: Observable<any> = this.httpClientService.delete<any> ({
      controller:"flights"
    }, id)

    await firstValueFrom(deleteObservable)
  }

  getFlightById(flightId: string): Observable<List_Flight> {
    return this.httpClientService.get<List_Flight>({
      controller: "flights",
      action: flightId
    });
  }

  async read2(page : number = 0, size : number =5,successCallBack?: () => void, errorCallBack?: (errorMessage : string) => void) : Promise<{totalFlightCountUser : number, flightsUser :List_Flight_User[]}> { //Tekrar incele anlamadım.
    const promiseData : Promise<{totalFlightCountUser : number, flightsUser :List_Flight_User[]}> = this.httpClientService.get<{totalFlightCountUser : number, flightsUser :List_Flight_User[]}>({
     controller:"flights",
     action:"User",
     queryString:`page=${page}&size=${size}`
   }).toPromise();

   promiseData.then(d => successCallBack())
     .catch((errorResponse : HttpErrorResponse) => errorCallBack(errorResponse.message))
   return await promiseData;

 }
 async readAll(successCallBack?: () => void, errorCallBack?: (errorMessage : string) => void) : Promise<{flightsAll :List_Flight_V2[]}> { //Tekrar incele anlamadım.
  const promiseData : Promise<{flightsAll :List_Flight_V2[]}> = this.httpClientService.get<{flightsAll :List_Flight_V2[]}>({
   controller:"flights",
   action:"All"
 }).toPromise();

 promiseData.then(d => successCallBack())
   .catch((errorResponse : HttpErrorResponse) => errorCallBack(errorResponse.message))
 return await promiseData;

}

  
}
