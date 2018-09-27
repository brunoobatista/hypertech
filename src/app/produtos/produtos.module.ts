import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProdutosRoutingModule } from './produtos-routing.module';
import { ProdutosPesquisaComponent } from './produtos-pesquisa/produtos-pesquisa.component';
import { ProdutoCadastroComponent } from './produto-cadastro/produto-cadastro.component';

@NgModule({
  imports: [
    CommonModule,
    ProdutosRoutingModule
  ],
  declarations: [ProdutosPesquisaComponent, ProdutoCadastroComponent]
})
export class ProdutosModule { }
