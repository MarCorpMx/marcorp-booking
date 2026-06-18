import { Component, Output, EventEmitter, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NgxIntlTelInputModule, CountryISO, PhoneNumberFormat, SearchCountryField } from 'ngx-intl-tel-input';

@Component({
  selector: 'app-customer-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgxIntlTelInputModule],
  templateUrl: './customer-form.html',
  styleUrl: './customer-form.css',
})

export class CustomerForm implements OnInit {

  @Output() formCompleted = new EventEmitter<any>();
  form!: FormGroup;

  /* ngx-intl-tel-input config */
  PhoneNumberFormat = PhoneNumberFormat;
  CountryISO = CountryISO;

  preferredCountries: CountryISO[] = [
    CountryISO.Mexico,
    CountryISO.UnitedStates
  ];

  SearchCountryField = SearchCountryField;


  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      first_name: ['Omar', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100)
      ]],

      last_name: ['Antunez', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100)
      ]],

      email: ['omar.marcorp@gmail.com', [
        Validators.required,
        Validators.email,
        Validators.maxLength(150)
      ]],

      //phone: [null, Validators.required],
      phone: ['7702021345', Validators.required],

      notes: ['']
    });
  }


  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.formCompleted.emit(this.form.value);
  }

  getError(control: string): string | null {
    const c = this.form.get(control);
    if (!c || !c.touched || !c.errors) return null;
    if (c.errors['required']) return 'Campo obligatorio';
    if (c.errors['email']) return 'Email inválido';
    if (c.errors['minlength']) return 'Debe tener al menos 2 caracteres';
    return null;
  }
}
