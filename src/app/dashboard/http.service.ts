import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Booking, ServerBooking } from '../common/models/booking';

const BASE_URL = 'https://shikabarber.ir/api';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private httpService: HttpClient) {}

  async confirmBooking(booking: Booking): Promise<void> {
    this.httpService
      .get(`${BASE_URL}/reserve/confirm?id=${booking.id}`)
      .subscribe(() => {
        this.fetchBookings();
      });
  }

  async rejectBooking(booking: Booking): Promise<void> {
    this.httpService
      .get(`${BASE_URL}/reserve/reject?id=${booking.id}`)
      .subscribe(() => {
        this.fetchBookings();
      });
  }

  fetchBookings(): Observable<{bookings: ServerBooking[]}> | undefined {
    try {
      return this.httpService
        .get<{ bookings: ServerBooking[] }>(`${BASE_URL}/bookings`)

    } catch (error) {
      console.error(error);
      return;
    }
  }
}
