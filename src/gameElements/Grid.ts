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

    if (this.grid[col]) return this.grid[col].get(this.getRowKey(col, row));
    return undefined;
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

  public getMatchingElements(
    col: number,
    row: number,
    oldColor: string,
    newColor: string,
    deleteArray?: (number | string)[][]
  ): (number | string)[][] {
    if (!deleteArray) deleteArray = [];

    if (this.getElement(col, row)?.color === oldColor) {
      deleteArray.push([col, row, this.getRowKey(col, row)]);
      this.getElement(col, row)!.color = newColor;

      if (col + 1 < this.columns)
        this.getMatchingElements(col + 1, row, oldColor, newColor, deleteArray);

      if (col - 1 > -1)
        this.getMatchingElements(col - 1, row, oldColor, newColor, deleteArray);

      if (row + 1 < this.rows)
        this.getMatchingElements(col, row + 1, oldColor, newColor, deleteArray);

      if (row - 1 > -1)
        this.getMatchingElements(col, row - 1, oldColor, newColor, deleteArray);
    } else {
      return deleteArray;
    }

    return deleteArray;
  }

  public runGameEndCheck(): boolean {
    for (let r = this.rows - 1; r > -1; r--) {
      for (let c = 0; c < this.columns; c++) {
        const bubble = this.getElement(c, r);
        if (bubble) {
          if (this.getElement(c + 1, r))
            if (this.getElement(c + 1, r)?.color === bubble.color) return false;
          if (this.getElement(c, r + 1))
            if (this.getElement(c, r + 1)?.color === bubble.color) return false;
          if (this.getElement(c - 1, r))
            if (this.getElement(c - 1, r)?.color === bubble.color) return false;
          if (this.getElement(c, r - 1))
            if (this.getElement(c, r - 1)?.color === bubble.color) return false;
        }
      }
    }
    return true;
  }
}
