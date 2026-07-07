import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesSkeleton } from './services-skeleton';

describe('ServicesSkeleton', () => {
  let component: ServicesSkeleton;
  let fixture: ComponentFixture<ServicesSkeleton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicesSkeleton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServicesSkeleton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
