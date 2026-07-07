import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LucideAngularModule } from 'lucide-angular';
import { ICONS } from '../../../../../core/config/icons.config';

import { BookingService, BookingServiceVariant, BookingStaffMember } from '../../../../../core/models/booking-service.models';
import { BookingVariantSelection } from '../../../../../core/models/booking-selection.models';

import { ServicesSkeleton } from '../skeletons/services-skeleton/services-skeleton';

@Component({
  selector: 'app-service-selector',
  imports: [CommonModule, LucideAngularModule, ServicesSkeleton],
  templateUrl: './service-selector.html',
  styleUrl: './service-selector.css',
})

export class ServiceSelector {

  loading = true;

  icons = ICONS;

  expandedServiceId: number | null = null;

  selectedVariantId: number | null = null;

  hybridVariantId: number | null = null;
  selectedStaff: BookingStaffMember | null = null;

  pendingService: BookingService | null = null;
  pendingVariant: BookingServiceVariant | null = null;

  pendingStaff: BookingStaffMember | null = null;
  pendingMode: 'online' | 'presential' | null = null;

  staffSelectionVariant: BookingServiceVariant | null = null;

  staffSelectionService: BookingService | null = null;

  staffProfile: BookingStaffMember | null = null;

  private _services: BookingService[] = [];

  @Input() businessNiche: string | null = null;

  @Input()
  set services(value: BookingService[]) {

    this._services = value;

    if (value.length) {
      this.loading = false;
    }

    console.log('servicios llegaron:', JSON.stringify(value, null, 2));
  }

  @Output()
  variantSelected =
    new EventEmitter<BookingVariantSelection>(); // Regresa


  get services(): BookingService[] {
    return this._services;
  }


  toggleService(serviceId: number): void {

    this.expandedServiceId =
      this.expandedServiceId === serviceId
        ? null
        : serviceId;
  }


  selectVariant(
    service: BookingService,
    variant: BookingServiceVariant
  ): void {

    this.pendingService = service;
    this.pendingVariant = variant;

    this.selectedVariantId = variant.id;

    if (
      !variant.requires_staff_selection &&
      variant.mode !== 'hybrid'
    ) {
      this.finalizeSelection();
      return;
    }

    if (variant.mode === 'hybrid') {
      this.hybridVariantId = variant.id;
    }
  }

  canFinalize(): boolean {

    if (!this.pendingVariant) {
      return false;
    }

    const needsStaff =
      this.pendingVariant.requires_staff_selection;

    const needsMode =
      this.pendingVariant.mode === 'hybrid';

    if (needsStaff && !this.pendingStaff) {
      return false;
    }

    if (needsMode && !this.pendingMode) {
      return false;
    }

    return true;
  }

  private finalizeSelection(): void {

    if (!this.pendingService || !this.pendingVariant) {
      return;
    }

    this.selectedVariantId = this.pendingVariant.id;

    this.variantSelected.emit({

      service: this.pendingService,

      variant: this.pendingVariant,

      selectedMode: this.pendingMode ?? undefined,

      staffMember:
        this.pendingStaff ??
        this.pendingVariant.default_staff_member
    });

    // limpiar
    this.pendingService = null;
    this.pendingVariant = null;
    this.pendingStaff = null;
    this.pendingMode = null;
    this.hybridVariantId = null;
  }

  public emitSelection(
    service: BookingService,
    variant: BookingServiceVariant,
    selectedMode?: 'online' | 'presential',
    staffMember?: BookingStaffMember | null
  ): void {

    this.selectedVariantId = variant.id;

    this.variantSelected.emit({

      service,

      variant,

      selectedMode,

      staffMember:
        staffMember ??
        variant.default_staff_member

    });

  }

  openStaffSelector(
    service: BookingService,
    variant: BookingServiceVariant
  ): void {

    this.staffSelectionService = service;
    this.staffSelectionVariant = variant;

  }

  closeStaffModal(): void {

    this.staffSelectionVariant = null;

    this.staffSelectionService = null;

    this.selectedStaff = null;

  }

  selectStaff(staff: BookingStaffMember): void {

    this.pendingStaff = staff;

    this.closeStaffModal();

    if (this.canFinalize()) {
      this.finalizeSelection();
    }
  }

  selectHybridMode(
    mode: 'online' | 'presential'
  ): void {

    this.pendingMode = mode;

    if (this.canFinalize()) {
      this.finalizeSelection();
    }
  }

  needsModeSelection(
    variant: BookingServiceVariant
  ): boolean {

    return (
      this.pendingVariant?.id === variant.id
      &&
      variant.mode === 'hybrid'
      &&
      !this.pendingMode
    );
  }

  needsStaffSelection(
    variant: BookingServiceVariant
  ): boolean {

    return (
      this.pendingVariant?.id === variant.id
      &&
      variant.requires_staff_selection
      &&
      !this.pendingStaff
    );
  }


  // Para ver el perfil
  openStaffProfile(
    staff: BookingStaffMember | null
  ): void {

    if (!staff) {
      return;
    }

    this.staffProfile = staff;
  }

  closeStaffProfile(): void {
    this.staffProfile = null;
  }

  getStaffLabel(): string {
    switch (this.businessNiche) {

      case 'beauty':
        return 'Te atenderá';

      case 'barbershop':
        return 'Tu barbero será';

      case 'hair_salon':
        return 'Tu estilista será';

      case 'nails':
        return 'Tu especialista será';

      case 'psychology':
        return 'Tu sesión será con';

      case 'medical':
        return 'Te atenderá';

      case 'dentist':
        return 'Tu cita será con';

      case 'nutrition':
        return 'Tu consulta será con';

      case 'therapy':
        return 'Tu terapeuta será';

      case 'spa':
        return 'Tu experiencia será con';

      case 'fitness':
        return 'Tu coach será';

      case 'education':
        return 'Tu sesión será con';

      case 'consulting':
        return 'Tu asesor será';

      case 'coaching':
        return 'Tu coach será';

      case 'pet_grooming':
        return 'Atenderá a tu mascota';

      case 'tattoo':
        return 'Tu artista será';

      default:
        return 'Especialista asignado';
    }
  }

  getModeLabel(mode?: string): string {

    const modes: Record<string, string> = {

      hybrid: 'Híbrido',
      presential: 'Presencial',
      online: 'En línea',
      home_service: 'A domicilio',
      provider_home: 'En consultorio',
      phone_call: 'Llamada',
      onsite_business: 'En sitio'
    };

    return mode
      ? modes[mode] ?? mode
      : '';
  }

  getModeIcon(mode?: string) {

    if (
      mode === 'online'
      || mode === 'hybrid'
    ) {
      return this.icons.Monitor;
    }

    return this.icons.MapPin;
  }

}
