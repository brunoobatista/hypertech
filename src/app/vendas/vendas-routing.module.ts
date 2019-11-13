import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './../seguranca/auth.guard';
import { VendaAvulsaComponent } from './venda-avulsa/venda-avulsa.component';
import { VendasPesquisaComponent } from './vendas-pesquisa/vendas-pesquisa.component';
import { VendaShowComponent } from './venda-show/venda-show.component';

const routes: Routes = [
    {
        path: '',
        component: VendasPesquisaComponent,
        data: {
            title: 'Vendas',
            permissaos: ['READ_VENDA', 'WRITE_VENDA', 'FULL_VENDA']
        },
        canActivate: [AuthGuard]
    },
    {
        path: 'nova',
        component: VendaAvulsaComponent,
        data: {
            title: 'Venda',
            permissaos: ['WRITE_VENDA', 'FULL_VENDA']
        },
        canActivate: [AuthGuard]
    },
    {
        path: ':id',
        component: VendaAvulsaComponent,
        data: {
            title: 'Venda',
            permissaos: ['WRITE_VENDA', 'FULL_VENDA']
        },
        canActivate: [AuthGuard]
    },
    {
        path: ':id/show',
        component: VendaShowComponent,
        data: {
            title: 'Visulização da Venda',
            permissaos: ['READ_VENDA', 'WRITE_VENDA', 'FULL_VENDA']
        },
        canActivate: [AuthGuard],
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class VendasRoutingModule { }
