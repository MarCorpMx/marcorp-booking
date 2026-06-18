import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import { OrganizationService } from '../services/organization.service';
import { catchError, map, of } from 'rxjs';

export const organizationGuard: CanActivateFn = (route) => {

  const organizationService = inject(OrganizationService);

  const organizationSlug =
    route.paramMap.get('organizationSlug');

  if (!organizationSlug) {
    return false;
  }

  return organizationService
    .loadOrganization(organizationSlug)
    .pipe(
      map(() => true),
      catchError(() => of(false))
    );
};