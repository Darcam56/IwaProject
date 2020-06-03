import { NgModule } from '@angular/core';

import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';

const MaterialComponents = [
  MatButtonModule,
  MatFormFieldModule
]

@NgModule({
  imports: [MaterialComponents],
  exports: [MaterialComponents],
  declarations: []
})
export class MaterialModule { }
