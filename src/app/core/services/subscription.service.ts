import { Injectable, inject } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class SubscriptionService {

  private api = inject(ApiService);

  getPlans(subsystem: string): Observable<any> {
    return this.api.get<any>(
      //`v1/public/plans?subsystem=${subsystem}`
      `v1/public-booking/plans?subsystem=${subsystem}`
    );
  }


}
