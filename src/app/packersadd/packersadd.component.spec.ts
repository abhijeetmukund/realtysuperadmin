import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PackersaddComponent } from './packersadd.component';

describe('PackersaddComponent', () => {
  let component: PackersaddComponent;
  let fixture: ComponentFixture<PackersaddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PackersaddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PackersaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
