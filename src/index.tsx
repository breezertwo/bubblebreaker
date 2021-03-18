// https://en.wikipedia.org/wiki/Jawbreaker_(Windows_Mobile_game)

import React, { useRef, useState } from 'react';
import ReactDOM from 'react-dom'
import './assets/index.scss';

import Bubble from './components/bubble';
import { BubbleField } from './gameElements/BubbleField';
import { Grid, GridType } from './gameElements/Grid';

type HTMLElementEvent<T extends HTMLElement> = Event & {
  target: T; 
}

const GRID_ROW_LENGTH = 20
const GRID_COL_LENGTH = 13

const gridInstance = new Grid(GRID_COL_LENGTH, GRID_ROW_LENGTH);

const App = (): JSX.Element => {

  const container = useRef(null)

  const [grid, setGrid] = useState<GridType>(gridInstance.getGrid());

  function onClick(e: HTMLElementEvent<HTMLElement>): void {

    const col = parseInt(e.target.parentElement?.id as string);
    const row = parseInt(e.target.id);

    setGrid([...gridInstance.deleteElement(col, row)]);

  }

  return (
    <div ref={container} className="mainContainer">
      {grid.map((col, colId) => {
        return (
          <div className="collumn" id={colId.toString()} key={colId}>
            {Array.from(col.values()).map((bubble, i) => {
               return (
                <Bubble onClick={e => onClick(e as unknown as HTMLElementEvent<HTMLElement>)} id={((GRID_ROW_LENGTH - Array.from(col.values()).length) + i).toString()} hasBubble={bubble.isEmpty} bgColor={bubble.color} key={i}></Bubble>
              );
            })}
          </div>
        );
      })}
    </div>
  )
}

function mod(n: number, m: number): number {
  return ((n % m) + m) % m;
}

ReactDOM.render(<App />, document.getElementById('root'));