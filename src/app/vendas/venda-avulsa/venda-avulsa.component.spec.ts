import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendaAvulsaComponent } from './venda-avulsa.component';

describe('VendaAvulsaComponent', () => {
  let component: VendaAvulsaComponent;
  let fixture: ComponentFixture<VendaAvulsaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendaAvulsaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendaAvulsaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
