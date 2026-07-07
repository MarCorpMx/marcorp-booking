import { computed, Injectable, signal } from '@angular/core';

import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { BookingLoader } from '../../booking/pages/booking-page/enums/booking-loaders.enum';

@Injectable({
  providedIn: 'root'
})

export class BookingLoadingService {

  private states = signal(new Set<BookingLoader>());

  start(key: BookingLoader): void {

    this.states.update(current => {
      const next = new Set(current);
      next.add(key);
      return next;
    });

  }

  stop(key: BookingLoader): void {

    this.states.update(current => {
      const next = new Set(current);
      next.delete(key);
      return next;
    });

  }

  isLoading(key: BookingLoader): boolean {

    return this.states().has(key);

  }

  clear(): void {
    this.states.set(new Set());
  }

  readonly isAnythingLoading = computed(() =>
    this.states().size > 0
  );

  wrap<T>(
    key: BookingLoader,
    observable: Observable<T>
  ): Observable<T> {

    this.start(key);

    return observable.pipe(

      finalize(() => {

        this.stop(key);

      })
    );
  }

}