import {Stage} from './stage.model';
import {Band} from './band.model';

export class Concert{
  id: number;
  start: Date;
  duration: Date;
  band: Band;
  stage: Stage;

  constructor(id: number, start: Date, duration: Date) {
    this.id =  id;
    this.start =  start;
    this.duration =  duration;
  }
}
