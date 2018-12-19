import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PackersMoversComponent } from './packers-movers.component';

describe('PackersMoversComponent', () => {
  let component: PackersMoversComponent;
  let fixture: ComponentFixture<PackersMoversComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PackersMoversComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PackersMoversComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
