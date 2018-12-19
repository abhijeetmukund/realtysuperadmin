import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FreeListingComponent } from './free-listing.component';

describe('FreeListingComponent', () => {
  let component: FreeListingComponent;
  let fixture: ComponentFixture<FreeListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FreeListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FreeListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
