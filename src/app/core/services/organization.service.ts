import { Injectable } from '@angular/core';
import { tap, shareReplay, of } from 'rxjs';

import { ApiService } from '../../core/services/api.service';
import { OrganizationModel } from '../models/organization.model';

@Injectable({
  providedIn: 'root'
})

export class OrganizationService {

  private organization?: OrganizationModel;

  constructor(private api: ApiService) {}

  loadOrganization(slug: string) {

    if (this.organization) {
      return of(this.organization);
    }

    return this.api
      .get<OrganizationModel>(`v1/public/${slug}`)
      .pipe(
        tap((org) => {
          this.organization = org;
          this.applyBranding(org);
        }),
        shareReplay(1)
      );
  }

  getOrganization() {
    return this.organization;
  }

  private applyBranding(org: OrganizationModel) {

    if (org.primary_color) {
      document.documentElement.style.setProperty(
        '--brand-primary',
        org.primary_color
      );
    }

    if (org.secondary_color) {
      document.documentElement.style.setProperty(
        '--brand-secondary',
        org.secondary_color
      );
    }

  }

}