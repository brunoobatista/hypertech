import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { ProdutosRoutingModule } from './produtos-routing.module';
import { ProdutosPesquisaComponent } from './produtos-pesquisa/produtos-pesquisa.component';
import { ProdutoCadastroComponent } from './produto-cadastro/produto-cadastro.component';

import { NgSelectModule } from '@ng-select/ng-select';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule, FormsModule,
    SharedModule,
    ProdutosRoutingModule,
    NgSelectModule,
  ],
    declarations: [ProdutosPesquisaComponent, ProdutoCadastroComponent]
})
export class ProdutosModule { }
