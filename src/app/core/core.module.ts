import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './../seguranca/token.interceptor';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { BoxModule, TabsModule, DropdownModule } from 'angular-admin-lte';
import { ToastyModule } from 'ng2-toasty';

import { JwtHelperService } from '@auth0/angular-jwt';
import { MasterHttp } from './../seguranca/master-http';

import { AuthService } from './../seguranca/auth.service';
import { TipoService } from './../tipos/tipo.service';
import { FornecedorService } from './../fornecedores/fornecedor.service';
import { CidadeService } from './../cidades/cidade.service';
import { ModalService } from './modal.service';
import { ClienteService } from '../clientes/cliente.service';
import { UsuariosService } from '../usuarios/usuarios.service';

import { ErrorHandlerService } from './error-handler.service';

import { HeaderInnerComponent } from './header-inner/header-inner.component';
import { SidebarLeftInnerComponent } from './sidebar-left-inner/sidebar-left-inner.component';
import { SidebarRightInnerComponent } from './sidebar-right-inner/sidebar-right-inner.component';
import { NaoAutorizadoComponent } from './nao-autorizado.component';
import { NaoEncontradoComponent } from './nao-encontrado.component';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ToastyModule.forRoot(),
    DropdownModule,
    TabsModule,
    BoxModule,
    HttpClientModule,
    RouterModule,
    SharedModule,
  ],
  declarations: [
    HeaderInnerComponent,
    SidebarLeftInnerComponent,
    SidebarRightInnerComponent,
    NaoAutorizadoComponent,
    NaoEncontradoComponent
  ],
  exports: [
    BoxModule,
    TabsModule,
    HeaderInnerComponent,
    SidebarLeftInnerComponent,
    SidebarRightInnerComponent,
    ToastyModule,
  ],
  providers: [
    ErrorHandlerService,
    AuthService,
    MasterHttp,
    JwtHelperService,

    TipoService,
    FornecedorService,
    CidadeService,

    ModalService,

    ClienteService,
    UsuariosService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
  ]
})
export class CoreModule { }
