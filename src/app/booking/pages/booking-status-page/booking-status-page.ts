import { Component, OnInit, inject, computed } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import {
  LucideAngularModule,
  CalendarX2,
  PauseCircle,
  ShieldAlert
} from 'lucide-angular';

import { BookingContextService } from '../../../core/services/booking-context.service';
import { BusinessCatalogService } from '../../../core/services/business-catalog.service';

type BookingStatusType =
  | 'not-found'
  | 'disabled'
  | 'suspended';

interface StatusConfig {
  icon: any;
  title: string;
  description: string;
  buttonText: string;
  footerText: string;
  useOrganizationBranding: boolean;
}

@Component({
  selector: 'app-booking-status-page',
  imports: [LucideAngularModule],
  templateUrl: './booking-status-page.html',
  styleUrl: './booking-status-page.css',
})

export class BookingStatusPage implements OnInit {

  readonly CalendarX2 = CalendarX2;
  readonly PauseCircle = PauseCircle;
  readonly ShieldAlert = ShieldAlert;

  private bookingContext = inject(BookingContextService);
  public businessCatalogService = inject(BusinessCatalogService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  organization = this.bookingContext.organization();

  rombiBranding = true;

  slogan = 'La forma inteligente de agendar';
  logoUrl = 'ico_logo.jpg';
  orgName = '';

  status!: BookingStatusType;

  config!: StatusConfig;

  niche = this.organization?.business_niche ?? 'other';

  uiTerms = computed(() => ({
    appointments: {
      singular: this.businessCatalogService.getTerm(
        this.niche,
        'appointments',
        'singular',
        true
      ),

      plural: this.businessCatalogService.getTerm(
        this.niche,
        'appointments',
        'plural',
        true
      ),

      singularLower: this.businessCatalogService.getTerm(
        this.niche,
        'appointments',
        'singular'
      ),

      pluralLower: this.businessCatalogService.getTerm(
        this.niche,
        'appointments',
        'plural'
      )
    },
  }));

  ngOnInit() {

    this.detectStatus();
    this.buildPage();

  }

  detectStatus() {
    this.status =
      this.route.snapshot.url[1]?.path as BookingStatusType;
  }

  buildPage() {

    const configs: Record<BookingStatusType, StatusConfig> = {

      'not-found': {
        icon: this.CalendarX2,
        title: 'Página no encontrada',
        description:
          'Parece que este enlace no existe, fue removido o la agenda ya no está disponible.',
        buttonText: 'Conocer ROMBI',
        footerText: 'Tal vez el enlace cambió o ya no está disponible.',
        useOrganizationBranding: false
      },

      'disabled': {
        icon: this.PauseCircle,
        title: 'Agenda temporalmente pausada',
        description:
          this.organization?.online_booking_disabled_message ||
          `Estamos tomando una pequeña pausa.
Por el momento no estamos recibiendo nuevas ${this.uiTerms().appointments.pluralLower}.
Vuelve pronto.`,
        buttonText: 'Conocer ROMBI',
        footerText: 'Gracias por tu interés. Pronto volveremos a estar disponibles.',
        useOrganizationBranding: true
      },

      'suspended': {
        icon: this.ShieldAlert,
        title: 'Agenda no disponible',
        description:
          'Esta agenda no está disponible por el momento.',
        buttonText: 'Conocer ROMBI',
        footerText: 'Esta agenda no se encuentra disponible temporalmente.',
        useOrganizationBranding: false
      }
    };

    this.config = configs[this.status];

    if (
      this.config.useOrganizationBranding &&
      this.bookingContext.hasContext()
    ) {
      this.applyOrganizationBranding();
    }
  }

  applyOrganizationBranding() {

    this.rombiBranding = false;

    this.orgName =
      this.organization?.name ?? '';

    this.slogan =
      this.organization?.slogan ?? '';

    this.logoUrl =
      this.organization?.logo_url ?? this.logoUrl;
  }

  gotoHome() {

    this.bookingContext.clear();

    this.router.navigate([
      '/'
    ]);
  }


}
