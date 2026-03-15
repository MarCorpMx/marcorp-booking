import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { LucideAngularModule, Star, MapPin } from 'lucide-angular';

import { StepperIndicator } from '../../components/stepper-indicator/stepper-indicator';
import { BookingSummary } from '../../components/booking-summary/booking-summary';
import { ServiceSelector } from '../../components/service-selector/service-selector';
import { DateTimeSelector } from '../../components/date-time-selector/date-time-selector';
import { CustomerForm } from '../../components/customer-form/customer-form';
import { BookingConfirmation } from '../../components/booking-confirmation/booking-confirmation';
import { BookingSuccess } from '../../components/booking-success/booking-success';

import { OrganizationService } from '../../../core/services/organization.service';
import { OrganizationModel } from '../../../core/models/organization.model';
import { BookingService } from '../../../core/services/booking.service';
import { ServiceModel } from '../../../core/models/service.model';
import { TimeSlot } from '../../../core/models/date-time.model';

import { Title } from '@angular/platform-browser';
import { NotificationService } from '../../../core/services/notification.service';

import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-booking-page',
  imports: [CommonModule, LucideAngularModule, StepperIndicator, BookingSummary, ServiceSelector,
    DateTimeSelector, CustomerForm, BookingConfirmation, BookingSuccess, MatButtonModule
  ],
  templateUrl: './booking-page.html',
  styleUrl: './booking-page.css',
})

export class BookingPage implements OnInit {
  readonly Star = Star;
  readonly MapPin = MapPin;

  servicesLoading = true;

  organization?: OrganizationModel;
  services: ServiceModel[] = [];

  selectedService: any = null;
  selectedVariant: any = null;

  selectedDate: Date | null = null;
  selectedTime: string | null = null;
  staff_member_id: number = 0;

  currentStep = 1;
  showConfirmation = false;

  customerData: any = null;

  bookingCompleted = false;
  isSubmitting = false;

  formLoadedAt!: number;

  constructor(
    private route: ActivatedRoute,
    private organizationService: OrganizationService,
    private bookingService: BookingService,
    private title: Title,
    private notify: NotificationService
  ) { }

  /*pruebaMensajes() {
    this.notify.error('No se pudo crear la cita. Intenta nuevamente en unos minutos.');
  }*/

  setBranding(org: OrganizationModel) {

    // TITLE
    const title = org?.name
      ? `${org.name} | Agenda`
      : 'MarCorp | Agenda';

    this.title.setTitle(title);


    // FAVICON
    const favicon = document.getElementById('app-favicon') as HTMLLinkElement;

    if (favicon) {
      favicon.href = org?.logo_url ?? 'ico_logo.jpg';
    }

    // COLORES (CSS variables)
    if (org?.primary_color) {
      document.documentElement.style
        .setProperty('--brand-primary', org.primary_color);
    }

    if (org?.secondary_color) {
      document.documentElement.style
        .setProperty('--brand-secondary', org.secondary_color);
    }

  }

  ngOnInit(): void {
    this.formLoadedAt = Date.now();
    const slug = this.route.snapshot.paramMap.get('slug')!;

    this.organizationService
      .loadOrganization(slug)
      .subscribe(org => {
        this.organization = org;
        this.setBranding(org);
        this.loadServices(slug);
      });
  }

  loadServices(slug: string) {
    this.bookingService
      .getServices(slug)
      .subscribe((services: any) => {
        this.services = this.transformServices(services);
        this.servicesLoading = false;
      });
  }

  transformServices(services: ServiceModel[]): ServiceModel[] {
    return services.map(service => ({
      ...service,
      variants: service.variants.flatMap(variant => {
        if (variant.mode !== 'hybrid') {
          return {
            ...variant,
            originalVariantId: variant.id
          };
        }

        return [
          {
            ...variant,
            originalVariantId: variant.id,
            name: `${variant.name} — Presencial`,
            mode: 'presential'
          },

          {
            ...variant,
            originalVariantId: variant.id,
            name: `${variant.name} — En línea`,
            mode: 'online'
          }
        ];
      })
    }));
  }


