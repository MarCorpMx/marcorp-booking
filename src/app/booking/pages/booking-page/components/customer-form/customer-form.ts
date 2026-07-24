import { Component, Input, Output, EventEmitter, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';

import { NgxIntlTelInputModule, CountryISO, PhoneNumberFormat, SearchCountryField } from 'ngx-intl-tel-input';

import { NotificationService } from '../../../../../core/services/notification.service';
import { BUSINESS_NICHE_UI, BusinessNiche } from '../../../../../core/config/business-niche-ui';

import { BookingOrganization, BookingBranch } from '../../../../../core/models/booking-entry.models';
import { BookingServiceVariant } from '../../../../../core/models/booking-service.models';

import { BookingCustomerPayload } from '../../../../../core/models/booking-create.models';

@Component({
  selector: 'app-customer-form',
  imports: [CommonModule, ReactiveFormsModule, NgxIntlTelInputModule],
  templateUrl: './customer-form.html',
  styleUrl: './customer-form.css',
})

// el nuevo

export class CustomerForm implements OnInit {

  @Input({ required: true })
  organization!: BookingOrganization;

  @Input({ required: true })
  branch!: BookingBranch;

  @Input()
  businessNiche: string = 'other';

  @Input()
  variant!: BookingServiceVariant;

  @Output()
  formCompleted = new EventEmitter<any>();

  private fb = inject(FormBuilder);
  private notify = inject(NotificationService);

  ui = BUSINESS_NICHE_UI.other;

  form!: FormGroup;

  /* ngx-intl-tel-input config */
  PhoneNumberFormat = PhoneNumberFormat;
  CountryISO = CountryISO;
  SearchCountryField = SearchCountryField;

  preferredCountries: CountryISO[] = [
    CountryISO.Mexico,
    CountryISO.UnitedStates
  ];

  ngOnInit(): void {

    this.ui =
      BUSINESS_NICHE_UI[
      this.businessNiche as BusinessNiche
      ] ?? BUSINESS_NICHE_UI.other;

    this.buildForm();
  }

  private buildForm(): void {

    this.form = this.fb.group({

      first_name: [
        'Omar',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(100)
        ]
      ],

      last_name: [
        'Escobar',
        [
          Validators.maxLength(100)
        ]
      ],

      email: [
        'omar.lawliet90@gmail.com',
        [
          Validators.required,
          Validators.email,
          Validators.maxLength(150)
        ]
      ],

      /*phone: [
        null,
        Validators.required
      ],*/

      phone: [
        '7702021345',
        Validators.required
      ],

      notes: [
        'Es una prueba desde booking-publico',
        Validators.maxLength(500)
      ]

    });

    this.addBusinessFields();

  }

  private addBusinessFields(): void {

    switch (this.businessNiche) {

      case 'pet_grooming':

        this.form.addControl(
          'pet_name',
          this.fb.control('', [
            Validators.required,
            Validators.maxLength(100)
          ])
        );

        this.form.addControl(
          'pet_species',
          this.fb.control('', Validators.required)
        );

        this.form.addControl(
          'pet_species_custom',
          this.fb.control('')
        );

        this.form.addControl(
          'pet_breed',
          this.fb.control('')
        );

        this.form.addControl(
          'pet_birthdate',
          this.fb.control('')
        );

        this.form.addControl(
          'pet_gender',
          this.fb.control('')
        );

        this.form.addControl(
          'pet_weight',
          this.fb.control(0)
        );

        this.form.addControl(
          'pet_weight_unit',
          this.fb.control('kg')
        );

        break;

    }

  }

  submit(): void {

    if (this.form.invalid) {

      this.form.markAllAsTouched();

      this.scrollToFirstInvalid();

      this.notify.error('Completa los campos requeridos para poder continuar');

      return;

    }

    /*this.formCompleted.emit(
      this.form.getRawValue()
    );*/

    const value = this.form.getRawValue();

    const payload: BookingCustomerPayload = {

      first_name: value.first_name,
      last_name: value.last_name,
      email: value.email,
      phone: value.phone,
      notes: value.notes

    };

    if (this.businessNiche === 'pet_grooming') {

      payload.pet = {

        pet_name: value.pet_name,
        pet_species: value.pet_species,
        pet_species_custom: value.pet_species_custom,
        pet_breed: value.pet_breed,
        pet_birthdate: value.pet_birthdate,
        pet_gender: value.pet_gender,
        pet_weight: value.pet_weight,
        pet_weight_unit: value.pet_weight_unit

      };

    }

     this.formCompleted.emit(payload);

  }

  private scrollToFirstInvalid(): void {

    setTimeout(() => {

      const invalid = document.querySelector(
        '.ng-invalid[formControlName], ngx-intl-tel-input.ng-invalid'
      ) as HTMLElement;

      if (!invalid) return;

      invalid.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });

      const input = invalid.querySelector('input') as HTMLInputElement;

      if (input) {
        input.focus();
      } else {
        invalid.focus();
      }

    });

  }

  get isPetGrooming(): boolean {

    return this.businessNiche === 'pet_grooming';

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
