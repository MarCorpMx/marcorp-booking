import { Routes } from '@angular/router';

import { Home } from './booking/pages/home/home';

import { Terms } from './booking/pages/legal/terms/terms';
import { Privacy } from './booking/pages/legal/privacy/privacy';
import { Cookies } from './booking/pages/legal/cookies/cookies';
import { Cancellations } from './booking/pages/legal/cancellations/cancellations';
import { Disclaimer } from './booking/pages/legal/disclaimer/disclaimer';

import { BookingStatusPage } from './booking/pages/booking-status-page/booking-status-page';

import { BookingResult } from './booking/pages/booking-result/booking-result';
import { BookingManage } from './booking/pages/booking-manage/booking-manage';
import { BookingPage } from './booking/pages/booking-page/booking-page';
import { OrganizationEntryPage } from './booking/pages/organization-entry-page/organization-entry-page';

import { organizationGuard } from './core/guards/organization-guard';

export const routes: Routes = [


  {
    path: '',
    //canActivate: [organizationGuard],
    loadComponent: () => Home
  },

  /**
   * Legal
   */

  {
    path: 'legal/terminos',
    loadComponent: () => Terms
  },

  {
    path: 'legal/privacidad',
    loadComponent: () => Privacy
  },

  {
    path: 'legal/cookies',
    loadComponent: () => Cookies
  },

  {
    path: 'legal/cancelaciones',
    loadComponent: () => Cancellations
  },

  {
    path: 'legal/disclaimer',
    loadComponent: () => Disclaimer
  },

  /**
   * Sin resultados
   */
  {
    path: 'status/not-found',
    //canActivate: [organizationGuard],
    loadComponent: () => BookingStatusPage
  },

  {
    path: 'status/disabled',
    //canActivate: [organizationGuard],
    loadComponent: () => BookingStatusPage
  },

  {
    path: 'status/suspended',
    //canActivate: [organizationGuard],
    loadComponent: () => BookingStatusPage
  },

  /**
   * Result
   */

  {
    path: ':organizationSlug/result',
    //canActivate: [organizationGuard],
    loadComponent: () => BookingResult
  },

  /**
   * Manage
   */

  {
    path: ':organizationSlug/manage',
    //canActivate: [organizationGuard],
    loadComponent: () => BookingManage
  },


  /**
   * Booking
   */
  {
    path: ':organizationSlug/:branchSlug',
    //canActivate: [organizationGuard],
    loadComponent: () => BookingPage
  },

  {
    path: ':organizationSlug',
    //canActivate: [organizationGuard],
    loadComponent: () => OrganizationEntryPage
  },

  { path: '**', redirectTo: '' }

];
