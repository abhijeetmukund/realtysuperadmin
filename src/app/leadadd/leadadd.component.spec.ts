import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadaddComponent } from './leadadd.component';

describe('LeadaddComponent', () => {
  let component: LeadaddComponent;
  let fixture: ComponentFixture<LeadaddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeadaddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeadaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
