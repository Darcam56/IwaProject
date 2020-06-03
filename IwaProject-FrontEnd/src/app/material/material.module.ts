import { NgModule } from '@angular/core';

import {MatButtonModule} from '@angular/material/button';
import { LoginComponent } from '../login/login.component';

const MaterialComponents = [
  MatButtonModule
]

@NgModule({
  imports: [MaterialComponents],
  exports: [MaterialComponents],
  declarations: [LoginComponent]
})
export class MaterialModule { }
