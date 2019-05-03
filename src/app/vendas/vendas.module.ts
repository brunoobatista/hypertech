import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VendasRoutingModule } from './vendas-routing.module';
import { SharedModule } from '../shared/shared.module';

import { VendaAvulsaComponent } from './venda-avulsa/venda-avulsa.component';
import { InputProdutoComponent } from './input-produto/input-produto.component';
import { BoxSmallModule } from 'angular-admin-lte';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    ReactiveFormsModule,
    VendasRoutingModule,
    SharedModule,
    RouterModule,

    BoxSmallModule
  ],
  declarations: [VendaAvulsaComponent, InputProdutoComponent],
  providers: [
    {provide: LOCALE_ID, useValue: 'pt'},
  ],
})
export class VendasModule { }
