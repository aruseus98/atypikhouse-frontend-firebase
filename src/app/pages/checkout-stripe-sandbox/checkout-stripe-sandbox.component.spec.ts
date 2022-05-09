import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutStripeSandboxComponent } from './checkout-stripe-sandbox.component';

describe('CheckoutStripeSandboxComponent', () => {
  let component: CheckoutStripeSandboxComponent;
  let fixture: ComponentFixture<CheckoutStripeSandboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckoutStripeSandboxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutStripeSandboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
