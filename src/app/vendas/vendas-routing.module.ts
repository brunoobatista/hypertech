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
            roles: ['ROLE_CADASTRAR_TIPO'],
        },
        canActivate: [AuthGuard]
    },
    {
        path: 'nova',
        component: VendaAvulsaComponent,
        data: {
            title: 'Venda',
            roles: ['ROLE_CADASTRAR_TIPO'],
        },
        canActivate: [AuthGuard]
    },
    {
        path: ':id',
        component: VendaAvulsaComponent,
        data: {
            title: 'Venda',
        },
        canActivate: [AuthGuard]
    },
    {
        path: ':id/show',
        component: VendaShowComponent,
        data: {
            title: 'Visulização da Venda',
        },
        canActivate: [AuthGuard],
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class VendasRoutingModule { }
