import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-new-fest-dialog',
  templateUrl: './fest-dialog.component.html',
  styleUrls: ['./fest-dialog.component.css']
})
export class FestDialogComponent implements OnInit {

  form: FormGroup;
  title: string;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<FestDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data) {

    this.form = fb.group({
      festivalName: [data.festName],
      description: [data.desc]
    });

    this.title = data.title;

  }

  ngOnInit() {}

  save() {
    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }
}
