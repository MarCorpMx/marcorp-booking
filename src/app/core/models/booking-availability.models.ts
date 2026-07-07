export interface BookingAvailability {

    timezone: string;

    calendar: BookingCalendarDay[];

}

export interface BookingCalendarDay {

    date: string;

    day_of_week: number;

    enabled: boolean;

}

// Horarios
export interface BookingTimeSlot {

    time: string;

    available: boolean;

}