import { Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BookingContextService } from '../../../../core/services/booking-context.service';
import { BrandingService } from '../../../../core/services/branding.service';

@Component({
  selector: 'app-cookies',
  imports: [RouterModule],
  templateUrl: './cookies.html',
  styleUrl: './cookies.css',
})
export class Cookies implements OnInit {

  private bookingContext = inject(BookingContextService);
  private brandingService = inject(BrandingService);

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
}
