import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

export interface CreateAppointmentResponse {
  message: string;
  data: any; // luego puedes tiparlo mejor si quieres
  debug_urls?: {
    confirm: string;
    cancel: string;
  };
}

export interface AppointmentActionResponse {
  status:
  | 'confirmed'
  | 'cancelled'
  | 'expired'
  | 'already_used'
  | 'already_confirmed'
  | 'already_cancelled'
  | 'invalid_token';

  message: string;

  appointment?: {
    date: string;
    time: string;
    service: string;
  };
}

@Injectable({
  providedIn: 'root',
})

export class BookingService {
  constructor(private api: ApiService) { }

  // Obtiene los servicios de las organizaciones
  getServices(slug: string) {

    const message = 'getServices ESTA ROTO';
    console.log(message);
    alert(message);

    return this.api.get(`v1/public/${slug}/services`);
  }

  // Disponibilidad de horarios
  getAvailability(
    slug: string,
    serviceVariantId: number,
    date: string
  ) {

    const message = 'getAvailability ESTA ROTO';
    console.log(message);
    alert(message);

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

    const message = 'getAvailabilityRange ESTA ROTO';
    console.log(message);
    alert(message);

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

    const message = 'createAppointment ESTA ROTO';
    console.log(message);
    alert(message);

    return this.api.post<CreateAppointmentResponse>(`v1/public/${slug}/appointments`, payload);
  }

  // booking-result (cuando realizan una acción desde email)
  processAppointmentAction(token: string) {


    const message = 'processAppointmentAction ESTA ROTO';
    console.log(message);
    alert(message);

    return this.api.post<AppointmentActionResponse>(
      `v1/public/appointment-actions/${token}`,
      {}
    );
  }

  // OBTENER CITA POR REFERENCE
  getByReference(referenceCode: string) {

    const message = 'getByReference ESTA ROTO';
    console.log(message);
    alert(message);

    return this.api.get(`v1/public/appointments/manage/${referenceCode}`);
  }

  

  // REAGENDAR
  rescheduleByReference(
    referenceCode: string,
    payload: {
      date: string;
      time: string;
      reason?: string;
      note?: string;
    }
  ) {


    const message = 'rescheduleByReference ESTA ROTO';
    console.log(message);
    alert(message);

    return this.api.post(
      `v1/public/appointments/manage/${referenceCode}/reschedule`,
      payload
    );
  }


}
