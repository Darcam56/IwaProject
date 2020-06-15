import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from '../../auth/token-storage.service';
import {Festival} from '../../models/festival.model';
import {SpecService} from '../../services/spec.service';
import {FestivalService} from '../../services/festival.service';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-spec-festivals',
  templateUrl: './spec-festivals.component.html',
  styleUrls: ['./spec-festivals.component.css']
})
export class SpecFestivalsComponent implements OnInit {

  festList: Festival[];
  displayedColumns: string[] = ['Name', 'Descritpion', 'Order'];
  dataSource: MatTableDataSource<any>;

  constructor(private festivalService: FestivalService,
              private spectatorService: SpecService,
              private tokenStorage: TokenStorageService) { }

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
    this.festivalService.getFestivals()
      .subscribe(festList => {
        this.festList = festList;
        this.dataSource = new MatTableDataSource(this.festList);
      });
  }

  addFest(id: number) {
    this.spectatorService.linkSpecToFestival(this.tokenStorage.getUsername(), id)
      .subscribe();
  }
}
