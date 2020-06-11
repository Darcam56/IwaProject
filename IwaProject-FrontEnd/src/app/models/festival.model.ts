export class Festival{
  id: number;
  festivalName: string;
  description: string;

  constructor(festivalName: string, description: string) {
    this.festivalName = festivalName;
    this.description = description;
  }
}
