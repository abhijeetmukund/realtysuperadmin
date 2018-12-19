import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateEnquireComponent } from './corporate-enquire.component';

describe('CorporateEnquireComponent', () => {
  let component: CorporateEnquireComponent;
  let fixture: ComponentFixture<CorporateEnquireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporateEnquireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateEnquireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
