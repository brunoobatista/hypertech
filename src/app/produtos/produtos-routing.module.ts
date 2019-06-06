import { AuthGuard } from '../seguranca/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProdutosPesquisaComponent } from './produtos-pesquisa/produtos-pesquisa.component';
import { ProdutoCadastroComponent } from './produto-cadastro/produto-cadastro.component';

const routes: Routes = [
  {
    path: '',
    component: ProdutosPesquisaComponent,
    data: {
      title: 'Produto',
      permissaos: ['READ_PRODUTO', 'WRITE_PRODUTO', 'FULL_PRODUTO']
    },
    canActivate: [AuthGuard],
  },
  {
    path: 'novo',
    component: ProdutoCadastroComponent,
    data: {
      permissaos: ['WRITE_PRODUTO', 'FULL_PRODUTO'],
      title: 'Produto'
    },
    canActivate: [AuthGuard],
  },
  {
    path: ':id',
    component: ProdutoCadastroComponent,
    data: {
      title: 'Produto',
      permissaos: ['WRITE_PRODUTO', 'FULL_PRODUTO'],
    },
    canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProdutosRoutingModule { }
