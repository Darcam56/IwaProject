import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Festival} from '../../models/festival.model';
import {MatTableDataSource} from '@angular/material/table';
import {FormGroup} from '@angular/forms';
import {Stage} from '../../models/stage.model';
import {FestivalService} from '../../services/festival.service';
import {TokenStorageService} from '../../auth/token-storage.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {ConfirmationDialogComponent} from '../../dialogs/confirmation-dialog/confirmation-dialog.component';
import {StageService} from '../../services/stage.service';
import {StageDialogComponent} from '../../dialogs/stage-dialog/stage-dialog.component';

@Component({
  selector: 'app-org-stage',
  templateUrl: './org-stage.component.html',
  styleUrls: ['./org-stage.component.css']
})
export class OrgStageComponent implements OnInit {

  festival: Festival;
  stageList: Stage[];
  displayedColumns: string[] = ['Name', 'Action'];
  dataSource: MatTableDataSource<any>;
  form: FormGroup;
  newStage: Stage;

  constructor(private festivalService: FestivalService,
              private stageService: StageService,
              private tokenStorage: TokenStorageService,
              private dialog: MatDialog,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe((res) => {
        this.festival = new Festival(res.festivalName, res.description);
        this.festival.id = res.id;
      },
      error => {
        console.log('ERROR', error);
      });
    this.getStages();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource.filterPredicate = (stage: Stage, filter: string) => {
      return stage.name.toLowerCase().includes(filter);
    };
  }

  getStages(): void{
    if (this.festival.id !== undefined) {
      this.festivalService.getStages(this.festival.id)
        .subscribe(stages => {
          this.stageList = stages;
          this.dataSource = new MatTableDataSource(this.stageList);
        });
    }
  }

  delStage(id: number) {
    const dialogConfigDel = new MatDialogConfig();

    dialogConfigDel.disableClose = true;
    dialogConfigDel.autoFocus = true;

    const dialogRefDel = this.dialog.open(ConfirmationDialogComponent, dialogConfigDel);

    dialogRefDel.afterClosed().subscribe(
      data => {
        if (data){
          this.stageList = this.stageList.filter( s => s.id !== id);
          this.dataSource = new MatTableDataSource(this.stageList);
          this.stageService.deleteStage(id)
            .subscribe();
        }
      });
  }

  lookStageConcerts(stage: Stage) {
    console.log('look concerts : ' + stage.name);
  }

  openDialogNew() {
    const dialogConfigNew = new MatDialogConfig();

    dialogConfigNew.disableClose = true;
    dialogConfigNew.autoFocus = true;
    dialogConfigNew.data = {
      title: 'Stage registration',
      stageName: ''
    };

    const dialogRefNew = this.dialog.open(StageDialogComponent, dialogConfigNew);

    dialogRefNew.afterClosed().subscribe(
      data => {
        if (data){
          this.newStage = new Stage(data.stageName);
          this.festivalService.addStageInFestival(this.festival.id, this.newStage)
            .subscribe(_ => this.getStages());
        }
      });
  }

  openDialogModify(stage: Stage) {
    const dialogConfigModif = new MatDialogConfig();

    dialogConfigModif.disableClose = true;
    dialogConfigModif.autoFocus = true;
    dialogConfigModif.data = {
      title: 'Stage modification',
      stageName: stage.name
    };

    const dialogRefModif = this.dialog.open(StageDialogComponent, dialogConfigModif);

    dialogRefModif.afterClosed().subscribe(
      data => {
        if (data){
          const changesMap = new Map<string, string>();
          if (data.stageName !== '') { changesMap.set('name', data.stageName); }

          this.stageService.partialUpdateStage(stage.id, changesMap)
            .subscribe(_ => this.getStages());
        }
      });
  }
}
