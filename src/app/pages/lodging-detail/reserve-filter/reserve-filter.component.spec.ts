import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReserveFilterComponent } from './reserve-filter.component';

describe('ReserveFilterComponent', () => {
  let component: ReserveFilterComponent;
  let fixture: ComponentFixture<ReserveFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReserveFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReserveFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
