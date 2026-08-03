import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CenteredCardSkeleton } from './centered-card-skeleton';

describe('CenteredCardSkeleton', () => {
  let component: CenteredCardSkeleton;
  let fixture: ComponentFixture<CenteredCardSkeleton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CenteredCardSkeleton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CenteredCardSkeleton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
