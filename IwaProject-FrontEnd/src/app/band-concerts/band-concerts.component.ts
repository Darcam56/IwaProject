import { Component, OnInit } from '@angular/core';
import {Concert} from '../models/concert.model';
import {BandService} from '../services/band.service';
import {TokenStorageService} from '../auth/token-storage.service';

@Component({
  selector: 'app-band-concerts',
  templateUrl: './band-concerts.component.html',
  styleUrls: ['./band-concerts.component.css']
})
export class BandConcertsComponent implements OnInit {
  concertList: Concert[];
  displayedColumns: string[] = ['Festival', 'Date', 'Duration'];

  constructor(private bandService: BandService,
              private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    this.getConcerts();
  }

  getConcerts(): void{
    this.bandService.getConcerts(this.tokenStorage.getUsername())
      .subscribe(concertList => {
        this.concertList = concertList;
        console.log(this.concertList);
      });
  }
}
