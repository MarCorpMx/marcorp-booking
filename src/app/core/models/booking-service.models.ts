export interface BookingStaffMember {
    id: number;
    name: string;
    title: string | null;
    specialty: string | null;
    bio: string | null;
    avatar: string | null;
}

export interface BookingServiceVariant {
    id: number;

    name: string;
    description: string | null;

    duration_minutes: number;

    price: string;

    /*mode:
    | 'presential'
    | 'online'
    | 'hybrid'
    | 'home_service'
    | 'provider_home'
    | 'phone_call'
    | 'onsite_business'
    | 'custom';*/
    mode: 
    | 'presential'
    | 'online'
    | 'hybrid';

    image_url: string | null;

    staff_members_count: number;

    requires_staff_selection: boolean;

    default_staff_member: BookingStaffMember | null;

    staff_members: BookingStaffMember[];
}

export interface BookingService {
    id: number;

    name: string;

    description: string | null;

    color: string | null;

    variants: BookingServiceVariant[];
}

export interface BookingServicesResponse {
    data: BookingService[];
}