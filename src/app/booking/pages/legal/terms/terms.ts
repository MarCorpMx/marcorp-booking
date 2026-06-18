import { Component, OnInit, inject, HostListener } from '@angular/core';
import { RouterModule } from '@angular/router';

import {
  LucideAngularModule,
  ExternalLink
} from 'lucide-angular';

import { BookingContextService } from '../../../../core/services/booking-context.service';
import { BrandingService } from '../../../../core/services/branding.service';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-terms',
  imports: [RouterModule, LucideAngularModule],
  templateUrl: './terms.html',
  styleUrl: './terms.css',
})

export class Terms implements OnInit {

  readonly ExternalLink = ExternalLink;

  private bookingContext = inject(BookingContextService);
  private brandingService = inject(BrandingService);

  private appRombiURL = environment.appRombiURL;
  private supportWhatsapp = environment.supportWhatsapp;
  private bookingRombiURL = `${environment.bookingBaseUrl}/${environment.organizationRombi}`;

  loading = true;

  anioActual: number;
  fechaCompleta: Date;

  constructor() {
    this.fechaCompleta = new Date();
    this.anioActual = this.fechaCompleta.getFullYear();
  }

  ngOnInit() {
    // Eliminamos todo el contexto y branding de otras organizaciones
    this.bookingContext.clear();
    this.brandingService.reset();

    setTimeout(() => {
      this.loading = false;
    }, 300);


  }


  openWa(message: string, section: string) {
    if (section === 'contact') {
      message =
        `Hola.%0A%0A` +
        `Me interesa implementar ROMBI.%0A%0A` +
        `Tipo de negocio:%0A____________________%0A%0A` +
        `Número aproximado de colaboradores:%0A____________________%0A%0A` +
        `Gracias.`;

    }

    if (section === 'footer') {
      message =
        `Hola.%0A%0A` +
        `me interesa conocer más sobre ROMBI y saber si puede funcionar para mi negocio.%0A%0A` +
        `Gracias.`;
    }

    window.open(
      `https://wa.me/${this.supportWhatsapp}?text=${message}`,
      '_blank'
    );
  }

}
