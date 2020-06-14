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
import { SpecFestivalsComponent } from './spectator-views/spec-festivals/spec-festivals.component';
import { SpecOwnFestivalsComponent } from './spectator-views/spec-own-festivals/spec-own-festivals.component';
import { OrgFestComponent } from './organiser-views/org-fest/org-fest.component';
import { FestDialogComponent } from './dialogs/fest-dialog/fest-dialog.component';
import { ConfirmationDialogComponent } from './dialogs/confirmation-dialog/confirmation-dialog.component';
import { OrgStageComponent } from './organiser-views/org-stage/org-stage.component';
import { StageDialogComponent } from './dialogs/stage-dialog/stage-dialog.component';
import { OrgConcertComponent } from './organiser-views/org-concert/org-concert.component';
import { ConcertDialogComponent } from './dialogs/concert-dialog/concert-dialog.component';
import {DatePipe} from '@angular/common';


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
    FestDialogComponent,
    ConfirmationDialogComponent,
    OrgStageComponent,
    StageDialogComponent,
    OrgConcertComponent,
    ConcertDialogComponent
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
  providers: [httpInterceptorProviders, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
