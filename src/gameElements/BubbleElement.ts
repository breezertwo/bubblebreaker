export interface Bubble {
  color: string;
  id: number;
}

export class BubbleElement implements Bubble {
  private colors = ["#f102f3", "#f1f808", "#0103f5", "#02f108", "#e20002"];

  public color: string;
  public id: number;

  constructor(id: number) {
    this.id = id;
    this.color = this.colors[Math.floor(Math.random() * this.colors.length)];
  }
}
