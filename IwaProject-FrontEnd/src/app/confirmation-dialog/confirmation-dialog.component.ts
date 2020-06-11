import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css']
})
export class ConfirmationDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<ConfirmationDialogComponent>) { }

  ngOnInit(): void {}

  exit(res: boolean){
    this.dialogRef.close(res);
  }
}
