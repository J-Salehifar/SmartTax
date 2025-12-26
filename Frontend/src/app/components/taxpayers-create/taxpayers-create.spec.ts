import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxpayersCreate } from './taxpayers-create';

describe('TaxpayersCreate', () => {
  let component: TaxpayersCreate;
  let fixture: ComponentFixture<TaxpayersCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaxpayersCreate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaxpayersCreate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
