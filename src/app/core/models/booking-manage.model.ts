export interface BookingManageResponse {

    status: 'success' | 'not_found';

    appointment: BookingManageAppointment | null;

}

export interface BookingManageAppointment {

    id: number;

    reference_code: string;

    status: string;

    date: string;

    time: string;

    end_time: string;

    mode: 'presential' | 'online' | 'hybrid';

    can_cancel: boolean;

    can_reschedule: boolean;

    service: BookingManageService;

    variant: BookingManageVariant;

    client: BookingManageClient;

    pet: BookingManagePet | null;

    staff: BookingManageStaff | null;

}

export interface BookingManagePet {

    id: number;

    name: string;

    species: string;

    species_custom: string | null;

    breed: string | null;

    gender: string | null;

    weight: string;

    weight_unit: string;

    birthdate: string | null;

}

export interface BookingManageService {

    name: string;

}

export interface BookingManageVariant {

    id: number;

    name: string;

    duration: number;

}

export interface BookingManageClient {

    first_name: string;

    last_name: string;

    email: string;

}

export interface BookingManageStaff {

    id: number;

    name: string;

}