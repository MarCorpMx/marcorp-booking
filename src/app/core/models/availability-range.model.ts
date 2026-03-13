export interface AvailabilityDay {
  date: string;
  available: boolean;
  slots: number;
}

export interface AvailabilityRangeResponse {
  days: AvailabilityDay[];
}