import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VendasRoutingModule } from './vendas-routing.module';
import { SharedModule } from '../shared/shared.module';

import { VendaAvulsaComponent } from './venda-avulsa/venda-avulsa.component';
import { InputProdutoComponent } from './input-produto/input-produto.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    ReactiveFormsModule,
    VendasRoutingModule,
    SharedModule,
  ],
  declarations: [VendaAvulsaComponent, InputProdutoComponent],
  providers: [
    {provide: LOCALE_ID, useValue: 'pt'}
  ]
})
export class VendasModule { }
