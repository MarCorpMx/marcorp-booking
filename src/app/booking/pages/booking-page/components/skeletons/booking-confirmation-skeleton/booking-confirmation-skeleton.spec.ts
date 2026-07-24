import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingConfirmationSkeleton } from './booking-confirmation-skeleton';

describe('BookingConfirmationSkeleton', () => {
  let component: BookingConfirmationSkeleton;
  let fixture: ComponentFixture<BookingConfirmationSkeleton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingConfirmationSkeleton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingConfirmationSkeleton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
