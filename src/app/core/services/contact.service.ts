import { Injectable, inject } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class ContactService {
  private api = inject(ApiService);

  sendMessage(payload: any): Observable<any> {
    return this.api.post<any>('v1/contact-messages', payload);
  }


}
