import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { TiposRoutingModule } from './tipos-routing.module';
import { TiposPesquisaComponent } from './tipos-pesquisa/tipos-pesquisa.component';
import { TipoNovoComponent } from './tipo-novo/tipo-novo.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TiposRoutingModule,
  ],
  declarations: [TiposPesquisaComponent, TipoNovoComponent]
})
export class TiposModule { }
