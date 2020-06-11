import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from '../auth/token-storage.service';
import {Festival} from '../models/festival.model';
import {FestivalService} from '../services/festival.service';
import {MatTableDataSource} from '@angular/material/table';
import {OrganiserService} from '../services/org.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {FormGroup} from '@angular/forms';
import {FestDialogComponent} from '../fest-dialog/fest-dialog.component';
import {ConfirmationDialogComponent} from '../confirmation-dialog/confirmation-dialog.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-org-fest',
  templateUrl: './org-fest.component.html',
  styleUrls: ['./org-fest.component.css']
})
export class OrgFestComponent implements OnInit {

  festList: Festival[];
  displayedColumns: string[] = ['Name', 'Description', 'Action'];
  dataSource: MatTableDataSource<any>;
  form: FormGroup;
  newFestival: Festival;

  constructor(private festivalService: FestivalService,
              private organiserService: OrganiserService,
              private tokenStorage: TokenStorageService,
              private dialog: MatDialog,
              private router: Router) { }

  ngOnInit(): void {
    this.getFestivals();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource.filterPredicate = (fest: Festival, filter: string) => {
      return fest.festivalName.toLowerCase().includes(filter);
    };
  }

  getFestivals(): void{
    this.organiserService.getFestivals(this.tokenStorage.getUsername())
      .subscribe(festList => {
        this.festList = festList;
        this.dataSource = new MatTableDataSource(this.festList);
      });
  }

  delFest(id: number) {
    const dialogConfig3 = new MatDialogConfig();

    dialogConfig3.disableClose = true;
    dialogConfig3.autoFocus = true;

    const dialogRef3 = this.dialog.open(ConfirmationDialogComponent, dialogConfig3);

    dialogRef3.afterClosed().subscribe(
      data => {
        if (data){
          this.festList = this.festList.filter( f => f.id !== id);
          this.dataSource = new MatTableDataSource(this.festList);
          this.festivalService.deleteFestival(id)
            .subscribe();
        }
      });
  }

  lookFestStages(fest: Festival){
    const route = this.router.config.find(r => r.path === 'orgStage/:id');
    route.data =  fest;
    this.router.navigate(['orgStage/' + fest.id]);
  }

  openDialogNew() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      title: 'Festival registration',
      festName: '',
      desc: ''
    };

    const dialogRef = this.dialog.open(FestDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        if (data){
          this.newFestival = new Festival(data.festivalName, data.description);
          this.organiserService.addFestivalToOrganiser(this.tokenStorage.getUsername(), this.newFestival)
            .subscribe(_ => this.getFestivals());
        }
      });
  }

  openDialogModify(fest: Festival) {

    const dialogConfig2 = new MatDialogConfig();

    dialogConfig2.disableClose = true;
    dialogConfig2.autoFocus = true;
    dialogConfig2.data = {
      title: 'Festival modification',
      festName: fest.festivalName,
      desc: fest.description
    };

    const dialogRef2 = this.dialog.open(FestDialogComponent, dialogConfig2);

    dialogRef2.afterClosed().subscribe(
      data => {
        if (data){
          const changesMap = new Map<string, string>();
          if (data.festivalName !== '') { changesMap.set('festivalName', data.festivalName); }
          if (data.description !== '') { changesMap.set('description', data.description); }

          this.festivalService.partialUpdateFestival(fest.id, changesMap)
            .subscribe(_ => this.getFestivals());
        }
      });
  }
}
