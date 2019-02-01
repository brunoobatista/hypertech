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
      roles: ['ROLE_PESQUISAR_TIPO']
    },
    canActivate: [AuthGuard],
  },
  {
    path: 'novo',
    component: ProdutoCadastroComponent,
    data: {
      roles: ['ROLE_PESQUISAR_TIPO'],
      title: 'Produto'
    },
    canActivate: [AuthGuard],
  },
  {
    path: ':id',
    component: ProdutoCadastroComponent,
    data: {
      title: 'Produto',
      roles: ['ROLE_CADASTRAR_TIPO']
    },
    canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProdutosRoutingModule { }
