import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingStatusPage } from './booking-status-page';

describe('BookingStatusPage', () => {
  let component: BookingStatusPage;
  let fixture: ComponentFixture<BookingStatusPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingStatusPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingStatusPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
