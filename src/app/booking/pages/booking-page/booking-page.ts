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

import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-booking-page',
  imports: [CommonModule, LucideAngularModule, StepperIndicator, BookingSummary, ServiceSelector,
    DateTimeSelector, CustomerForm, BookingConfirmation, BookingSuccess
  ],
  templateUrl: './booking-page.html',
  styleUrl: './booking-page.css',
})

export class BookingPage implements OnInit {
  readonly Star = Star;
  readonly MapPin = MapPin;

  organization?: OrganizationModel;
  services: ServiceModel[] = [];

  selectedService: any = null;
  selectedVariant: any = null;

  selectedDate: Date | null = null;
  selectedTime: string | null = null;

  currentStep = 1;
  showConfirmation = false;

  customerData: any = null;

  bookingCompleted = false;

  constructor(
    private route: ActivatedRoute,
    private organizationService: OrganizationService,
    private bookingService: BookingService,
    private title: Title
  ) { }

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
    const slug = this.route.snapshot.paramMap.get('slug')!;

    this.organizationService
      .loadOrganization(slug)
      .subscribe(org => {
        this.organization = org;
        this.setBranding(org); 
        this.loadServices(slug);

        console.log(org);
      });
  }

  loadServices(slug: string) {
    this.bookingService
      .getServices(slug)
      .subscribe((services: any) => {
        this.services = services;
      });
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

  onTimeSelected(time: string) {
    this.selectedTime = time;
    this.updateStep();

    if (this.selectedDate && this.selectedTime) {
      this.scrollToCustomer();
    }
  }

  onCustomerCompleted(data: any) {
    this.customerData = data;
    this.currentStep = 4;
    this.updateStep();

    console.log('el vato', data);

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

  /*
  createBooking() {
    const payload = {
      service_variant_id: this.selectedVariant.id,
      date: this.selectedDate,
      time: this.selectedTime,
      customer: {
        first_name: this.customerData.first_name,
        last_name: this.customerData.last_name,
        email: this.customerData.email,
        phone: this.customerData.phone
      }

    };

    this.bookingService.create(payload)
      .subscribe({
        next: (booking) => {
          this.bookingConfirmed = true;
          this.bookingData = booking;
        },
        error: () => {
          alert('Error al crear la cita');
        }
      });

  }*/

  createBooking() {

    this.bookingCompleted = true;

    setTimeout(() => {
      alert("falta la creacion");
      document.getElementById('booking-success')?.scrollIntoView({
        behavior: 'smooth'
      });
    }, 200);

    /*this.bookingService.createBooking({
      service_id: this.selectedService.id,
      variant_id: this.selectedVariant.id,
      date: this.selectedDate,
      time: this.selectedTime,
      customer: this.customerData
    }).subscribe({

      next: () => {

        this.bookingCompleted = true;

        setTimeout(() => {
          document.getElementById('booking-success')?.scrollIntoView({
            behavior: 'smooth'
          });
        }, 50);

      }

    });*/

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

}
