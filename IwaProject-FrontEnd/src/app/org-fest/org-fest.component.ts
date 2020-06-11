import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from '../auth/token-storage.service';
import {Festival} from '../models/festival.model';
import {FestivalService} from '../services/festival.service';
import {MatTableDataSource} from '@angular/material/table';
import {OrganiserService} from '../services/org.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {FormGroup} from '@angular/forms';
import {FestDialogComponent} from '../fest-dialog/fest-dialog.component';

@Component({
  selector: 'app-org-fest',
  templateUrl: './org-fest.component.html',
  styleUrls: ['./org-fest.component.css']
})
export class OrgFestComponent implements OnInit {

  festList: Festival[];
  displayedColumns: string[] = ['Name', 'Descritpion', 'Remove'];
  dataSource: MatTableDataSource<any>;
  form: FormGroup;
  newFestival: Festival;

  constructor(private festivalService: FestivalService,
              private organiserService: OrganiserService,
              private tokenStorage: TokenStorageService,
              public dialog: MatDialog) { }

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
        console.log(this.festList);
      });
  }

  delFest(id: number) {
    // TODO PopUp
    this.festList = this.festList.filter( f => f.id !== id);
    this.dataSource = new MatTableDataSource(this.festList);
    this.festivalService.deleteFestival(id)
      .subscribe();
  }

  test(){
    console.log('Je suis la colonne appuyée');
  }

  openDialog() {

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
        console.log('Dialog output: ', data);
        this.newFestival = new Festival(data.festivalName, data.description);
        this.organiserService.addFestivalToOrganiser(this.tokenStorage.getUsername(), this.newFestival)
          .subscribe(_ => this.getFestivals());
      });
  }
}
