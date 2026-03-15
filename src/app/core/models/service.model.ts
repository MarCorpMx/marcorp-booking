export type ServiceMode = 'hybrid' | 'presential' | 'online';

export interface ServiceVariant {
  id: number;
  originalVariantId?: number;
  name: string;
  duration_minutes: number;
  price?: number;
  mode?: ServiceMode;
}

export interface ServiceModel {
  id: number;
  name: string;
  description?: string;
  variants: ServiceVariant[];
}