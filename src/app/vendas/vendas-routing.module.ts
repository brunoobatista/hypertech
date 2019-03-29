import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './../seguranca/auth.guard';
import { VendaAvulsaComponent } from './venda-avulsa/venda-avulsa.component';

const routes: Routes = [
    {
        path: 'avulsa',
        component: VendaAvulsaComponent,
        data: {
            title: 'Venda Avulsa',
            roles: ['ROLE_CADASTRAR_TIPO'],
        },
        canActivate: [AuthGuard]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class VendasRoutingModule { }
