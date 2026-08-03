export interface BookingRescheduleRequest {

    booking_date: string;

    booking_time: string;

    reason: string;

    note?: string | null;

}

export interface BookingRescheduleResponse {

    status: 'success';

    message: string;

}