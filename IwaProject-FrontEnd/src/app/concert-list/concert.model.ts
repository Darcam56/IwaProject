import {Stage} from '../stage-list/stage.model';
import {BandComponent} from '../band/band.component';

export class Concert{
  id: number;
  start: Date;
  duration: Date;
  band: BandComponent;
  stage: Stage;

  constructor(id: number, start: Date, duration: Date) {
    this.id =  id;
    this.start =  start;
    this.duration =  duration;
  }
}
