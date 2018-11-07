import { AuthGuard } from '../seguranca/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FornecedoresPesquisaComponent } from './fornecedores-pesquisa/fornecedores-pesquisa.component';
import { FornecedoresNovoComponent } from './fornecedores-novo/fornecedores-novo.component';

const routes: Routes = [
  {
    path: '',
    component: FornecedoresPesquisaComponent,
    data: {
      title: 'Fornecedor',
      roles: ['ROLE_PESQUISAR_TIPO']
    },
    canActivate: [AuthGuard],
  },
  {
    path: 'novo',
    component: FornecedoresNovoComponent,
    data: {
      title: 'Fornecedor',
      roles: ['ROLE_CADASTRAR_TIPO']
    },
    canActivate: [AuthGuard],
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FornecedoresRoutingModule { }
