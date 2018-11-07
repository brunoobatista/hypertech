import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FornecedoresNovoComponent } from './fornecedores-novo.component';

describe('FornecedoresNovoComponent', () => {
  let component: FornecedoresNovoComponent;
  let fixture: ComponentFixture<FornecedoresNovoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FornecedoresNovoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FornecedoresNovoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
