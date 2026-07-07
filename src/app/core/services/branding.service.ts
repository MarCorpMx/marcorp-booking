import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { PublicBookingOrganization } from '../models/public-booking-entry.model';

//import { BookingOrganizationEntryResponse } from '../models/booking-entry.models';

@Injectable({
  providedIn: 'root',
})

export class BrandingService {

  constructor(private title: Title) { }

  apply(org?: PublicBookingOrganization) {

    this.reset();

    if (!org) return;

    // SI ES FREE -> NO APLICAR BRANDING
    if (org?.plan === 'free') return;

    // Si ESTA INACTIVA  O NO HA TERMINADO ONBOARDING-> NO APLICAR BRANDING
    if(!org.onboarding_completed_at) return;

    if(org.status !== 'active') return;

    // TITLE
    const title = org?.name
      ? `${org.name} | Agenda`
      : 'ROMBI | Agenda de Citas Online para Negocios | by MarCorp';

    this.title.setTitle(title);

    // FAVICON
    const favicon = document.getElementById('app-favicon') as HTMLLinkElement;

    if (favicon) {
      favicon.href = org?.logo_url ?? 'ico_logo.jpg';
    }

    // COLORES
    if (org?.primary_color) {
      document.documentElement.style
        .setProperty('--brand-primary', org.primary_color);
    }

    if (org?.secondary_color) {
      document.documentElement.style
        .setProperty('--brand-secondary', org.secondary_color);
    }
  }

  reset() {

    this.title.setTitle(
      'ROMBI | Agenda de Citas Online para Negocios | by MarCorp'
    );

    const favicon =
      document.getElementById('app-favicon') as HTMLLinkElement;

    if (favicon) {
      favicon.href = 'ico_logo.jpg';
    }

    document.documentElement.style.removeProperty('--brand-primary');
    document.documentElement.style.removeProperty('--brand-secondary');
    document.documentElement.style.removeProperty('--brand-bg');
    document.documentElement.style.removeProperty('--brand-text');
  }

}
