import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthGuard } from './auth.guard';

import { SegurancaRoutingModule } from './seguranca-routing.module';
import { LoginComponent } from './+login/login.component';

import { environment } from '../../environments/environment';

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  imports: [
    CommonModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: environment.tokenWhitelistedDomains,
        blacklistedRoutes: environment.tokenBlacklistedRoutes,
        authScheme: 'JWT '
      }
   }),
    SegurancaRoutingModule,
    FormsModule,
    RouterModule,

  ],
  declarations: [LoginComponent],
  providers: [
    AuthGuard
 ]
})
export class SegurancaModule { }
