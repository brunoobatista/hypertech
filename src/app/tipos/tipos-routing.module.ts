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
      permissaos: ['READ_PRODUTO', 'WRITE_PRODUTO', 'FULL_PRODUTO']
    },
    canActivate: [AuthGuard],
  },
  {
    path: 'novo',
    component: TipoNovoComponent,
    data: {
      title: 'Tipo',
      permissaos: ['WRITE_PRODUTO', 'FULL_PRODUTO']
    },
    canActivate: [AuthGuard],
  },
  {
    path: ':id',
    component: TipoNovoComponent,
    data: {
      title: 'Tipo',
      permissaos: ['WRITE_PRODUTO', 'FULL_PRODUTO']
    },
    canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TiposRoutingModule { }
