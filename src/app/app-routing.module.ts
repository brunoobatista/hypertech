import { AuthGuard } from './seguranca/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { NaoAutorizadoComponent } from './core/nao-autorizado.component';

const routes: Routes = [
  {
    path: 'produtos',
    loadChildren: './produtos/produtos.module#ProdutosModule',
    data: {
      title: 'Produtos',
    },
  },
  {
    path: 'tipos',
    loadChildren: './tipos/tipos.module#TiposModule',
    data: {
      title: 'Tipos',
    },
  },
  {
    path: 'fornecedores',
    loadChildren: './fornecedores/fornecedores.module#FornecedoresModule',
    data: {
      title: 'Fornecedores',
    },
  },
  {
  path: '',
  data: {
      title: 'Dashboard'
  },
  canActivate: [AuthGuard],
  children: [
    {
      path: '',
      component: HomeComponent
    },

    ]
  },
  {
    path: 'login',
    loadChildren: './seguranca/seguranca.module#SegurancaModule',
    data: {
      customLayout: true
    }
  }, {
    path: 'register',
    loadChildren: './+register/register.module#RegisterModule',
    data: {
      customLayout: true
    }
  },
  {
    path: 'nao-autorizado',
    component: NaoAutorizadoComponent,
    data: {
      customLayout: true
    }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
