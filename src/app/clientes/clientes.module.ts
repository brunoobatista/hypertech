import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { ClientesRoutingModule } from './clientes-routing.module';

import { ClientesPesquisaComponent } from './clientes-pesquisa/clientes-pesquisa.component';
import { ClienteCadastroComponent } from './cliente-cadastro/cliente-cadastro.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule, FormsModule,
    SharedModule,
    ClientesRoutingModule,
  ],
  declarations: [ClientesPesquisaComponent, ClienteCadastroComponent],
})
export class ClientesModule { }
