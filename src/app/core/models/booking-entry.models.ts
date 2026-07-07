export interface BookingOrganization {
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

    timezone: string;
}

export interface BookingPlan {
    key: string;

    is_free: boolean;
    is_internal: boolean;
}

export interface BookingBranchCard {
    id: number;

    name: string;
    slug: string;

    tagline: string | null;
    description_excerpt: string | null;

    location_label: string | null;

    is_primary: boolean;

    logo_url: string | null;
}

export interface BookingOrganizationEntryResponse {
    organization: BookingOrganization;

    plan: BookingPlan;

    branches: BookingBranchCard[];
}

// Modelos para {org-slug}/{branch-slug}
export interface BookingBranchLocation {

    country?: string | null;

    state?: string | null;

    city?: string | null;

    address?: string | null;

    maps_url?: string | null;
}

export interface BookingBranchContact {

    phone?: BookingPhone | null;

    whatsapp?: BookingPhone | null;

    email?: string | null;

    website?: string | null;

    social_links?: BookingSocialLinks | null;
}

export interface BookingPhone {

    number: string;

    internationalNumber: string;

    nationalNumber: string;

    e164Number: string;

    countryCode: string;

    dialCode: string;
}


export interface BookingSocialLinks {

    instagram?: string | null;

    facebook?: string | null;

    tiktok?: string | null;

    youtube?: string | null;

    x?: string | null;
}

export interface BookingBranchBranding {

    logo_url?: string | null;

    primary_color?: string | null;

    secondary_color?: string | null;
}


export interface BookingBranchStats {
    rating?: number | null;

    reviews_count?: number | null;
}

export interface BookingBranch {

    id: number;

    name: string;

    slug: string;

    tagline?: string | null;

    description?: string | null;

    is_primary: boolean;

    location: BookingBranchLocation;

    contact: BookingBranchContact;

    branding: BookingBranchBranding;

    stats: BookingBranchStats;

    metadata?: any | null;
}

export interface BookingOrganizationBranchResponse {
    organization: BookingOrganization;

    plan: BookingPlan;

    branch: BookingBranch;
}