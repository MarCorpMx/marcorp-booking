import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import {
  LucideAngularModule,
  Sparkles, Scissors, Hand, Brain, Stethoscope, Heart, Flower, Dumbbell, GraduationCap, Presentation,
  Target, PawPrint, PenTool, Circle, Apple, ShieldPlus,
  CheckCircle, XCircle, AlertTriangle, AlertCircle
} from 'lucide-angular';
import { ICONS } from '../../../core/config/icons.config';

import { BookingOrganization, BookingBranch, BookingPlan } from '../../../core/models/booking-entry.models';
import { BookingHeaderViewModel } from '../../../core/models/booking-header.model';

import { CenteredCardSkeleton } from '../components/skeletons/centered-card-skeleton/centered-card-skeleton';

import { BUSINESS_NICHE_UI } from '../../../core/config/business-niche-ui';
import { ErrorHandlerService } from '../../../core/services/error-handler.service';
import { NotificationService } from '../../../core/services/notification.service';
import { BookingPublicService } from '../../../core/services/booking-public.service';
import { BookingContextService } from '../../../core/services/booking-context.service';
import { BusinessCatalogService } from '../../../core/services/business-catalog.service';

@Component({
  selector: 'app-booking-result',
  imports: [CommonModule, LucideAngularModule, CenteredCardSkeleton],
  templateUrl: './booking-result.html',
  styleUrl: './booking-result.css',
})

export class BookingResult implements OnInit {

  icons = ICONS;

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

