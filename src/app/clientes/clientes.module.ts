import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientesPesquisaComponent } from './clientes-pesquisa/clientes-pesquisa.component';
import { ClienteCadastroComponent } from './cliente-cadastro/cliente-cadastro.component';

@NgModule({
  declarations: [ClientesPesquisaComponent, ClienteCadastroComponent],
  imports: [
    CommonModule
  ]
})
export class ClientesModule { }
