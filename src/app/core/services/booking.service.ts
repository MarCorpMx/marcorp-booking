import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})

export class BookingService {
  constructor(private api: ApiService) {}

  getServices(slug: string) {
    return this.api.get(`v1/public/${slug}/services`);
  }
}
