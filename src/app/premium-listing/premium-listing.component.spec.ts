import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PremiumListingComponent } from './premium-listing.component';

describe('PremiumListingComponent', () => {
  let component: PremiumListingComponent;
  let fixture: ComponentFixture<PremiumListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PremiumListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PremiumListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
