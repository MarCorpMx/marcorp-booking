import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerFormSkeleton } from './customer-form-skeleton';

describe('CustomerFormSkeleton', () => {
  let component: CustomerFormSkeleton;
  let fixture: ComponentFixture<CustomerFormSkeleton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerFormSkeleton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerFormSkeleton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
