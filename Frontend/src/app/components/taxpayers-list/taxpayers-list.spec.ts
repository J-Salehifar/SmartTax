import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxpayersList } from './taxpayers-list';

describe('TaxpayersList', () => {
  let component: TaxpayersList;
  let fixture: ComponentFixture<TaxpayersList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaxpayersList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaxpayersList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
