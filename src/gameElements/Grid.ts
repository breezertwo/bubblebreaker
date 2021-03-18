import { BubbleField } from "./BubbleField";

export type GridType = Map<string, BubbleField>[];

export class Grid {
  private columns: number;
  private rows: number;

  private grid: GridType;

  constructor(columns: number, rows: number) {
    this.columns = columns;
    this.rows = rows;
    this.grid = this.makeGrid();
  }

  public makeGrid(): GridType {
    if (!this.grid) {
      console.log("Generating new grid...");
      const grid = [];

      for (let col = 0; col < this.columns; col++) {
        const map = new Map<string, BubbleField>();

        for (let row = 0; row < this.rows; row++) {
          map.set(row.toString(), new BubbleField(col, row));
        }

        grid.push(map);
      }
      this.grid = grid;
    }

    return this.grid;
  }

  public deleteElement(col: number, row: number): GridType {
    // console.log("Delete from: " + col + "|" + row);
    // Evtl auslagern in getRowKey()

    const pos = row - (this.rows - this.grid[col].size);

    let i = 0;
    for (var key of this.grid[col].keys()) {
      if (i === pos) this.grid[col].delete(key);
      ++i;
    }

    return this.grid;
  }

  public getGrid(): GridType {
    return this.grid;
  }
}
