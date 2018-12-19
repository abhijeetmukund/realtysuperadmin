import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PackerseditComponent } from './packersedit.component';

describe('PackerseditComponent', () => {
  let component: PackerseditComponent;
  let fixture: ComponentFixture<PackerseditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PackerseditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PackerseditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
