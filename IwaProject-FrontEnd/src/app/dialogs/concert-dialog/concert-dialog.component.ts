import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DatePipe} from '@angular/common';
import {Band} from '../../models/band.model';
import {BandService} from '../../services/band.service';

@Component({
  selector: 'app-concert-dialog',
  templateUrl: './concert-dialog.component.html',
  styleUrls: ['./concert-dialog.component.css']
})
export class ConcertDialogComponent implements OnInit {

  form: FormGroup;
  title: string;
  bands: Band[];

  constructor(
    private bandService: BandService,
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private dialogRef: MatDialogRef<ConcertDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data) {

    if (data.start !== ''){
      const stringSlicedData = data.start.slice(6, 10) + '/' + data.start.slice(3, 5) + '/' + data.start.slice(0, 2);

      this.form = fb.group({
        bandName: [data.bandName],
        startDate: [new Date(stringSlicedData)],
        startTime: [data.start.slice(12, 16)],
        duration: [data.duration]
      });
    } else {
      this.form = fb.group({
        bandName: [],
        startDate: [],
        startTime: [],
        duration: []
      });
    }

    this.title = data.title;

  }

  ngOnInit(): void {
    this.bandService.getBands()
      .subscribe(bands => this.bands = bands);
  }

  save() {
    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close(false);
  }

  updateBands(){
    // Modify the dateString
    let dateString = this.form.value.startDate.toLocaleDateString();
    const rx = /\//gi;
    dateString = dateString.replace(rx, '-');

    this.bandService.getFreeBands(dateString)
      .subscribe(bands => {
         this.bands = bands;
         console.log(bands);
      });
  }

}
