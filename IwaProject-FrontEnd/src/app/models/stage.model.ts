import {Concert} from './concert.model';

export class Stage{
  id: number;
  name: string;
  concerts: Concert[];

  stage: Stage;

  constructor(id: number, name: string) {
    this.id =  id;
    this.name = name;
  }
}
