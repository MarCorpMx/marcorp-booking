
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormGroup,
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
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
import { BookingManageAppointment } from '../../../core/models/booking-manage.model';
import { BookingAvailability, BookingTimeSlot } from '../../../core/models/booking-availability.models';
import { BookingRescheduleRequest } from '../../../core/models/booking-reschedule.models';

import { CenteredCardSkeleton } from '../components/skeletons/centered-card-skeleton/centered-card-skeleton';

import { BUSINESS_NICHE_UI } from '../../../core/config/business-niche-ui';
import { ErrorHandlerService } from '../../../core/services/error-handler.service';
import { NotificationService } from '../../../core/services/notification.service';
import { BookingPublicService } from '../../../core/services/booking-public.service';
import { BookingContextService } from '../../../core/services/booking-context.service';
import { BusinessCatalogService } from '../../../core/services/business-catalog.service';

import { DateTimeSelector } from '../booking-page/components/date-time-selector/date-time-selector';

@Component({
  selector: 'app-booking-manage',
  imports: [CommonModule, ReactiveFormsModule, LucideAngularModule, CenteredCardSkeleton, DateTimeSelector],
  templateUrl: './booking-manage.html',
  styleUrl: './booking-manage.css',
})

export class BookingManage implements OnInit {

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
  private fb = inject(FormBuilder);

  loading = true;
  processingReferenceCode = true;
  appointmentNotFound = false;

  organizationSlug!: string | null;
  branchSlug!: string | null;
  referenceCode!: string | null;

  hasReferenceCode = false; // indica si la URL trae un código

  appointment: BookingManageAppointment | null = null;

  // Organization + brach data
  organization?: BookingOrganization;
  branch?: BookingBranch;
  plan?: BookingPlan;

  businessNiche: string = 'other';

  header?: BookingHeaderViewModel;

  form!: FormGroup;
  formCancel!: FormGroup;
  formReschedule!: FormGroup;

  // Acciones
  showCancelModal = false;

  isCancelling = false;

  cancelReason = '';

  cancelNote = '';

  cancelOptions = [
    'Ya no podré asistir',
    'Necesito cambiar la fecha',
    'Encontré otra opción',
    'Reservé por error',
    'Otro motivo'
  ];

  // Reagendar
  isInRescheduleMode = false; // Selecto de fecha

  isSavingReschedule = false; // Modal de confirmación

  isSelectingDate = false;

  showRescheduleModal = false;

  rescheduleOptions = [
    'Surgió un compromiso',
    'Necesito otro horario',
    'No podré asistir a esa hora',
    'Solicitado por el establecimiento',
    'Otro motivo'
  ];

  // Disponibilidad de horario
  availability: BookingAvailability | null = null;

  timeSlots: BookingTimeSlot[] = [];

  selectedDate: string | null = null;

  selectedTime: BookingTimeSlot | null = null;

  readonly APPOINTMENT_STATUS: any = {

    pending: {
      label: 'Pendiente',
      description: 'Estamos esperando la confirmación del establecimiento.',
      bg: 'bg-amber-100',
      color: 'text-amber-700'
    },

    confirmed: {
      label: 'Confirmada',
      description: 'Todo listo. Te esperamos en el horario programado.',
      bg: 'bg-green-100',
      color: 'text-green-700'
    },

    completed: {
      label: 'Completada',
      description: 'Esta cita ya fue realizada.',
      bg: 'bg-blue-100',
      color: 'text-blue-700'
    },

    rescheduled: {
      label: 'Reagendada',
      description: 'Tu cita fue actualizada correctamente.',
      bg: 'bg-purple-100',
      color: 'text-purple-700'
    },

    cancelled: {
      label: 'Cancelada',
      description: 'Esta cita fue cancelada y ya no se encuentra activa.',
      bg: 'bg-red-100',
      color: 'text-red-700'
    },

    no_show: {
      label: 'No asistió',
      description: 'La cita finalizó sin registrarse la asistencia.',
      bg: 'bg-slate-200',
      color: 'text-slate-700'
    }

  } as const;

