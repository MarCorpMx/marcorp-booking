import { Routes } from '@angular/router';
import { BookingPage } from './booking/pages/booking-page/booking-page';
import { organizationGuard } from './core/guards/organization-guard';

export const routes: Routes = [

  {
    path: ':slug',
    canActivate: [organizationGuard],
    loadComponent: () => import('./booking/pages/booking-page/booking-page')
      .then(m => m.BookingPage)
  }

];
