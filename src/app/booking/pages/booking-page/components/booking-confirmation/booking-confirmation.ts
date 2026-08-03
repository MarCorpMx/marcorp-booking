import { Component, Input, Output, EventEmitter, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LucideAngularModule } from 'lucide-angular';
import { ICONS } from '../../../../../core/config/icons.config';

import { NotificationService } from '../../../../../core/services/notification.service';

import { BookingService, BookingServiceVariant, BookingStaffMember } from '../../../../../core/models/booking-service.models';
import { BookingTimeSlot } from '../../../../../core/models/booking-availability.models';

@Component({
  selector: 'app-booking-confirmation',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './booking-confirmation.html',
  styleUrl: './booking-confirmation.css',
})

export class BookingConfirmation implements OnInit {

  icons = ICONS;

  @Input()
  service: BookingService | null = null;

  @Input()
  variant: BookingServiceVariant | null = null;

  @Input()
  selectedMode: 'online' | 'presential' | 'hybrid' | null = null;

  @Input()
  selectedStaff: BookingStaffMember | null = null;

  @Input()
  selectedDate: string | null = null;

  @Input()
  selectedTime: BookingTimeSlot | null = null;

  @Input()
  customer: any = null;

  @Input()
  businessNiche: string = 'other';

  @Input() loading = false;

  @Output() confirm =
    new EventEmitter<void>();


  private notify = inject(NotificationService);

  ngOnInit() {

    //console.log('Customer:', this.customer);

  }

  get isPetGrooming(): boolean {
    return this.businessNiche === 'pet_grooming';
  }

  getPetSpeciesName(species: string | null | undefined): string {

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

      case 'other': {

        const custom = this.customer?.pet.pet_species_custom?.trim();

        return custom
          ? custom
          : 'Otra (sin especificar)';

      }

      default:
        return 'Sin especificar';

    }

  }

  formatSelectedDate(): Date {
    return new Date(this.selectedDate + 'T00:00:00');
  }


  confirmBooking(): void {

    if (!this.loading) {
      this.confirm.emit();
    }

  }


}
