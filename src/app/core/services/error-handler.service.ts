import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';

import { NotificationService } from './notification.service';
import { BookingContextService } from './booking-context.service';

@Injectable({
  providedIn: 'root',
})

export class ErrorHandlerService {

  private notify = inject(NotificationService);
  private bookingContext = inject(BookingContextService);
  private router = inject(Router);

  handle(err: any, fallbackMessage = 'Ha ocurrido un error'): void {

    //console.error(err);

    /*
    |--------------------------------------------------------------------------
    | 404
    |--------------------------------------------------------------------------
    */

    if (err?.status === 404) {
      this.bookingContext.clear();
      this.router.navigate(['status/not-found']);
      return;
    }

    /*
    |--------------------------------------------------------------------------
    | Laravel validation
    |--------------------------------------------------------------------------
    */

    if (err?.error?.errors) {
      const firstError = Object.values(
        err.error.errors
      )[0] as string[];

      this.notify.error(firstError[0]);
      return;
    }

    /*
    |--------------------------------------------------------------------------
    | Message backend
    |--------------------------------------------------------------------------
    */

    if (err?.error?.message) {
      this.notify.error(err.error.message);
      return;
    }

    /*
    |--------------------------------------------------------------------------
    | Fallback
    |--------------------------------------------------------------------------
    */

    this.notify.error(fallbackMessage);
  }

}
