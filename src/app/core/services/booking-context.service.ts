import { Injectable, signal, inject } from '@angular/core';

import { BrandingService } from './branding.service';

@Injectable({
  providedIn: 'root',
})

export class BookingContextService {

  private readonly STORAGE_KEY = 'rombi_booking_context';

  private branding = inject(BrandingService);

  // SIGNALS
  organization = signal<any | null>(null);

  branches = signal<any[]>([]);

  selectedBranch = signal<any | null>(null);


  constructor() {
    this.restore();
  }

  /*
  |----------------------------------------------------------
  | SET ORGANIZATION + BRANCHES
  |----------------------------------------------------------
  */
  setOrganization(data: any) {

    this.organization.set(data.organization);

    this.branches.set(data.branches ?? []);

    this.persist();

    // aplicar branding inmediatamente
    this.branding.apply(data.organization);
  }


  /*
  |----------------------------------------------------------
  | SET SELECTED BRANCH
  |----------------------------------------------------------
  */
  setSelectedBranch(branch: any) {

    this.selectedBranch.set(branch);

    this.persist();
  }


  /*
  |----------------------------------------------------------
  | GUARDAR EN LOCAL STORAGE
  |----------------------------------------------------------
  */
  private persist() {

    const data = {
      organization: this.organization(),
      branches: this.branches(),
      selectedBranch: this.selectedBranch()
    };

    localStorage.setItem(
      this.STORAGE_KEY,
      JSON.stringify(data)
    );
  }


  /*
  |----------------------------------------------------------
  | RESTAURAR CONTEXTO
  |----------------------------------------------------------
  */
  private restore() {

    const raw = localStorage.getItem(this.STORAGE_KEY);

    if (!raw) return;

    try {

      const data = JSON.parse(raw);

      this.organization.set(data.organization ?? null);

      this.branches.set(data.branches ?? []);

      this.selectedBranch.set(data.selectedBranch ?? null);

      // reaplicar branding al recargar
      if (data.organization) {
        this.branding.apply(data.organization);
      }

    } catch (error) {

      console.error('Error restoring booking context');

      this.clear();
    }
  }


  /*
  |----------------------------------------------------------
  | LIMPIAR CONTEXTO
  |----------------------------------------------------------
  */
  clear() {

    this.organization.set(null);

    this.branches.set([]);

    this.selectedBranch.set(null);

    localStorage.removeItem(this.STORAGE_KEY);
  }

  /*
  |----------------------------------------------------------
  | HELPERS
  |----------------------------------------------------------
  */

  hasContext(): boolean {
    return !!this.organization();
  }
}