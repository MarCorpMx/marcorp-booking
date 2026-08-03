export interface BookingCancelRequest {

    reason: string;

    note?: string | null;

}

export interface BookingCancelResponse {

    status: 'success';

    message: string;

}