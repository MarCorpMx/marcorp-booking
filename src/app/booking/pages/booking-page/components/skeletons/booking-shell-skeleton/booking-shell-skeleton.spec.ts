import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingShellSkeleton } from './booking-shell-skeleton';

describe('BookingShellSkeleton', () => {
  let component: BookingShellSkeleton;
  let fixture: ComponentFixture<BookingShellSkeleton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingShellSkeleton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingShellSkeleton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
