import { AuthGuard } from './seguranca/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { NaoAutorizadoComponent } from './core/nao-autorizado.component';
import { NaoEncontradoComponent } from './core/nao-encontrado.component';

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
    path: 'vendas',
    //loadChildren: './vendas/vendas.module#VendasModule',
    loadChildren: () => import('./vendas/vendas.module').then(mod => mod.VendasModule),
    data: {
      title: 'Vendas',
    }
  },

  {
    path: 'clientes',
    loadChildren: './clientes/clientes.module#ClientesModule',
    data: {
      title: 'Clientes',
    }
  },

  {
    path: 'usuarios',
    loadChildren: () => import('./usuarios/usuarios.module').then(mod => mod.UsuariosModule),
    data: {
      title: 'Usuários',
    }
  },


  {
  path: '',
  data: {
      title: 'Home',
      permissaos: ['READ_PRODUTO', 'READ_USUARIO', 'READ_CLIENTE', 'READ_FORNECEDOR', 'WRITE_PRODUTO', 'FULL_PRODUTO', 'FULL_USUARIO', 'FULL_VENDA', 'FULL_FORNECEDOR']
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
  {
    path: '**',
    component: NaoEncontradoComponent,
    data: {
      customLayout: true
    }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
