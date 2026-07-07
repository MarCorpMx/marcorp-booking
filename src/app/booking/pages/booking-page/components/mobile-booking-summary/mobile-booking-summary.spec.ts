import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileBookingSummary } from './mobile-booking-summary';

describe('MobileBookingSummary', () => {
  let component: MobileBookingSummary;
  let fixture: ComponentFixture<MobileBookingSummary>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobileBookingSummary]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MobileBookingSummary);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
