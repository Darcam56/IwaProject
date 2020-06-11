import { NgModule } from '@angular/core';
import {HomeComponent} from './home/home.component';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {BandConcertsComponent} from './band-concerts/band-concerts.component';
import {SpecFestivalsComponent} from './spec-festivals/spec-festivals.component';
import {SpecOwnFestivalsComponent} from './spec-own-festivals/spec-own-festivals.component';
import {OrgFestComponent} from './org-fest/org-fest.component';
import {OrgStageComponent} from './org-stage/org-stage.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'bandConcert', component: BandConcertsComponent },
  { path: 'specFest', component: SpecFestivalsComponent },
  { path: 'specOwnFest', component: SpecOwnFestivalsComponent },
  { path: 'orgFest', component: OrgFestComponent },
  { path: 'orgStage/:id', component: OrgStageComponent },
  { path: 'signup', component: RegisterComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
