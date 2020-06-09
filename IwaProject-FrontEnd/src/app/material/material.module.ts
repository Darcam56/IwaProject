import { NgModule } from '@angular/core';

import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

const MaterialComponents = [
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatSnackBarModule,
  MatToolbarModule,
  MatIconModule,
  MatButtonToggleModule
]

@NgModule({
  imports: [MaterialComponents],
  exports: [MaterialComponents],
  declarations: []
})
export class MaterialModule { }
