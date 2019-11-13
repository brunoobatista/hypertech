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
      permissaos: ['READ_CLIENTE', 'WRITE_CLIENTE', 'FULL_CLIENTE']
    },
    canActivate: [AuthGuard],
  },
  {
    path: 'novo',
    component: ClienteCadastroComponent,
    data: {
      title: 'Cliente',
      permissaos: ['WRITE_CLIENTE', 'FULL_CLIENTE']
    },
    canActivate: [AuthGuard],
  },
  {
    path: ':id',
    component: ClienteCadastroComponent,
    data: {
      title: 'Cliente',
      permissaos: ['WRITE_CLIENTE', 'FULL_CLIENTE']
    },
    canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientesRoutingModule { }
