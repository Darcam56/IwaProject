import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-stage-dialog',
  templateUrl: './stage-dialog.component.html',
  styleUrls: ['./stage-dialog.component.css']
})
export class StageDialogComponent implements OnInit {

  form: FormGroup;
  title: string;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<StageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data) {

    this.form = fb.group({
      stageName: [data.festName]
    });

    this.title = data.title;

  }

  ngOnInit(): void {}

  save() {
    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close(false);
  }
}
