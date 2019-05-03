import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../seguranca/auth.guard';
import { ClientesPesquisaComponent } from './clientes-pesquisa/clientes-pesquisa.component';
import { ClienteCadastroComponent } from './cliente-cadastro/cliente-cadastro.component';

const routes: Routes = [
  {
    path: '',
    component: ClientesPesquisaComponent,
    data: {
      title: 'Cliente',
      roles: ['ROLE_PESQUISAR_TIPO']
    },
    canActivate: [AuthGuard],
  },
  {
    path: 'novo',
    component: ClienteCadastroComponent,
    data: {
      roles: ['ROLE_PESQUISAR_TIPO'],
      title: 'Cliente'
    },
    canActivate: [AuthGuard],
  },
  {
    path: ':id',
    component: ClienteCadastroComponent,
    data: {
      title: 'Cliente',
      roles: ['ROLE_CADASTRAR_TIPO']
    },
    canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientesRoutingModule { }
