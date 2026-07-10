import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Checkout } from './checkout';

describe('Checkout', () => {
  let component: Checkout;
  let fixture: ComponentFixture<Checkout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Checkout],
    }).compileComponents();

    fixture = TestBed.createComponent(Checkout);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should apply the gold discount when the client code is ORO', () => {
    component.customerCode = 'ORO';

    component.applyCustomerCode();

    expect(component.discountRate).toBe(0.1);
    expect(component.discountLabel).toBe('Cliente Oro');
  });
});
