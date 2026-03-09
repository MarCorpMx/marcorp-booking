export interface ServiceVariant {
  id: number;
  name: string;
  duration_minutes: number;
  price?: number;
}

export interface ServiceModel {
  id: number;
  name: string;
  description?: string;
  variants: ServiceVariant[];
}