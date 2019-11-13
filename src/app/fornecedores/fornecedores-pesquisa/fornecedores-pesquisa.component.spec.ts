import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FornecedoresPesquisaComponent } from './fornecedores-pesquisa.component';

describe('FornecedoresPesquisaComponent', () => {
  let component: FornecedoresPesquisaComponent;
  let fixture: ComponentFixture<FornecedoresPesquisaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FornecedoresPesquisaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FornecedoresPesquisaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
