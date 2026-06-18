import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationEntryPage } from './organization-entry-page';

describe('OrganizationEntryPage', () => {
  let component: OrganizationEntryPage;
  let fixture: ComponentFixture<OrganizationEntryPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrganizationEntryPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrganizationEntryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
