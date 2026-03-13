import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})

export class BookingService {
  constructor(private api: ApiService) { }

  // Obtiene los servicios de las organizaciones
  getServices(slug: string) {
    return this.api.get(`v1/public/${slug}/services`);
  }

  // Disponibilidad de horarios
  getAvailability(
    slug: string,
    serviceVariantId: number,
    date: string
  ) {
    return this.api.get(`v1/public/${slug}/availability`, {
      params: {
        service_variant_id: serviceVariantId,
        date: date
      }
    });
  }

  // Disponibilidad de agenda - varios días
  getAvailabilityRange(
    slug: string,
    serviceVariantId: number,
    startDate: string,
    days: number = 9
  ) {
    return this.api.get(`v1/public/${slug}/availability-range`, {
      params: {
        service_variant_id: serviceVariantId,
        start_date: startDate,
        days: days
      }
    });
  }

  // Crear cita
  createAppointment(slug: string, payload: any) {
    return this.api.post(`v1/public/${slug}/appointments`, payload);
  }

}
