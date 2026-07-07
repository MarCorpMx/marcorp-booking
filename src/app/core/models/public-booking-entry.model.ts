export interface PublicBookingOrganization {


    id: number;
    name: string;
    slug: string;
    slogan: string | null;

    business_niche: string;

    status: string;
    online_booking_enabled: boolean;
    online_booking_disabled_message: string | null;

    onboarding_completed_at: string | null;

    logo_url: string | null; 

    theme_key: string | null;
    primary_color: string | null;
    secondary_color: string | null;
    white_label: boolean;

    rating?: number;
    reviews_count?: number;

    timezone: string;

    plan: string;

}

export interface PublicBookingBranch {

    id: number;

    name: string;

    slug: string;

    city?: string;

    is_primary: boolean;

}

export interface PublicBookingEntry {

    organization: PublicBookingOrganization;

    booking_enabled: boolean;

    branches: PublicBookingBranch[];

}