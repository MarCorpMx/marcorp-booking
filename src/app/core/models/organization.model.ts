export interface OrganizationModel {
  id: number;
  name: string;
  slug: string;

  logo_url?: string;

  country?: string;
  state?: string;
  city?: string;
  zip_code?: string;
  address?: string;

  theme_key?: string;
  primary_color?: string;
  secondary_color?: string;

  timezone?: string;

  rating?: number;
  reviews_count?: number;

  plan?: string;
}