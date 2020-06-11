import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Festival} from '../models/festival.model';

@Component({
  selector: 'app-new-fest-dialog',
  templateUrl: './new-fest-dialog.component.html',
  styleUrls: ['./new-fest-dialog.component.css']
})
export class NewFestDialogComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<NewFestDialogComponent>) {

    this.form = fb.group({
      festivalName: [],
      description: []
    });

  }

  ngOnInit() {}

  save() {
    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }
}
