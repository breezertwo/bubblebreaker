// https://en.wikipedia.org/wiki/Jawbreaker_(Windows_Mobile_game)

import React, { useState } from 'react';
import ReactDOM from 'react-dom'

import './assets/index.scss';
import "@fontsource/roboto";

import packageJSON from './../package.json'
import { Grid, GridType } from './gameElements/Grid';
import Score from './components/score';
import Toolbar from './components/toolbar';
import GameoverScreen from './components/gameover';
import GameGrid from './components/grid';

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

  const [grid, setGrid] = useState<GridType>(gridInstance.getGrid());
  const [score, setScore] = useState<number>(0);
  const [value, setValue] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);

  function onClick(e: HTMLElementEvent<HTMLElement>): void {

    const col = parseInt(e.target.parentElement?.id as string);
    const row = parseInt(e.target.id);
    const bubble = gridInstance.getElement(col, row);

    // If bubbles selected & not the first click --> Remove selection
    if (bubble?.color.indexOf('white') === -1 && toDelete) {
      gridInstance.getMatchingElements(toDelete[0][0] as number, toDelete[0][1] as number, 'white', oldColor)
      setGrid([...gridInstance.getGrid()]);
      isFirstClick = true;
    }

    // Frist click --> Make selection of neigbours with same color
    if(isFirstClick) {
      oldColor = bubble!.color;
      toDelete = gridInstance.getMatchingElements(col, row, oldColor, 'white')
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
      if (gridInstance.runGameEndCheck()) {
        setGameOver(true)
      }
      isFirstClick = true;
    }
  }

  function handleRefresh(): void {
    setGrid(gridInstance.getGrid(true))
    setValue(0);
    setScore(0);
    setGameOver(false)
  }

  return (
    <>
    <div className="mainContainer">
      <Score score={score} value={value} />
      <GameGrid grid={grid} onBubbleClick={e => onClick(e as unknown as HTMLElementEvent<HTMLElement>)} gridSize={[GRID_COL_LENGTH, GRID_ROW_LENGTH]}></GameGrid>
      <GameoverScreen show={true} grid={gridInstance.getGrid()} gridId={"XXXXXX"} score={score}/>
      <Toolbar onRefreshClick={handleRefresh}></Toolbar>
    </div>
    <div className="footer"><p>Version {packageJSON.version} by <a target="_blank" href="https://github.com/breezertwo/">{packageJSON.author}</a> | 2021</p></div>
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));