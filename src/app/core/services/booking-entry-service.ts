import { Injectable, inject } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class BookingEntryService {

  private api = inject(ApiService);

  getOrganizationEntry(organizationSlug: string): Observable<any> {
    return this.api.get<any>(
      `v1/public-booking/${organizationSlug}`
    );
  }

}
