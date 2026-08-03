export interface AppointmentActionResponse {
  status:
  | 'confirmed'
  | 'cancelled'
  | 'expired'
  | 'already_used'
  | 'already_confirmed'
  | 'already_cancelled'
  | 'invalid_token';
}