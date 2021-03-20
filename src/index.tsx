// https://en.wikipedia.org/wiki/Jawbreaker_(Windows_Mobile_game)

import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom'

import './assets/index.scss';
import "@fontsource/roboto";

import Bubble from './components/bubble';
import { Grid, GridType } from './gameElements/Grid';
import Score from './components/score';
import Toolbar from './components/toolbar';

type HTMLElementEvent<T extends HTMLElement> = Event & {
  target: T; 
}

const GRID_ROW_LENGTH = 20
const GRID_COL_LENGTH = 12

const gridInstance = new Grid(GRID_COL_LENGTH, GRID_ROW_LENGTH);

let isFirstClick = true;
let oldColor = '';
let toDelete: (number | string)[][];

const App: React.FC = (): JSX.Element => {

  const container = useRef(null)
  const [grid, setGrid] = useState<GridType>(gridInstance.getGrid());
  const [score, setScore] = useState<number>(0);
  const [value, setValue] = useState<number>(0);

  function onClick(e: HTMLElementEvent<HTMLElement>): void {

    const col = parseInt(e.target.parentElement?.id as string);
    const row = parseInt(e.target.id);
    const bubble = gridInstance.getElement(col, row);

    // If bubbles selected & not the first click --> Remove selection
    if (bubble?.color.indexOf('white') === -1 && toDelete) {
      getMatchingElements(toDelete[0][0] as number, toDelete[0][1] as number, 'white', oldColor)
      setGrid([...gridInstance.getGrid()]);
      isFirstClick = true;
    }

    // Frist click --> Make selection of neigbours with same color
    if(isFirstClick) {
      oldColor = bubble!.color;
      toDelete = getMatchingElements(col, row, oldColor, 'white')
      if (toDelete.length > 1) {
        setValue(toDelete.length * ( toDelete.length - 1));
        setGrid([...gridInstance.getGrid()]);
        isFirstClick = false;
      } else {
        bubble!.color = oldColor;
      }
    }
   
    // Second click --> Remove selected bubbles.
    else if(!isFirstClick && toDelete) {
      for (let ele of toDelete) {
        gridInstance.deleteElementByKey(ele[0] as number, ele[2] as string);
      }
      setScore(score + value);
      setValue(0);
      setGrid([...gridInstance.getGrid()]);
      isFirstClick = true;
    }
  }

  function handleRefresh(): void {
    setGrid(gridInstance.getGrid(true))
    setValue(0);
    setScore(0);
  }

  return (
    <div className="mainContainer">
    <Score score={score} value={value} />
    <div ref={container} className="gridContainer">
      {grid.map((col, colId) => {
        return (
          <div className="collumn" id={colId.toString()} key={colId}>
            {Array.from(col.values()).map((bubble, rowId) => {
               return (
                <Bubble onClick={e => onClick(e as unknown as HTMLElementEvent<HTMLElement>)} id={((GRID_ROW_LENGTH - Array.from(col.values()).length) + rowId).toString()} bgColor={bubble.color} key={rowId}></Bubble>
              );
            })}
          </div>
        );
      })}
    </div>
    <Toolbar onRefreshClick={handleRefresh}></Toolbar>
    </div>
  )
}

function getMatchingElements(col: number, row: number, oldColor: string, newColor: string, deleteArray?: (number | string)[][]): (number | string)[][] {

  if(!deleteArray) deleteArray = [];

  if(gridInstance.getElement(col, row)?.color === oldColor){
      deleteArray.push([col, row, gridInstance.getRowKey(col, row)])
      gridInstance.getElement(col, row)!.color = newColor

      if(col + 1 < GRID_COL_LENGTH){
        getMatchingElements(col + 1, row,  oldColor, newColor, deleteArray);
      }

      if(col - 1 > -1) {
        getMatchingElements(col - 1, row,  oldColor, newColor, deleteArray);
      }

      if(row + 1 < GRID_ROW_LENGTH) {
        getMatchingElements(col, row + 1, oldColor, newColor, deleteArray);
      }

      if(row - 1 > -1) {
        getMatchingElements(col, row - 1,  oldColor, newColor, deleteArray);
      }
  } else {
    return deleteArray;
  }

  return deleteArray;

}

ReactDOM.render(<App />, document.getElementById('root'));