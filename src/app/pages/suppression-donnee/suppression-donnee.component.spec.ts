import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppressionDonneeComponent } from './suppression-donnee.component';

describe('SuppressionDonneeComponent', () => {
  let component: SuppressionDonneeComponent;
  let fixture: ComponentFixture<SuppressionDonneeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuppressionDonneeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuppressionDonneeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
