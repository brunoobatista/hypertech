import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { adminLteConf } from './admin-lte.conf';

import { CoreModule } from './core/core.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { LayoutModule } from 'angular-admin-lte';

import { HomeComponent } from './home/home.component';

import { LoadingPageModule, MaterialBarModule } from 'angular-loading-page';


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
    HomeComponent
  ],
  bootstrap: [AppComponent],
  providers: [

  ]
})
export class AppModule {}
