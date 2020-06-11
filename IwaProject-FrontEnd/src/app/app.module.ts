import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { RegisterComponent } from './register/register.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TextFieldModule} from '@angular/cdk/text-field';
import { HttpClientModule} from '@angular/common/http';
import { httpInterceptorProviders } from './auth/auth-interceptor';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import {AppRoutingModule} from './app-routing.module';
import { BandConcertsComponent } from './band-concerts/band-concerts.component';
import { SpecFestivalsComponent } from './spec-festivals/spec-festivals.component';
import { SpecOwnFestivalsComponent } from './spec-own-festivals/spec-own-festivals.component';
import { OrgFestComponent } from './org-fest/org-fest.component';
import { NewFestDialogComponent } from './new-fest-dialog/new-fest-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    BandConcertsComponent,
    SpecFestivalsComponent,
    SpecOwnFestivalsComponent,
    OrgFestComponent,
    NewFestDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    TextFieldModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
