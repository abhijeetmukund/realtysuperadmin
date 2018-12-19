import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeMaintenanceComponent } from './home-maintenance.component';

describe('HomeMaintenanceComponent', () => {
  let component: HomeMaintenanceComponent;
  let fixture: ComponentFixture<HomeMaintenanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeMaintenanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
