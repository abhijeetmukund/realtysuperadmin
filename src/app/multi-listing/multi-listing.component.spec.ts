import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiListingComponent } from './multi-listing.component';

describe('MultiListingComponent', () => {
  let component: MultiListingComponent;
  let fixture: ComponentFixture<MultiListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
