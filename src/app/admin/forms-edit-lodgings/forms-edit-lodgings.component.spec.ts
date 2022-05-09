import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsEditLodgingsComponent } from './forms-edit-lodgings.component';

describe('FormsEditLodgingsComponent', () => {
  let component: FormsEditLodgingsComponent;
  let fixture: ComponentFixture<FormsEditLodgingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormsEditLodgingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormsEditLodgingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
