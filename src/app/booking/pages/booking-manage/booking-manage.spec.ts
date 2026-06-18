import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingManage } from './booking-manage';

describe('BookingManage', () => {
  let component: BookingManage;
  let fixture: ComponentFixture<BookingManage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingManage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingManage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
