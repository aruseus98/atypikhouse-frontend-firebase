import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LodgingFilterComponent } from './lodging-filter.component';

describe('LodgingFilterComponent', () => {
  let component: LodgingFilterComponent;
  let fixture: ComponentFixture<LodgingFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LodgingFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LodgingFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