  onVariantSelected(data: any) {
    this.selectedService = data.service;
    this.selectedVariant = data.variant;

    this.updateStep();

    setTimeout(() => {

      const el = document.getElementById('dateTimeSection');

      el?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });

    }, 300);
  }

  scrollToCustomer() {
    setTimeout(() => {
      const el = document.getElementById('customerSection');

      if (el) {
        el.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }, 300);
  }

  onDateSelected(date: Date) {
    this.selectedDate = date;
    this.updateStep();
  }

  onTimeSelected(slot: TimeSlot) {
    this.selectedTime = slot.time;
    this.staff_member_id = slot.staff_member_id;

    this.updateStep();

    if (this.selectedDate && this.selectedTime) {
      this.scrollToCustomer();
    }
  }

  onCustomerCompleted(data: any) {
    this.customerData = data;
    this.currentStep = 4;
    this.updateStep();

    setTimeout(() => {
      document.getElementById('booking-confirmation')
        ?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }

  updateStep() {
    if (!this.selectedVariant) {
      this.currentStep = 1;
      return;
    }

    if (this.selectedVariant && (!this.selectedDate || !this.selectedTime)) {
      this.currentStep = 2;
      return;
    }

    if (this.selectedVariant && this.selectedDate && this.selectedTime && !this.customerData) {
      this.currentStep = 3;
      return;
    }

    if (this.customerData) {
      this.currentStep = 4;
    }
  }

  goToConfirmation() {
    this.showConfirmation = true;

    setTimeout(() => {
      document.getElementById('booking-confirmation')?.scrollIntoView({
        behavior: 'smooth'
      });
    }, 50);
  }


  createBooking() {
    if (!this.organization) return;
    if (!this.selectedVariant || !this.selectedDate || !this.selectedTime) {
      return;
    }

    form_time: this.formLoadedAt
    this.isSubmitting = true;

    const slug = this.organization.slug;
    const phone = this.customerData.phone;

    const payload = {
      service_variant_id: this.selectedVariant.id,
      staff_member_id: this.staff_member_id,

      //date: this.selectedDate?.toISOString().split('T')[0],
      date: this.selectedDate?.toLocaleDateString('en-CA'),
      time: this.selectedTime,

      first_name: this.customerData.first_name,
      last_name: this.customerData.last_name,
      email: this.customerData.email,

      phone: phone ? {
        number: phone.nationalNumber,
        e164Number: phone.e164Number,
        countryCode: phone.countryCode,
        dialCode: phone.dialCode
      } : null,

      notes: this.customerData.notes,

      mode: this.selectedVariant.mode,

      // honeypot
      website: null,
      form_time: this.formLoadedAt
    };

    this.bookingService
      .createAppointment(slug, payload)
      .subscribe({

        next: () => {
          this.isSubmitting = false;
          this.bookingCompleted = true;

          setTimeout(() => {
            document.getElementById('booking-success')
              ?.scrollIntoView({ behavior: 'smooth' });
          }, 200);

        },
        error: (error) => {
          this.isSubmitting = false;

          console.error(error);
          const message = error.error?.message || error.message || 'Error inesperado';
          this.notify.error(message);

          /*if (error.status === 409) {
            this.notify.error(error.error?.message);
            return;
          }
          if (error.status === 422) {
            this.notify.error(error.error?.message ?? 'Datos inválidos');
            return;
          }
          this.notify.error('No se pudo crear la cita. Intenta nuevamente en algunos minutos.');*/

          //console.log('Full error', error);
          //console.log('Backend message', error.error?.message);
          //this.notify.error(error.error?.message ?? 'No se pudo crear la cita.');
        }

      });

  }

  resetBooking() {
    this.bookingCompleted = false;
    this.showConfirmation = false;

    this.selectedService = null;
    this.selectedVariant = null;
    this.selectedDate = null;
    this.selectedTime = null;
    this.customerData = null;

    this.currentStep = 1;

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

  }

  formatReviews(count?: number): string {
    if (!count) return '0';

    if (count >= 1000) {
      return (count / 1000).toFixed(1).replace('.0', '') + 'k';
    }

    return count.toString();
  }

}
