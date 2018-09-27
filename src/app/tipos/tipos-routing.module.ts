import { AuthGuard } from './../seguranca/auth.guard';
import { TiposPesquisaComponent } from './tipos-pesquisa/tipos-pesquisa.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TipoNovoComponent } from './tipo-novo/tipo-novo.component';

const routes: Routes = [
  {
    path: '',
    component: TiposPesquisaComponent,
    data: {
      title: 'Tipo',
      roles: ['ROLE_PESQUISAR_TIPO']
    },
    canActivate: [AuthGuard],
  },
  {
    path: 'novo',
    component: TipoNovoComponent,
    data: {
      title: 'Tipo',
      roles: ['ROLE_CADASTRAR_TIPO']
    },
    canActivate: [AuthGuard],
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TiposRoutingModule { }
