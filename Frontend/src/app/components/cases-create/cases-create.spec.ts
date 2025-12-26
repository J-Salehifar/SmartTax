import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CasesCreate } from './cases-create';

describe('CasesCreate', () => {
  let component: CasesCreate;
  let fixture: ComponentFixture<CasesCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CasesCreate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CasesCreate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
