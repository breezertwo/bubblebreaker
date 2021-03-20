import { BubbleElement } from "./BubbleElement";

export type GridType = Map<string, BubbleElement>[];

export class Grid {
  private columns: number;
  private rows: number;

  private grid: GridType;

  constructor(columns: number, rows: number) {
    this.columns = columns;
    this.rows = rows;
    this.grid = this.getGrid();
  }

  public getGrid(drop?: boolean): GridType {
    if (!this.grid || drop) {
      console.log("Generating new grid...");
      const grid = [];

      for (let col = 0; col < this.columns; col++) {
        const map = new Map<string, BubbleElement>();

        for (let row = 0; row < this.rows; row++) {
          map.set(row.toString(), new BubbleElement(col * this.rows + row + 1));
        }

        grid.push(map);
      }
      this.grid = grid;
    }

    return this.grid;
  }

  public deleteElement(col: number, row: number): GridType {
    // console.log("Delete from: " + col + "|" + row);

    this.grid[col].delete(this.getRowKey(col, row));

    return this.grid;
  }

  public deleteElementByKey(col: number, key: string): GridType {
    this.grid[col].delete(key);

    return this.grid;
  }

  public getElement(col: number, row: number): BubbleElement | undefined {
    // console.log("Get from: " + col + "|" + row);

    return this.grid[col].get(this.getRowKey(col, row));
  }

  public getRowKey(col: number, row: number): string {
    const pos = row - (this.rows - this.grid[col].size);

    let i = 0;
    for (const key of this.grid[col].keys()) {
      if (i === pos) return key;
      i++;
    }

    return (-1).toString();
  }
}
