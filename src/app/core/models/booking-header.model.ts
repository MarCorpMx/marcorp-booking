import { BookingSocialLinks, BookingBranchStats } from "./booking-entry.models";

export interface BookingHeaderActions {

  phone?: string | null;

  whatsapp?: string | null;

  website?: string | null;

  mapsUrl?: string | null;

  socialLinks?: BookingSocialLinks | null;
}


export interface BookingHeaderViewModel {

  logoUrl?: string | null;

  organizationName: string;

  branchName: string;

  subtitle: string;

  description: string;

  location?: string | null;

  stats?: BookingBranchStats | null;

  actions?: BookingHeaderActions | null;

  showRombiBranding: boolean;
}