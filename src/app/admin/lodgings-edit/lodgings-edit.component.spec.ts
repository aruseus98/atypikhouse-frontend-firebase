import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LodgingsEditComponent } from './lodgings-edit.component';

describe('LodgingsEditComponent', () => {
  let component: LodgingsEditComponent;
  let fixture: ComponentFixture<LodgingsEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LodgingsEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LodgingsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
