import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from '../auth/token-storage.service';
import {Festival} from '../models/festival.model';
import {SpecService} from '../services/spec.service';
import {FestivalService} from '../services/festival.service';

@Component({
  selector: 'app-spec-festivals',
  templateUrl: './spec-festivals.component.html',
  styleUrls: ['./spec-festivals.component.css']
})
export class SpecFestivalsComponent implements OnInit {

  festList: Festival[];
  displayedColumns: string[] = ['Name', 'Descritpion', ''];

  constructor(private festivalService: FestivalService,
              private spectatorService: SpecService,
              private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    this.getFestivals();
  }

  getFestivals(): void{
    this.festivalService.getFestivals()
      .subscribe(festList => {
        this.festList = festList;
        console.log(this.festList);
      });
  }

  addFest(id: number) {
    this.spectatorService.linkSpecToFestival(this.tokenStorage.getUsername(), id);
  }
}
