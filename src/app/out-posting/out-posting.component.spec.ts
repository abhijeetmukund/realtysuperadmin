import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutPostingComponent } from './out-posting.component';

describe('OutPostingComponent', () => {
  let component: OutPostingComponent;
  let fixture: ComponentFixture<OutPostingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutPostingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutPostingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
