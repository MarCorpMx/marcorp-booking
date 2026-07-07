import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import {
  LucideAngularModule,
  MapPin, Building2, Calendar, ArrowRight,
  Sparkles, Scissors, Hand, Brain, Stethoscope, Heart, Flower, Dumbbell, GraduationCap, Presentation,
  Target, PawPrint, PenTool, Circle, Apple, ShieldPlus
} from 'lucide-angular';

import { BookingPublicService } from '../../../core/services/booking-public.service';
import { NotificationService } from '../../../core/services/notification.service';
import { ErrorHandlerService } from '../../../core/services/error-handler.service';
import { BookingContextService } from '../../../core/services/booking-context.service';
import { BrandingService } from '../../../core/services/branding.service';
import { BUSINESS_NICHE_UI } from '../../../core/config/business-niche-ui';
import { BusinessCatalogService } from '../../../core/services/business-catalog.service';
import { BookingOrganizationEntryResponse, BookingBranchCard } from '../../../core/models/booking-entry.models';


@Component({
  selector: 'app-organization-entry-page',
  imports: [LucideAngularModule],
  templateUrl: './organization-entry-page.html',
  styleUrl: './organization-entry-page.css',
})

export class OrganizationEntryPage implements OnInit {

  readonly MapPin = MapPin;
  readonly Building2 = Building2;
  readonly Calendar = Calendar;
  readonly ArrowRight = ArrowRight;

  private route = inject(ActivatedRoute);
  private bookingPublicService = inject(BookingPublicService);
  private notify = inject(NotificationService);
  private errorHandler = inject(ErrorHandlerService);
  private bookingContext = inject(BookingContextService);
  private branding = inject(BrandingService);
  private router = inject(Router);
  private businessCatalog = inject(BusinessCatalogService);

  readonly NICHE_ICON_MAP: Record<string, any> = {
    sparkles: Sparkles,
    scissors: Scissors,
    hand: Hand,
    brain: Brain,
    stethoscope: Stethoscope,
    heart: Heart,
    flower: Flower,
    dumbbell: Dumbbell,
    'graduation-cap': GraduationCap,
    presentation: Presentation,
    target: Target,
    'paw-print': PawPrint,
    'pen-tool': PenTool,
    circle: Circle,
    apple: Apple,
    'shield-plus': ShieldPlus
  };

  data!: BookingOrganizationEntryResponse;

  branches: BookingBranchCard[] = [];

  businessUI = BUSINESS_NICHE_UI.other;

  loading = true;

  isNavigating = false;

  selectedBranchId: number | null = null;

  ngOnInit() {

    this.loadOrganization();

  }

  loadOrganization() {
    const organizationSlug = this.route.snapshot.paramMap.get('organizationSlug');

    if (!organizationSlug) {
      this.notify.error('Error en la ruta');
      return;
    }

    this.bookingPublicService
      .getOrganizationEntry(organizationSlug)
      .subscribe({
        next: (res) => {

          this.data = res;

          //console.log('dataBackend :', JSON.stringify(res, null, 2));

          this.branches = res.branches;

          this.resolveBusinessTexts();

          // Reset contexto
          if (
            this.bookingContext.organization()?.slug !== res.organization.slug
          ) {
            this.bookingContext.clear();
          }

          this.bookingContext.setOrganization(res);

          /*
          |--------------------------------------------------------------------------
          | Validaciones
          |--------------------------------------------------------------------------
          */

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

          /*
          |--------------------------------------------------------------------------
          | Si solo hay una sucursal → redirect automático
          |--------------------------------------------------------------------------
          */

          if (res.branches.length === 1) {

            this.router.navigate([
              '/',
              organizationSlug,
              res.branches[0].slug
            ]);

            return;
          }

          this.loading = false;


        },
        error: (err) => {
          this.errorHandler.handle(err);

        }
      });
  }


  get nicheIcon() {

    const niche =
      this.data?.organization?.business_niche ?? 'other';

    const iconName =
      this.businessCatalog.getIcon(niche);

    return this.NICHE_ICON_MAP[iconName] || Circle;
  }

  get nicheColor() {

    const niche =
      this.data?.organization?.business_niche ?? 'other';

    return this.businessCatalog.getColor(niche);

  }

  private resolveBusinessTexts(): void {

    const niche = this.data.organization.business_niche;

    this.businessUI =
      BUSINESS_NICHE_UI[
      niche as keyof typeof BUSINESS_NICHE_UI
      ] || BUSINESS_NICHE_UI.other;
  }

  goToBranch(branch: BookingBranchCard) {

    if (this.isNavigating) return;

    this.isNavigating = true;
    this.selectedBranchId = branch.id;


    const orgSlug = this.data.organization.slug;

    this.router.navigate([
      '/',
      orgSlug,
      branch.slug
    ]);
  }

}
