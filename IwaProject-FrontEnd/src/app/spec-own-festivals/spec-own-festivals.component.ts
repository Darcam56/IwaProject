import { Component, OnInit } from '@angular/core';
import {Festival} from '../models/festival.model';
import {SpecService} from '../services/spec.service';
import {TokenStorageService} from '../auth/token-storage.service';

@Component({
  selector: 'app-spec-own-festivals',
  templateUrl: './spec-own-festivals.component.html',
  styleUrls: ['./spec-own-festivals.component.css']
})
export class SpecOwnFestivalsComponent implements OnInit {

  festList: Festival[];
  displayedColumns: string[] = ['Name', 'Description', 'Cancel'];

  constructor(private spectatorService: SpecService,
              private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    this.getFestivals();
  }

  getFestivals(): void{
    this.spectatorService.getFests(this.tokenStorage.getUsername())
      .subscribe(festList => {
        this.festList = festList;
        console.log(this.festList);
      });
  }

  delFest(id: number) {
    this.festList = this.festList.filter( f => f.id !== id);
    this.spectatorService.unlinkSpecToFestival(this.tokenStorage.getUsername(), id)
      .subscribe( );
  }
}
