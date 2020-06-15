import { Component, OnInit } from '@angular/core';
import {Stage} from '../../models/stage.model';
import {MatTableDataSource} from '@angular/material/table';
import {FormGroup} from '@angular/forms';
import {StageService} from '../../services/stage.service';
import {TokenStorageService} from '../../auth/token-storage.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmationDialogComponent} from '../../dialogs/confirmation-dialog/confirmation-dialog.component';
import {Concert} from '../../models/concert.model';
import {ConcertService} from '../../services/concert.service';
import {BandService} from '../../services/band.service';
import {Band} from '../../models/band.model';
import {ConcertDialogComponent} from '../../dialogs/concert-dialog/concert-dialog.component';

@Component({
  selector: 'app-org-concert',
  templateUrl: './org-concert.component.html',
  styleUrls: ['./org-concert.component.css']
})
export class OrgConcertComponent implements OnInit {

  stage: Stage;
  concertList: Concert[];
  displayedColumns: string[] = ['bandName', 'startTime', 'duration', 'Action'];
  dataSource: MatTableDataSource<any>;
  form: FormGroup;
  newConcert: Concert;
  bands: Band[];

  constructor(private concertService: ConcertService,
              private stageService: StageService,
              private bandService: BandService,
              private tokenStorage: TokenStorageService,
              private dialog: MatDialog,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe((res) => {
        this.stage = new Stage(res.name);
        this.stage.id = res.id;
      },
      error => {
        console.log('ERROR', error);
      });
    this.getConcerts();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource.filterPredicate = (concert: Concert, filter: string) => {
      return concert.band.name.toLowerCase().includes(filter);
    };
  }

  getConcerts(): void{
    if (this.stage.id !== undefined) {
      this.stageService.getConcerts(this.stage.id)
        .subscribe(concerts => {
          this.concertList = concerts;
          this.dataSource = new MatTableDataSource(this.concertList);
        });
    }
  }

  getBands(): void {
    this.bandService.getBands()
      .subscribe(bands => {
        this.bands = bands;
      });
  }

  delConcert(id: number) {
    const dialogConfigDel = new MatDialogConfig();

    dialogConfigDel.disableClose = true;
    dialogConfigDel.autoFocus = true;

    const dialogRefDel = this.dialog.open(ConfirmationDialogComponent, dialogConfigDel);

    dialogRefDel.afterClosed().subscribe(
      data => {
        if (data){
          this.concertList = this.concertList.filter( c => c.id !== id);
          this.dataSource = new MatTableDataSource(this.concertList);
          this.concertService.deleteConcert(id)
            .subscribe();
        }
      });
  }

  openDialogNew() {
    const dialogConfigNew = new MatDialogConfig();

    dialogConfigNew.disableClose = true;
    dialogConfigNew.autoFocus = true;
    dialogConfigNew.data = {
      title: 'Concert registration',
      bandId: '',
      start: '',
      duration: ''
    };

    const dialogRefNew = this.dialog.open(ConcertDialogComponent, dialogConfigNew);

    dialogRefNew.afterClosed().subscribe(
      data => {
        if (data){
          data.startDate.setHours(data.startTime.slice(0, 2));
          data.startDate.setMinutes(data.startTime.slice(3, 5));
          data.startDate.setSeconds(0);

          const stringDate = (data.startDate.toLocaleString().slice(0, 11) +
                              data.startDate.toLocaleString().slice(13, 18))
                              .replace(/\//g, '-');
          this.newConcert = new Concert(stringDate, data.duration);

          this.stageService.addConcertInStage(this.stage.id, this.newConcert)
            .subscribe(_ => {
              this.stageService.getConcerts(this.stage.id)
                  .subscribe(concerts => {
                    this.concertService.linkConcertToBand(concerts[concerts.length - 1].id, data.bandId)
                      .subscribe(_ => this.getConcerts());
                  });
            });
        }
      });
  }

  openDialogModify(concert: Concert) {
    const dialogConfigModif = new MatDialogConfig();

    dialogConfigModif.disableClose = true;
    dialogConfigModif.autoFocus = true;
    dialogConfigModif.data = {
      title: 'Concert modification',
      bandId: concert.band.id,
      start: concert.start,
      duration: concert.duration
    };

    const dialogRefModif = this.dialog.open(ConcertDialogComponent, dialogConfigModif);

    dialogRefModif.afterClosed().subscribe(
      data => {
        if (data){
          const changesMap = new Map<string, string>();
          if (data.startDate !== '' || data.startTime !== '') {
            data.startDate.setHours(data.startTime.slice(0, 2));
            data.startDate.setMinutes(data.startTime.slice(3, 5));
            data.startDate.setSeconds(0);

            const stringDate = (data.startDate.toLocaleString().slice(0, 11) +
                                data.startDate.toLocaleString().slice(13, 18))
                                .replace(/\//g, '-');
            console.log(stringDate);
            changesMap.set('start', stringDate);
          }
          if (data.duration !== ''){
            changesMap.set('duration', data.duration);
          }
          if (data.bandId !== 0){
            changesMap.set('band', data.bandId);
          }
          this.concertService.partialUpdateConcert(concert.id, changesMap)
            .subscribe(_ => this.getConcerts());
        }
      });
  }
}
