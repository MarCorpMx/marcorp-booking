import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import {
  LucideAngularModule,
  Sparkles, Scissors, Hand, Brain, Stethoscope, Heart, Flower, Dumbbell, GraduationCap, Presentation,
  Target, PawPrint, PenTool, Circle, Apple, ShieldPlus
} from 'lucide-angular';

import { ICONS } from '../../../core/config/icons.config';

import { Title } from '@angular/platform-browser';

import { environment } from '../../../../environments/environment';
import { BookingPublicService } from '../../../core/services/booking-public.service';
import { ErrorHandlerService } from '../../../core/services/error-handler.service';
import { NotificationService } from '../../../core/services/notification.service';
import { BookingOrganization, BookingBranch, BookingPlan } from '../../../core/models/booking-entry.models';
import { BusinessCatalogService } from '../../../core/services/business-catalog.service';
import { BookingHeaderViewModel } from '../../../core/models/booking-header.model';
import { BUSINESS_NICHE_UI } from '../../../core/config/business-niche-ui';
import { BookingContextService } from '../../../core/services/booking-context.service';

import { BookingLoader } from './enums/booking-loaders.enum';
import { BookingLoadingService } from '../../../core/services/booking-loading.service';
import { BookingService, BookingServiceVariant, BookingStaffMember } from '../../../core/models/booking-service.models';
import { BookingVariantSelection } from '../../../core/models/booking-selection.models';
import { BookingAvailability, BookingTimeSlot } from '../../../core/models/booking-availability.models';
import { CreateBookingRequest } from '../../../core/models/booking-create.models';

// Skeletons
import { BookingShellSkeleton } from './components/skeletons/booking-shell-skeleton/booking-shell-skeleton';
import { ServicesSkeleton } from './components/skeletons/services-skeleton/services-skeleton';
import { DateTimeSkeleton } from './components/skeletons/date-time-skeleton/date-time-skeleton';
import { CustomerFormSkeleton } from './components/skeletons/customer-form-skeleton/customer-form-skeleton';
import { BookingConfirmationSkeleton } from './components/skeletons/booking-confirmation-skeleton/booking-confirmation-skeleton';

// Componentes
import { StepperIndicator } from './components/stepper-indicator/stepper-indicator';
import { BookingSummary } from './components/booking-summary/booking-summary';
import { MobileBookingSummary } from './components/mobile-booking-summary/mobile-booking-summary';
import { ServiceSelector } from './components/service-selector/service-selector';
import { DateTimeSelector } from './components/date-time-selector/date-time-selector';
import { CustomerForm } from './components/customer-form/customer-form';
import { BookingConfirmation } from './components/booking-confirmation/booking-confirmation';
import { BookingSuccess } from './components/booking-success/booking-success';

// Solo en desarrollo para delay de peticiones
import { delay } from 'rxjs';


@Component({
  selector: 'app-booking-page',
  imports: [CommonModule, LucideAngularModule,
    BookingShellSkeleton, ServicesSkeleton, DateTimeSkeleton, CustomerFormSkeleton, BookingConfirmationSkeleton,
    StepperIndicator, BookingSummary, MobileBookingSummary, ServiceSelector, DateTimeSelector, CustomerForm,
    BookingConfirmation, BookingSuccess
  ],
  templateUrl: './booking-page.html',
  styleUrl: './booking-page.css',
})

export class BookingPage implements OnInit {
  icons = ICONS;

  readonly BookingLoader = BookingLoader;

