import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { firstValueFrom, Observable } from 'rxjs';
import { List_Reservation } from '../../../contracts/reservation/list_reservation';
import { Create_Reservation } from '../../../contracts/reservation/create_reservation';
import { Admin_List_Reservation } from '../../../contracts/reservation/admin_list_reservation';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  constructor(private httpClientService: HttpClientService) {}

  async get(): Promise<List_Reservation[]> {
    const observable: Observable<List_Reservation[]> =
      this.httpClientService.get({
        controller: 'reservations',
      });

    return await firstValueFrom(observable);
  }

  async add(reservation: Create_Reservation): Promise<void> {
    const observable: Observable<any> = this.httpClientService.post(
      {
        controller: 'reservations',
      },
      reservation
    );

    await firstValueFrom(observable);
  }

  async remove(reservationId: number): Promise<{
    isSuccess: boolean;
  }> {
    const observable: Observable<any> = this.httpClientService.delete(
      {
        controller: 'reservations',
      },
      reservationId
    );

    return await firstValueFrom(observable);
  }

  async getAllReservations(): Promise<Admin_List_Reservation[]> {
    const observable: Observable<Admin_List_Reservation[]> =
      this.httpClientService.get({
        action: 'all',
        controller: 'reservations',
        // Eğer endpoint "api/reservations/all" gibi bir yola sahipse
      });

    return await firstValueFrom(observable);
  }
}
