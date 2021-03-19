export interface Bubble {
  row?: number;
  col?: number;
  isEmpty?: boolean;
  color?: string;
  id: number;
}

export class BubbleElement implements Bubble {
  public isEmpty = false;
  public color: string;
  public col: number;
  public row: number;

  public id: number;

  private colors = ["#f102f3", "#f1f808", "#0103f5", "#02f108", "#e20002"];

  constructor(col: number, row: number, isEmpty?: boolean) {
    this.col = col;
    this.row = row;
    this.id = col * 21 + row + 1;
    this.color = this.colors[Math.floor(Math.random() * this.colors.length)];

    if (isEmpty) {
      this.isEmpty = isEmpty;
    }
  }
}
