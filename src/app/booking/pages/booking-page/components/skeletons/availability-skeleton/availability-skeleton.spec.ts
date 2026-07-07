import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailabilitySkeleton } from './availability-skeleton';

describe('AvailabilitySkeleton', () => {
  let component: AvailabilitySkeleton;
  let fixture: ComponentFixture<AvailabilitySkeleton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvailabilitySkeleton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvailabilitySkeleton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
