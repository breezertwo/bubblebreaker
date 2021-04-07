import { BubbleElement } from "~/gameElements/BubbleElement";
import { GridType } from "~/gameElements/Grid";

function mapToJson(map: any) {
  return JSON.stringify([...map]);
}

function gridToJson(grid: GridType): any {
  const cols = grid.length;

  const gridArray = [];

  for (let c = 0; c < cols; c++) {
    gridArray.push(Array.from(grid[c].values()));
  }

  return mapToJson(gridArray);
}

export function getBase64GridString(grid: GridType): string {
  return btoa(gridToJson(grid));
}

export function loadGridFromBase64String(baseString: string): GridType {
  const jsonGrid = JSON.parse(atob(baseString));
  const grid = [];

  for (let col = 0; col < jsonGrid.length; col++) {
    const rowLength = jsonGrid[col].length;
    const map = new Map<string, BubbleElement>();

    for (let row = 0; row < rowLength; row++) {
      map.set(
        row.toString(),
        new BubbleElement(col * rowLength + row + 1, jsonGrid[col][row].color)
      );
    }

    grid.push(map);
  }

  return grid;
}