  ngOnInit(): void {

    this.buildForm();
    this.loadContext();

  }

  private buildForm(): void {
    this.form = this.fb.group({

      referenceCode: [
        '',
        [
          Validators.required
        ]
      ]

    });

    this.formCancel = this.fb.group(
      {
        reason: [
          '',
          Validators.required
        ],

        note: [
          '',
          [
            Validators.minLength(10),
            Validators.maxLength(500)
          ]
        ]
      },
      {
        validators: this.otherReasonValidator()
      }
    );

    this.formReschedule = this.fb.group(
      {
        reason: [
          '',
          Validators.required
        ],

        note: [
          '',
          [
            Validators.minLength(10),
            Validators.maxLength(500)
          ]
        ]
      },
      {
        validators: this.otherRescheduleReasonValidator()
      }
    );

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

          if (!res.branch.is_active || res.branch.locked_by_plan) {
            this.router.navigate(['/status/suspended']);

            return;
          }

          this.businessNiche = res.organization.business_niche;

          this.branch = res.branch;

          this.plan = res.plan;

          this.buildHeader();

          this.loading = false;

          this.loadReferenceCode();

        },

        error: (err) => {

          this.errorHandler.handle(err);

        }

      });

  }

  private loadReferenceCode(): void {

    this.referenceCode =
      this.route.snapshot.paramMap.get('referenceCode');

    this.hasReferenceCode = !!this.referenceCode;

    if (!this.hasReferenceCode) {

      this.processingReferenceCode = false;
      return;

    }

    if (this.hasReferenceCode) {

      this.form.patchValue({

        referenceCode: this.referenceCode

      });

      this.searchAppointment();

      return;
    }

  }

  public searchAppointment(): void {

    if (!this.organizationSlug || !this.branchSlug) {
      return;
    }

    if (this.form.invalid) {

      this.form.markAllAsTouched();

      this.notify.error(
        'Ingresa el código de referencia.'
      );

      return;

    }

    this.referenceCode =
      this.form.value.referenceCode.trim();

    if (!this.referenceCode) {
      return;
    }

    this.processingReferenceCode = true;
    this.appointmentNotFound = false;

    this.bookingPublicService.getAppointmentByReference(
      this.organizationSlug,
      this.branchSlug,
      this.referenceCode
    )
      .subscribe({

        next: (res) => {

          //console.log('dataBackend :', JSON.stringify(res, null, 2));

          if (res.status === 'not_found') {

            this.processingReferenceCode = false;

            this.appointmentNotFound = true;

            return;

          }

          this.appointment = res.appointment;

          this.processingReferenceCode = false;

        },

        error: (err) => {

          this.processingReferenceCode = false;

          this.errorHandler.handle(err);

        }

      });

  }

  openCancelModal(): void {

    this.formCancel.reset();

    this.showCancelModal = true;

  }

  closeCancelModal(): void {

    if (this.isCancelling) {
      return;
    }

    this.formCancel.reset({
      reason: '',
      note: ''
    });

    this.showCancelModal = false;

  }

  confirmCancel(): void {

    if (this.isCancelling) {
      return;
    }

    if (this.formCancel.invalid) {

      this.formCancel.markAllAsTouched();

      this.notify.error(
        'Completa la información requerida antes de continuar.'
      );

      return;

    }

    const payload = {

      reason: this.formCancel.value.reason,

      note: this.formCancel.value.note?.trim() || null

    };

    //console.log('payload:', JSON.stringify(payload, null, 2));

    if (!this.organizationSlug || !this.branchSlug || !this.referenceCode) {
      return;
    }

    this.isCancelling = true;

    this.bookingPublicService.cancelByReference(
      this.organizationSlug,
      this.branchSlug,
      this.referenceCode,
      payload
    )
      .subscribe({
        next: (res) => {

          this.notify.success(res.message);

          this.isCancelling = false;

          this.closeCancelModal();

          this.searchAppointment();
        },

        error: (err) => {

          this.isCancelling = false;

          this.errorHandler.handle(err);

        }
      });

  }

  startReschedule() {
    this.isInRescheduleMode = true;

    this.loadAvailability();
  }

  loadAvailability(): void {

    if (!this.appointment || !this.appointment.staff?.id) {
      console.warn('Problemas al cargar disponiblidad');
      return;
    }

    this.selectedDate = null;
    this.selectedTime = null;
    this.timeSlots = [];

    this.bookingPublicService
      .getAvailability(
        this.appointment.variant.id,
        this.appointment.staff?.id ?? null
      )
      .subscribe({

        next: (res) => {

          this.availability = res;

        },

        error: (err) => {

          this.errorHandler.handle(err);

        }

      });

  }

  confirmReschedule() {
    if (!this.selectedDate || !this.selectedTime) {
      this.notify.error('Debes seleccionar la nueva fecha');
      return;
    }

    this.showRescheduleModal = true;
  }

  cancelReschedule() {
    this.isInRescheduleMode = false;
  }

  openRescheduleModal(): void {
    this.formReschedule.reset({

      reason: '',

      note: ''

    });
    this.showRescheduleModal = true;
  }

  closeRescheduleModal(): void {

    if (this.isSavingReschedule) {
      return;
    }

    this.formReschedule.reset({

      reason: '',

      note: ''

    });

    this.showRescheduleModal = false;

  }

  onTimeSelected(slot: BookingTimeSlot): void {

    this.selectedTime = slot;

  }

  onDateSelected(date: string) {

    this.selectedDate = date;

    this.selectedTime = null; // limpiamos la hora anterior

    this.loadTimeSlots(date);

  }

  loadTimeSlots(date: string): void {

    if (!this.appointment) {
      return;
    }

    this.bookingPublicService
      .getTimeSlots(
        this.appointment.variant.id,
        date,
        this.appointment.staff?.id
      )
      .subscribe({

        next: (res: any) => {

          this.timeSlots = res?.data ?? res ?? [];

        },

        error: (err) => {

          this.errorHandler.handle(err);

        }

      });

  }

  saveReschedule(): void {

    if (!this.selectedDate || !this.selectedTime) {
      return;
    }

    if (this.formReschedule.invalid) {

      this.formReschedule.markAllAsTouched();

      this.notify.error(
        'Completa la información requerida.'
      );

      return;
    }

    const payload: BookingRescheduleRequest = {

      booking_date: this.selectedDate,

      booking_time: this.selectedTime.time,

      reason: this.formReschedule.value.reason,

      note: this.formReschedule.value.note?.trim() || null

    };

    console.log('payload:', JSON.stringify(payload, null, 2));


    this.isSavingReschedule = true;

    this.bookingPublicService
      .rescheduleByReference(
        this.organizationSlug!,
        this.branchSlug!,
        this.referenceCode!,
        payload
      )
      .subscribe({

        next: (res) => {

          this.notify.success(res.message);


          this.isSavingReschedule = false;

          this.showRescheduleModal = false;

          this.isInRescheduleMode = false;

          this.searchAppointment();
        },

        error: (err) => {

          //this.isInRescheduleMode = false;
          this.isSavingReschedule = false;

          this.errorHandler.handle(err);

        }

      });

  }

  searchAgain(): void {

    this.resetSearchState();

  }

  private resetSearchState(): void {

    this.appointment = null;
    this.appointmentNotFound = false;

    this.processingReferenceCode = false;
    this.isInRescheduleMode = false;

    this.showCancelModal = false;
    this.showRescheduleModal = false;

    this.referenceCode = null;

    this.form.reset();

  }

  private otherReasonValidator(): ValidatorFn {

    return (group: AbstractControl): ValidationErrors | null => {

      const reason = group.get('reason')?.value;
      const note = (group.get('note')?.value ?? '').trim();

      if (reason === 'Otro motivo' && note.length === 0) {

        group.get('note')?.setErrors({
          ...(group.get('note')?.errors ?? {}),
          requiredForOther: true
        });

        return {
          requiredForOther: true
        };

      }

      if (group.get('note')?.hasError('requiredForOther')) {

        const errors = {
          ...group.get('note')?.errors
        };

        delete errors['requiredForOther'];

        group.get('note')?.setErrors(
          Object.keys(errors).length ? errors : null
        );

      }

      return null;

    };

  }

  private otherRescheduleReasonValidator(): ValidatorFn {

    return (group: AbstractControl): ValidationErrors | null => {

      const reason = group.get('reason')?.value;

      const note = (group.get('note')?.value ?? '').trim();

      if (reason === 'Otro motivo' && note.length === 0) {

        group.get('note')?.setErrors({

          ...(group.get('note')?.errors ?? {}),

          requiredForOther: true

        });

        return {

          requiredForOther: true

        };

      }

      if (group.get('note')?.hasError('requiredForOther')) {

        const errors = {

          ...group.get('note')?.errors

        };

        delete errors['requiredForOther'];

        group.get('note')?.setErrors(

          Object.keys(errors).length
            ? errors
            : null

        );

      }

      return null;

    };

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

  public getModeLabel(
    mode: BookingManageAppointment['mode']
  ): string {

    switch (mode) {

      case 'presential':
        return 'Presencial';

      case 'online':
        return 'En línea';

      case 'hybrid':
        return 'Híbrido';

      default:
        return 'No definido';

    }

  }

  public getStatusInfo() {

    if (!this.appointment) {
      return null;
    }

    return this.APPOINTMENT_STATUS[this.appointment.status];

  }

  getPetSpeciesLabel(species: string | null | undefined, custom?: string | null): string {

    switch (species) {

      case 'dog':
        return 'Perro';

      case 'cat':
        return 'Gato';

      case 'bird':
        return 'Ave';

      case 'rabbit':
        return 'Conejo';

      case 'hamster':
        return 'Hámster';

      case 'fish':
        return 'Pez';

      case 'reptile':
        return 'Reptil';

      case 'other':
        return custom?.trim() || 'Otra';

      default:
        return 'Sin especificar';

    }

  }

  getPetEmoji(species: string): string {

    switch (species) {

      case 'dog': return '🐶';
      case 'cat': return '🐱';
      case 'bird': return '🐦';
      case 'rabbit': return '🐰';
      case 'fish': return '🐟';
      default: return '🐾';

    }

  }

  getPetGenderLabel(gender: string | null): string {

    switch (gender) {

      case 'male':
        return 'Macho';

      case 'female':
        return 'Hembra';

      default:
        return 'No especificado';

    }

  }

  formatSelectedDate(): Date {
    return new Date(this.selectedDate + 'T00:00:00');
  }

  openWa(numberWhats: any): void {

    const message = [
      'Hola',
      '',
      `Soy ${this.appointment?.client.first_name} ${this.appointment?.client.last_name}.`,
      '',
      'Tengo una cita con ustedes.',
      '',
      'Mi código de referencia es:',
      '',
      this.appointment?.reference_code,
      '',
      '¿Podrían ayudarme por favor?'
    ].join('\n');

    const encodedMessage =
      encodeURIComponent(message);

    window.open(
      `https://wa.me/${numberWhats}?text=${encodedMessage}`,
      '_blank'
    );
  }

  goToBooking() {
    if (!this.organization?.slug || !this.branch?.slug) {
      return;
    }

    this.router.navigate([
      '/',
      this.organization.slug,
      this.branch.slug
    ]);
  }

  getError(control: string): string | null {

    const c = this.form.get(control);

    if (!c || !c.touched || !c.errors) {

      return null;

    }

    if (c.errors['required']) {

      return 'Campo obligatorio';

    }

    if (c.errors['email']) {

      return 'Correo inválido';

    }

    if (c.errors['maxlength']) {

      return 'Demasiado largo';

    }

    if (c.errors['minlength']) {

      return 'Muy corto';

    }

    return null;

  }

}