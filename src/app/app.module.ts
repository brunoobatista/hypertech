import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { HttpModule } from '@angular/http';

import { registerLocaleData } from '@angular/common';
import localePT from '@angular/common/locales/pt';

import { adminLteConf } from './admin-lte.conf';
import { LayoutModule } from 'angular-admin-lte';
import { LoadingPageModule, MaterialBarModule } from 'angular-loading-page';

import { CoreModule } from './core/core.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HomeComponent } from './home/home.component';

registerLocaleData(localePT);

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    LayoutModule.forRoot(adminLteConf),
    CoreModule,
    LoadingPageModule, MaterialBarModule,
  ],
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  bootstrap: [AppComponent],
  providers: [
    {provide: LOCALE_ID, useValue: 'pt'}
  ]
})
export class AppModule {}
