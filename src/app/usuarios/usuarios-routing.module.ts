import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsuarioCadastroComponent } from './usuario-cadastro/usuario-cadastro.component';
import { AuthGuard } from '../seguranca/auth.guard';
import { UsuariosPesquisaComponent } from './usuarios-pesquisa/usuarios-pesquisa.component';

const routes: Routes = [
  {
    path: 'novo',
    component: UsuarioCadastroComponent,
    data: {
      title: 'Usuário',
      permissaos: ['WRITE_USUARIO', 'FULL_USUARIO']
    },
    canActivate: [AuthGuard]
  },
  {
    path: '',
    component: UsuariosPesquisaComponent,
    data: {
      title: 'Usuários',
      permissaos: ['READ_USUARIO', 'FULL_USUARIO']
    },
    canActivate: [AuthGuard]
  },
  /*{
    path: ':id',
    component: UsuarioCadastroComponent,
    data: {
      title: 'Usuário',
      permissaos: ['WRITE_USUARIO', 'FULL_USUARIO']
    },
    canActivate: [AuthGuard]
  }*/
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
