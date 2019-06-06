import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VendasRoutingModule } from './vendas-routing.module';
import { SharedModule } from '../shared/shared.module';

import { VendaAvulsaComponent } from './venda-avulsa/venda-avulsa.component';
import { InputProdutoComponent } from './input-produto/input-produto.component';
import { BoxSmallModule, BoxInfoModule } from 'angular-admin-lte';

import { NgSelectModule } from '@ng-select/ng-select';
import { VendasPesquisaComponent } from './vendas-pesquisa/vendas-pesquisa.component';
import { LabelStatusDirective } from './label-status/label-status.directive';
import { VendaShowComponent } from './venda-show/venda-show.component';
import { RouterArrayPipe } from '../shared/router-array.pipe';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    ReactiveFormsModule,
    VendasRoutingModule,
    SharedModule,
    RouterModule,

    BoxSmallModule,
    BoxInfoModule,
    NgSelectModule,

    BsDatepickerModule.forRoot(),
  ],
  declarations: [VendaAvulsaComponent, InputProdutoComponent, VendasPesquisaComponent, LabelStatusDirective, VendaShowComponent, RouterArrayPipe],
  providers: [
    {provide: LOCALE_ID, useValue: 'pt'},
    LabelStatusDirective
  ],
})
export class VendasModule { }
