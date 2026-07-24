export interface PhoneApi {
    number: string;
    internationalNumber: string;
    nationalNumber: string;
    e164Number: string;
    countryCode: string;
    dialCode: string;
}

export interface BookingCustomer {

    first_name: string;

    last_name: string | null;

    email: string;

    phone: PhoneApi | null;

    notes: string | null;

}

export interface BookingPetData {

    pet_name: string;

    pet_species: string;

    pet_species_custom?: string | null;

    pet_breed?: string | null;

    pet_birthdate?: string | null;

    pet_gender?: string | null;

    pet_weight?: number | null;

    pet_weight_unit?: 'kg' | 'lb';

}

export interface BookingCustomerPayload
    extends BookingCustomer {

    pet?: BookingPetData;

}

export interface CreateBookingRequest {

    organization_slug: string;

    branch_slug: string;

    service_variant_id: number;

    staff_member_id: number | null;

    booking_date: string;

    booking_time: string;

    mode: 'online' | 'presential' | 'hybrid';

    customer: BookingCustomerPayload;

    /*
    |--------------------------------------------------------------------------
    | Anti Spam
    |--------------------------------------------------------------------------
    */

    website: string | null;

    form_time: number;

}

export interface CreateBookingResponse {

    message: string;

    appointment: {

        reference_code: string;

        status: string;

    };

}