  private bookingPublicService = inject(BookingPublicService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private errorHandler = inject(ErrorHandlerService);
  private notify = inject(NotificationService);
  private bookingContext = inject(BookingContextService);
  public businessCatalog = inject(BusinessCatalogService);

  loading = true;
  processingToken = true;
  showManualCloseMessage = false;

  organizationSlug!: string | null;
  branchSlug!: string | null;
  token!: string;

  // Organization + brach data
  organization?: BookingOrganization;
  branch?: BookingBranch;
  plan?: BookingPlan;

  result: any = null;

  header?: BookingHeaderViewModel;

  ngOnInit(): void {

    this.loadContext();

  }

  private loadContext(): void {

    this.organizationSlug =
      this.route.snapshot.paramMap.get('organizationSlug');

    this.branchSlug =
      this.route.snapshot.paramMap.get('branchSlug');

    if (!this.organizationSlug || !this.branchSlug) {
      this.notify.error('Ruta inválida.');
      return;
    }

    this.bookingPublicService
      .getBranchBookingEntry(
        this.organizationSlug,
        this.branchSlug
      )
      .subscribe({

        next: (res) => {

          this.organization = res.organization;

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

          if (!res.branch.is_active || res.branch.locked_by_plan) {
            this.router.navigate(['/status/suspended']);

            return;
          }

          this.branch = res.branch;

          this.plan = res.plan;

          this.buildHeader();

          this.loading = false;

          this.loadToken();
        },

        error: (err) => {

          this.errorHandler.handle(err);

        }

      });

  }

  private loadToken(): void {

    const token =
      this.route.snapshot.paramMap.get('token');

    if (!token) {
      this.notify.error('Ocurrió un error al procesar la solicitud.');
      return;
    }

    this.processToken(token);

  }

  processToken(token: string) {
    if (!this.organizationSlug || !this.branchSlug) {
      return;
    }

    this.bookingPublicService.processAppointmentAction(
      this.organizationSlug,
      this.branchSlug,
      token
    )
      .subscribe({

        next: (res) => {

          //console.log('dataBackend :', JSON.stringify(res, null, 2));

          this.result = this.normalizeResult(res);

          this.processingToken = false;

        },

        error: (err) => {

          this.processingToken = false;

          if (err.error?.status) {

            this.result = err.error;

            return;
          }

          this.errorHandler.handle(err);

        }

      });

  }

  private normalizeResult(result: any): any {

    if (result.status === 'invalid_token' && !result.title) {

      return {
        ...result,
        title: 'Enlace no válido',
        message: 'Este enlace no existe o ya no es válido.'
      };

    }

    return result;

  }

  private buildHeader(): void {

    if (!this.organization || !this.branch || !this.plan) {
      return;
    }

    this.header = {

      organizationName:
        this.organization.name,

      branchName:
        this.branch.name,

      logoUrl:
        this.branch.branding?.logo_url
        ||
        this.organization.logo_url
        ||
        null,

      subtitle:
        this.buildHeaderSubtitle(),

      description:
        this.buildHeaderDescription(),

      location:
        this.buildLocation(),

      stats: {

        rating:
          this.branch.metadata?.rating ?? null,

        reviews_count:
          this.branch.metadata?.reviews_count ?? null
      },

      actions: {

        phone:
          this.branch.contact?.phone?.internationalNumber ?? null,

        whatsapp:
          this.branch.contact?.whatsapp?.e164Number ?? null,

        website:
          this.branch.contact?.website ?? null,

        /*
        si luego agregas maps_url desde backend
        */
        mapsUrl:
          this.branch.location?.maps_url ?? null,

        socialLinks:
          this.branch.contact?.social_links ?? null
      },

      showRombiBranding:
        this.plan.is_free
    };
  }

  private buildLocation(): string | null {

    if (!this.branch) {
      return null;
    }

    const city = this.branch.location?.city;

    const state = this.branch.location?.state;

    if (city && state) {
      return `${city}, ${state}`;
    }

    if (city) {
      return city;
    }

    if (state) {
      return state;
    }

    return null;
  }

  private resolveBusinessUI() {

    if (!this.organization) {
      return BUSINESS_NICHE_UI.other;
    }

    return (

      BUSINESS_NICHE_UI[
      this.organization.business_niche as keyof typeof BUSINESS_NICHE_UI
      ]

      ||

      BUSINESS_NICHE_UI.other
    );
  }

  private buildHeaderSubtitle(): string {

    if (
      this.branch?.tagline &&
      this.branch.tagline.trim().length > 0
    ) {
      return this.branch.tagline;
    }

    return this.resolveBusinessUI()
      .branchTaglineFallback;
  }

  private buildHeaderDescription(): string {

    if (
      this.branch?.description &&
      this.branch.description.trim().length > 0
    ) {
      return this.branch.description;
    }

    return this.resolveBusinessUI()
      .branchDescriptionFallback;
  }


  get nicheIcon() {

    const niche =
      this.organization?.business_niche ?? 'other';

    const iconName =
      this.businessCatalog.getIcon(niche);

    return this.NICHE_ICON_MAP[iconName] || Circle;
  }

  get nicheColor() {

    const niche =
      this.organization?.business_niche ?? 'other';

    return this.businessCatalog.getColor(niche);

  }
  
  get nicheLabel() {
    const niche =
      this.organization?.business_niche ?? 'other';

    return this.businessCatalog.getLabel(niche);
  }

  readonly STATUS_UI: Record<string, any> = {

    confirmed: {
      icon: CheckCircle,
      iconClass: 'text-green-500',
      bgClass: 'bg-green-50'
    },

    already_confirmed: {
      icon: CheckCircle,
      iconClass: 'text-green-500',
      bgClass: 'bg-green-50'
    },

    cancelled: {
      icon: XCircle,
      iconClass: 'text-gray-500',
      bgClass: 'bg-gray-100'
    },

    already_cancelled: {
      icon: XCircle,
      iconClass: 'text-gray-500',
      bgClass: 'bg-gray-100'
    },

    expired: {
      icon: AlertTriangle,
      iconClass: 'text-yellow-500',
      bgClass: 'bg-yellow-50'
    },

    already_used: {
      icon: AlertTriangle,
      iconClass: 'text-yellow-500',
      bgClass: 'bg-yellow-50'
    },

    already_completed: {
      icon: AlertTriangle,
      iconClass: 'text-yellow-500',
      bgClass: 'bg-yellow-50'
    },

    already_no_show: {
      icon: AlertTriangle,
      iconClass: 'text-yellow-500',
      bgClass: 'bg-yellow-50'
    },

    invalid_token: {
      icon: AlertCircle,
      iconClass: 'text-red-500',
      bgClass: 'bg-red-50'
    }

  };

  get statusUI() {
    return this.STATUS_UI[this.result?.status] ?? {
      icon: AlertCircle,
      iconClass: 'text-red-500',
      bgClass: 'bg-red-50'
    };
  }


  handleClose() {
    // intento cerrar
    window.close();

    // fallback elegante
    setTimeout(() => {
      this.showManualCloseMessage = true;
    }, 300);
  }

}

/*
private normalizeResult(result: any): any {

  // Si ya viene completo del backend, lo dejamos igual
  if (result.title) {
    return result;
  }

  switch (result.status) {

    case 'invalid_token':
      return {
        ...result,
        title: 'Enlace no válido',
        message: 'Este enlace no existe o ya no es válido.'
      };

    case 'expired':
      return {
        ...result,
        title: 'Enlace expirado',
        message: 'Este enlace ya expiró y no puede volver a utilizarse.'
      };

    case 'already_used':
      return {
        ...result,
        title: 'Enlace utilizado',
        message: 'Este enlace ya fue utilizado anteriormente.'
      };

    case 'already_completed':
      return {
        ...result,
        title: 'Cita finalizada',
        message: 'Esta cita ya fue atendida.'
      };

    case 'already_no_show':
      return {
        ...result,
        title: 'No asistió',
        message: 'Esta cita fue marcada como no asistida.'
      };

    case 'already_confirmed':
      return {
        ...result,
        title: 'Cita ya confirmada',
        message: 'Esta cita ya había sido confirmada anteriormente.'
      };

    case 'already_cancelled':
      return {
        ...result,
        title: 'Cita ya cancelada',
        message: 'Esta cita ya había sido cancelada anteriormente.'
      };

    default:
      return {
        ...result,
        title: 'Ocurrió un problema',
        message: 'No fue posible procesar la solicitud.'
      };

  }

}*/