  private bookingPublicService = inject(BookingPublicService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private errorHandler = inject(ErrorHandlerService);
  private notify = inject(NotificationService);
  public loading = inject(BookingLoadingService);
  public businessCatalog = inject(BusinessCatalogService);
  private bookingContext = inject(BookingContextService);

  private landingRombiURL = environment.bookingBaseUrl;

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


  /**
 * Timestamp en el que el usuario abrió el formulario.
 * Se utiliza para detectar envíos automáticos demasiado rápidos.
 */
  formLoadedAt = Math.floor(Date.now() / 1000);

  //currentStep = 1;
  bookingCompleted = false;
  showConfirmation = false;

  // Data para servicio
  selectedService: BookingService | null = null;
  selectedVariant: BookingServiceVariant | null = null;
  selectedMode: 'online' | 'presential' | 'hybrid' | null = null;
  selectedStaff: BookingStaffMember | null = null;

  // Data para date-time-selector
  availability: BookingAvailability | null = null;
  timeSlots: BookingTimeSlot[] = [];
  //timeSlots: any = [];


  selectedDate: string | null = null;

  //selectedDate: Date | null = null;
  selectedTime: BookingTimeSlot | null = null;
  //staff_member_id: number = 0;
  customerData: any = null;


  // Organization + brach data
  organization?: BookingOrganization;
  branch?: BookingBranch;
  plan?: BookingPlan;

  services: BookingService[] = [];

  header?: BookingHeaderViewModel;

  restarting = false;

  referenceCode: string | null = null;

  ngOnInit(): void {

    this.loadOrganization();

  }

  loadOrganization() {
    const organizationSlug = this.route.snapshot.paramMap.get('organizationSlug');
    const branchSlug = this.route.snapshot.paramMap.get('branchSlug');


    if (!organizationSlug || !branchSlug) {
      this.notify.error('Error en la ruta');
      return;
    }

    this.loading
      .wrap(

        BookingLoader.Organization,

        this.bookingPublicService
          .getBranchBookingEntry(
            organizationSlug,
            branchSlug
          )

      )
      .subscribe({

        next: (res) => {

          //console.log('dataBackend :', JSON.stringify(res, null, 2));

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

          if (!res.organization.online_booking_enabled) {

            this.router.navigate(['/status/disabled']);

            return;
          }

          //
          if (!res.branch.is_active || res.branch.locked_by_plan) {
            this.router.navigate(['/status/suspended']);

            return;
          }

          this.branch = res.branch;

          this.plan = res.plan;

          this.buildHeader();

          this.loadServices();
        },

        error: (err) => {

          this.errorHandler.handle(err);
        }
      });

  }

  loadServices() {

    if (!this.organization?.slug || !this.branch?.slug) {
      console.error('Falla en detectar slugs');
      return;
    }

    this.loading
      .wrap(

        BookingLoader.Services,

        this.bookingPublicService
          .getServices(this.organization?.slug, this.branch?.slug)

      )
      .subscribe({

        next: (res) => {

          //console.log('dataBackend-Services :', JSON.stringify(res, null, 2));

          this.services = res.data;

        },

        error: (err) => {

          this.errorHandler.handle(err);
        }
      });
  }

  // Disponibilidad
  loadAvailability(): void {

    if (!this.selectedVariant || !this.selectedStaff) {
      this.notify.error('Error al seleccionar servicio-staff');
      return;
    }

    this.selectedDate = null;
    this.selectedTime = null;
    this.timeSlots = [];

    this.loading.wrap(

      BookingLoader.Availability,

      this.bookingPublicService.getAvailability(
        this.selectedVariant.id,
        this.selectedStaff?.id
      )

    )
      .subscribe({

        next: (res) => {

          this.availability = res;

          this.scrollToDateSelector();

          /*console.log(
            'availability:',
            JSON.stringify(res, null, 2)
          );*/

        },

        error: (err) => {

          this.errorHandler.handle(err);

        }

      });

  }


  onDateSelected(date: string) {

    this.selectedDate = date;

    this.selectedTime = null; // limpiamos la hora anterior

    this.loadTimeSlots(date);

  }

  loadTimeSlots(date: string) {

    if (!this.selectedVariant) {
      return;
    }

    this.loading.wrap(

      BookingLoader.Timeslots,

      this.bookingPublicService.getTimeSlots(
        this.selectedVariant.id,
        date,
        this.selectedStaff?.id
      )

    )
      .subscribe({

        next: (res: any) => {


          /*console.log(
            'timeslots disponibles:',
            JSON.stringify(res, null, 2)
          );*/

          this.timeSlots = res?.data ?? res ?? [];

        },

        error: (err) => {
          this.errorHandler.handle(err);
        }

      });

  }

  onTimeSelected(slot: BookingTimeSlot): void {

    this.selectedTime = slot;

    this.loading.start(BookingLoader.CustomerForm);

    this.scrollToCustomer();

    setTimeout(() => {

      this.loading.stop(BookingLoader.CustomerForm);

    }, 500);

  }

  private scrollToCustomer(): void {

    setTimeout(() => {

      document
        .getElementById('customer-section')
        ?.scrollIntoView({

          behavior: 'smooth',

          block: 'start'

        });

    }, 100);

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

  get bookingCtaTitle(): string {

    return this.resolveBusinessUI()
      .bookingCtaTitle;
  }

  get bookingCtaSubtitle(): string {

    return this.resolveBusinessUI()
      .bookingCtaSubtitle;
  }

  openWa(numberWhats: any): void {

    const message =
      this.buildWhatsappMessage();

    const encodedMessage =
      encodeURIComponent(message);

    window.open(
      `https://wa.me/${numberWhats}?text=${encodedMessage}`,
      '_blank'
    );
  }

  private buildWhatsappMessage(): string {

    return this.resolveBusinessUI()
      .whatsappInquiryMessage;
  }

  goToBookingRombi(): void {
    window.open(
      `${this.landingRombiURL}`,
      '_blank',
      'noopener,noreferrer'
    );
  }

  get currentStep(): number {

    if (this.showConfirmation) {
      return 4;
    }

    if (this.customerData) {
      return 4;
    }

    if (
      this.selectedVariant &&
      this.selectedDate &&
      this.selectedTime
    ) {
      return 3;
    }

    if (this.selectedVariant) {
      return 2;
    }

    return 1;
  }

  get canShowDateStep(): boolean {
    return !!this.selectedVariant;
  }

  get canShowCustomerStep(): boolean {
    return !!(
      this.selectedVariant &&
      this.selectedDate &&
      this.selectedTime
    );
  }

  get canShowConfirmationStep(): boolean {
    return this.showConfirmation;
  }

  private resetBookingFlow(): void {

    this.selectedDate = null;
    this.selectedTime = null;
    this.customerData = null;
    this.showConfirmation = false;
  }

  // Seleccionar servicio - variante - staff
  onVariantSelected(
    selection: BookingVariantSelection
  ): void {

    this.selectedService =
      selection.service;

    this.selectedVariant =
      selection.variant;

    this.selectedStaff =
      selection.staffMember;

    this.selectedMode =
      selection.selectedMode
      ?? selection.variant.mode;

    // reset flujo dependiente
    this.resetBookingFlow();

    //console.log('servicio seleccionado:', JSON.stringify(selection, null, 2));

    this.loadAvailability();

  }

  private scrollToDateSelector(): void {

    setTimeout(() => {

      document
        .getElementById('date-selector')
        ?.scrollIntoView({

          behavior: 'smooth',

          block: 'start'

        });

    }, 100);

  }

  onCustomerCompleted(data: any) {

    this.customerData = data;

    this.goToConfirmation();

    //console.log('customerData:', JSON.stringify(this.customerData, null, 2));

  }

  goToConfirmation(): void {

    this.showConfirmation = true;

    this.loading.start(BookingLoader.Confirmation);

    setTimeout(() => {

      this.loading.stop(BookingLoader.Confirmation);

      document
        .getElementById('booking-confirmation')
        ?.scrollIntoView({

          behavior: 'smooth',

          block: 'start'

        });

    }, 500);

  }

  createBooking() {

    const payload: CreateBookingRequest = {

      organization_slug: this.organization!.slug,

      branch_slug: this.branch!.slug,

      service_variant_id: this.selectedVariant!.id,

      staff_member_id: this.selectedStaff?.id ?? null,

      booking_date: this.selectedDate!,

      booking_time: this.selectedTime!.time,

      mode: this.selectedMode!,

      customer: this.customerData,

      // honeypot
      website: '',
      form_time: this.formLoadedAt

    };

    console.log('payloadEnviar:', JSON.stringify(payload, null, 2));


    this.loading.start(
      BookingLoader.CreateBooking
    );

    this.bookingPublicService
      .createBooking(payload)
      .subscribe({

        next: (response) => {

          this.loading.stop(
            BookingLoader.CreateBooking
          );

          this.referenceCode =
            response.appointment.reference_code;

          this.bookingCompleted = true;

          setTimeout(() => {

            window.scrollTo({

              top: 0,

              behavior: 'smooth'

            });

          }, 50);

        },

        error: (err) => {

          this.loading.stop(
            BookingLoader.CreateBooking
          );

          this.errorHandler.handle(err);

        }

      });
  }

  // La puta simulación man
  /*createBooking(): void {

    this.loading.start(BookingLoader.CreateBooking);

    setTimeout(() => {

      this.loading.stop(BookingLoader.CreateBooking);

      this.referenceCode = 'RB-2026-000001';

      this.bookingCompleted = true;

      // Nos vamos hasta arriba
      setTimeout(() => {

        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });

      }, 50);

    }, 1500);

  }*/

  resetBooking(): void {

    this.formLoadedAt = Math.floor(Date.now() / 1000);

    this.restarting = true;

    setTimeout(() => {

      this.bookingCompleted = false;
      this.showConfirmation = false;

      // servicio
      this.selectedService = null;
      this.selectedVariant = null;
      this.selectedStaff = null;
      this.selectedMode = null;

      // fecha
      this.selectedDate = null;
      this.selectedTime = null;

      // cliente
      this.customerData = null;

      // resultado
      this.referenceCode = null;

      // disponibilidad
      this.availability = null;
      this.timeSlots = [];


      window.scrollTo({
        top: 0,
        behavior: 'instant'
      });

      this.restarting = false;

    }, 450);

  }


}