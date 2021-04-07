interface Bubble {
  color: string;
  id: number;
}
export class BubbleElement implements Bubble {
  public color: string;
  public id: number;

  constructor(id: number, color?: string) {
    const colors = ["#f102f3", "#f1f808", "#0103f5", "#02f108", "#e20002"];

    this.id = id;
    this.color = color
      ? color
      : colors[Math.floor(Math.random() * colors.length)];
  }
}
