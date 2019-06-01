import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { UsuariosRoutingModule } from './usuarios-routing.module';

import { UsuarioCadastroComponent } from './usuario-cadastro/usuario-cadastro.component';

@NgModule({
  declarations: [UsuarioCadastroComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule, FormsModule,
    SharedModule,
    UsuariosRoutingModule,
  ]
})
export class UsuariosModule { }
