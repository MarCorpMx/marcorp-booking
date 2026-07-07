import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateTimeSkeleton } from './date-time-skeleton';

describe('DateTimeSkeleton', () => {
  let component: DateTimeSkeleton;
  let fixture: ComponentFixture<DateTimeSkeleton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DateTimeSkeleton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DateTimeSkeleton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
