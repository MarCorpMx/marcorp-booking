import { BookingService, BookingServiceVariant, BookingStaffMember } from "./booking-service.models";

export interface BookingVariantSelection {

    service: BookingService;

    variant: BookingServiceVariant;

    selectedMode?: 'online' | 'presential';

    staffMember: BookingStaffMember | null;

}