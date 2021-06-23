import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallResultComponent } from './small-result.component';

describe('SmallResultComponent', () => {
  let component: SmallResultComponent;
  let fixture: ComponentFixture<SmallResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmallResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmallResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
