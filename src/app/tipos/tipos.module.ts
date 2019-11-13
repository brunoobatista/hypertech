import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TiposRoutingModule } from './tipos-routing.module';
import { TiposPesquisaComponent } from './tipos-pesquisa/tipos-pesquisa.component';
import { TipoNovoComponent } from './tipo-novo/tipo-novo.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TiposRoutingModule,
    SharedModule,
  ],
  declarations: [TiposPesquisaComponent, TipoNovoComponent]
})
export class TiposModule { }
