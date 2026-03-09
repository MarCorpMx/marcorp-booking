import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import { OrganizationService } from '../services/organization.service';
import { catchError, map, of } from 'rxjs';

export const organizationGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {

  const organizationService = inject(OrganizationService);

  const slug = route.paramMap.get('slug');

  if (!slug) {
    return false;
  }

  return organizationService.loadOrganization(slug).pipe(
    map(() => true),
    catchError(() => of(false))
  );
  
};