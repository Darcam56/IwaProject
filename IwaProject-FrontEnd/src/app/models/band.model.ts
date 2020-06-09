export class Band{
  id: number;
  name: string;
  musicType: string;
  desc: string;

  constructor(id: number, name: string, musicType: string, desc: string) {
    this.id =  id;
    this.name = name;
    this.musicType = musicType;
    this.desc = desc;
  }
}
