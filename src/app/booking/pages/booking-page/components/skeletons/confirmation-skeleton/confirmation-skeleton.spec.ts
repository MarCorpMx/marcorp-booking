import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationSkeleton } from './confirmation-skeleton';

describe('ConfirmationSkeleton', () => {
  let component: ConfirmationSkeleton;
  let fixture: ComponentFixture<ConfirmationSkeleton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmationSkeleton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmationSkeleton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
