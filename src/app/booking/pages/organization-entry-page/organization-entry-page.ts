import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { BookingEntryService } from '../../../core/services/booking-entry-service';
import { NotificationService } from '../../../core/services/notification.service';
import { ErrorHandlerService } from '../../../core/services/error-handler.service';
import { BookingContextService } from '../../../core/services/booking-context.service';
import { BrandingService } from '../../../core/services/branding.service';


@Component({
  selector: 'app-organization-entry-page',
  imports: [],
  templateUrl: './organization-entry-page.html',
  styleUrl: './organization-entry-page.css',
})

export class OrganizationEntryPage implements OnInit {

  private route = inject(ActivatedRoute);
  private bookingEntryService = inject(BookingEntryService);
  private notify = inject(NotificationService);
  private errorHandler = inject(ErrorHandlerService);
  private bookingContext = inject(BookingContextService);
  private branding = inject(BrandingService);
  private router = inject(Router);

  loading = true;

  ngOnInit() {

    this.loadOrganization();

  }

  loadOrganization() {
    const organizationSlug = this.route.snapshot.paramMap.get('organizationSlug');

    if (!organizationSlug) {
      this.notify.error('Error en la ruta');
      return;
    }

    this.bookingEntryService
      .getOrganizationEntry(organizationSlug)
      .subscribe({
        next: (res) => {

          console.log('dataBackend :', JSON.stringify(res, null, 2));

          if (
            this.bookingContext.organization()?.slug !== res.organization.slug
          ) {
            this.bookingContext.clear();
          }

          this.bookingContext.setOrganization(res);

          //this.branding.apply(res.organization);

          if (!res.organization.onboarding_completed_at) {

            this.router.navigate(['/status/not-found']);

            return;
          }

          if (res.organization.status !== 'active') {
            this.router.navigate(['/status/suspended']);

            return;
          }

          if (!res.organization.online_booking_enabled) {

            this.router.navigate(['/status/disabled']);

            return;
          }

          this.loading = false;


        },
        error: (err) => {
          this.errorHandler.handle(err);

        }
      });
  }

}
