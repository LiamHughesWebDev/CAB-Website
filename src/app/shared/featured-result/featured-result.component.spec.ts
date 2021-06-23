import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedResultComponent } from './featured-result.component';

describe('FeaturedResultComponent', () => {
  let component: FeaturedResultComponent;
  let fixture: ComponentFixture<FeaturedResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeaturedResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeaturedResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
