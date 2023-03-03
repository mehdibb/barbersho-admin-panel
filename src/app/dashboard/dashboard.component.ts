import { Component, OnInit } from '@angular/core';
import { Booking, ServerBooking } from '../common/models/booking';
import { HttpService } from './http.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  showFiller = false;
  bookings?: Booking[];

  constructor(private httpService: HttpService) {}

  async ngOnInit(): Promise<void> {
    this.getBookings();
  }

  private getBookings(): void {
    this.httpService.fetchBookings()?.subscribe((data) => {
      const result = this.transformBookings(data.bookings);

      this.bookings = result
    });
  }

  async rejectBooking(booking: Booking): Promise<void> {
    await this.httpService.rejectBooking(booking);
    this.getBookings()
  }
  async confirmBooking(booking: Booking) {
    await this.httpService.confirmBooking(booking);
    this.getBookings()
  }

  private transformBookings(bookings: ServerBooking[]): Booking[] {
    return bookings.map((serverBooking) => ({
      ...serverBooking,
      bookedTime: new Date(serverBooking.bookedTime)
    }))
  }
}

