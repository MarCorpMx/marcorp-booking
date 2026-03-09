export interface OrganizationModel {
  id: number;
  name: string;
  slug: string;

  logo_url?: string;

  primary_color?: string;
  secondary_color?: string;

  timezone?: string;
}