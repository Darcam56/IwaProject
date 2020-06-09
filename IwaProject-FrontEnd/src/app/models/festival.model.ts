export class Festival{
  id: number;
  festivalName: string;
  description: string;

  constructor(id: number, festivalName: string, description: string) {
    this.id = id;
    this.festivalName = festivalName;
    this.description = description;
  }
}
