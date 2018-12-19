import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeDecoreComponent } from './home-decore.component';

describe('HomeDecoreComponent', () => {
  let component: HomeDecoreComponent;
  let fixture: ComponentFixture<HomeDecoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeDecoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeDecoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
