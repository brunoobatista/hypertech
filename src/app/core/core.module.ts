import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './../seguranca/token.interceptor';
import { FormsModule } from '@angular/forms';

import { BoxModule, TabsModule, DropdownModule } from 'angular-admin-lte';

import { JwtHelperService } from '@auth0/angular-jwt';
import { MasterHttp } from './../seguranca/master-http';

import { AuthService } from './../seguranca/auth.service';
import { TipoService } from './../tipos/tipo.service';

import { ErrorHandlerService } from './error-handler.service';


import { HeaderInnerComponent } from './header-inner/header-inner.component';
import { SidebarLeftInnerComponent } from './sidebar-left-inner/sidebar-left-inner.component';
import { SidebarRightInnerComponent } from './sidebar-right-inner/sidebar-right-inner.component';
import { NaoAutorizadoComponent } from './nao-autorizado.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DropdownModule,
    TabsModule,
    BoxModule,
    HttpClientModule,

  ],
  declarations: [HeaderInnerComponent, SidebarLeftInnerComponent, SidebarRightInnerComponent, NaoAutorizadoComponent],
  exports: [
    BoxModule, TabsModule, HeaderInnerComponent, SidebarLeftInnerComponent, SidebarRightInnerComponent
  ],
  providers: [
    ErrorHandlerService,
    AuthService,
    MasterHttp,
    JwtHelperService,
    TipoService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
  ]
})
export class CoreModule { }
