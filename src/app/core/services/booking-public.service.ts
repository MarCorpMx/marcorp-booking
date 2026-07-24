import { Injectable, inject } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { Observable } from 'rxjs';

import { BookingOrganizationEntryResponse, BookingOrganizationBranchResponse } from '../models/booking-entry.models';
import { BookingServicesResponse } from '../models/booking-service.models';
import { BookingAvailability } from '../models/booking-availability.models';

import { CreateBookingRequest, CreateBookingResponse } from '../models/booking-create.models';

@Injectable({
  providedIn: 'root',
})
export class BookingPublicService {

  private api = inject(ApiService);

  // rombi/org
  getOrganizationEntry(
    organizationSlug: string
  ): Observable<BookingOrganizationEntryResponse> {
    return this.api.get<BookingOrganizationEntryResponse>(
      `v1/public-booking/${organizationSlug}`
    );
  }

  // rombi/org/branch
  getBranchBookingEntry(
    organizationSlug: string,
    branchSlug: string
  ): Observable<BookingOrganizationBranchResponse> {

    return this.api.get<BookingOrganizationBranchResponse>(
      `v1/public-booking/${organizationSlug}/${branchSlug}`
    );
  }

  // services list
  getServices(
    organizationSlug: string,
    branchSlug: string
  ) {
    return this.api.get<BookingServicesResponse>(
      `v1/public-booking/${organizationSlug}/${branchSlug}/services`
    );

  }

  // availability
  getAvailability(
    variantId: number,
    staffMemberId?: number
  ): Observable<BookingAvailability> {

    let url =
      `v1/public-booking/variants/${variantId}/availability`;

    if (staffMemberId) {
      url += `?staff=${staffMemberId}`;
    }

    return this.api.get<BookingAvailability>(url);

  }

  getTimeSlots(
    variantId: number,
    date: string,
    staffMemberId?: number
  ) {

    let url =
      `v1/public-booking/variants/${variantId}/timeslots?date=${date}`;

    if (staffMemberId) {
      url += `&staff=${staffMemberId}`;
    }

    //return this.api.get<BookingTimeSlotsResponse>(url);
    return this.api.get<any>(url);

  }

  /*GET
/public-booking/variants/{variant}/timeslots
?date=2026-06-29
&staff=5*/


  // booking creation
  createBooking(
    payload: CreateBookingRequest
  ): Observable<CreateBookingResponse> {

    return this.api.post<CreateBookingResponse>(
      'v1/public-booking/bookings',
      payload
    );

  }

  /*
|--------------------------------------------------------------------------
| Customer validation (Future)
|--------------------------------------------------------------------------
|
| Este endpoint NO es requerido para el flujo inicial de reservas.
| El endpoint de creación de citas ya es responsable de:
|
| - Buscar clientes existentes.
| - Crear el cliente si no existe.
| - Evitar duplicados.
|
| En una segunda etapa este endpoint permitirá mejorar la experiencia
| del usuario antes de confirmar la cita.
|
| Casos de uso:
|
| ✔ Detectar si el cliente ya existe mediante su correo electrónico.
| ✔ Autocompletar nombre, teléfono y demás información.
| ✔ Recuperar información específica del negocio
|   (por ejemplo mascotas, pacientes, vehículos, etc.).
| ✔ Mostrar mensajes como:
|      "¡Bienvenido de nuevo Omar!"
| ✔ Reducir el tiempo necesario para reservar una nueva cita.
|
| Ejemplo:
|
| POST /v1/public-booking/customers/validate
|
| Request:
| {
|   "email": "omar@mail.com"
| }
|
| Response:
| {
|   "exists": true,
|   "customer_id": 15,
|   "customer": { ... }
| }
|
*/
  validateCustomer(
    email: string
  ) {

    return this.api.post(
      'v1/public-booking/customers/validate',
      {
        email
      }
    );

  }

  // cancel -> falta saber si esta correcto
  cancelBooking(
    referenceCode: string
  ) {

    return this.api.post(
      `v1/public-booking/bookings/${referenceCode}/cancel`,
      {}
    );

  }

  // reschedule -> falta saber si esta correcto
  rescheduleBooking(
    referenceCode: string,
    payload: any
  ) {

    return this.api.post(
      `v1/public-booking/bookings/${referenceCode}/reschedule`,
      payload
    );

  }

}
