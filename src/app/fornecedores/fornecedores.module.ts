import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { FornecedoresNovoComponent } from './fornecedores-novo/fornecedores-novo.component';
import { FornecedoresPesquisaComponent } from './fornecedores-pesquisa/fornecedores-pesquisa.component';
import { FornecedoresRoutingModule } from './fornecedores-routing.module';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule, FormsModule,
    SharedModule,
    FornecedoresRoutingModule,
  ],
  declarations: [FornecedoresNovoComponent, FornecedoresPesquisaComponent]
})
export class FornecedoresModule { }
