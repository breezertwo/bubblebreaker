import React, { useRef } from 'react';
import ReactDOM from 'react-dom'
import './assets/index.scss';

import Bubble from './components/bubble';
import { Row, Column } from '@react-tiny-grid/core';


const GRID_ROW_LENGTH = 21
const GRID_COL_LENGTH = 13

const App = (): JSX.Element => {

  const ref = useRef(null);

  const grid = [];
  for (let row = 0; row < GRID_ROW_LENGTH; row++) {
    const currentRow = [];
    for (let col = 0; col < GRID_COL_LENGTH; col++) {
      currentRow.push({id: ((row * (GRID_COL_LENGTH)) + col + 1)});
    }
      grid.push(currentRow);
  }

  console.log(grid);

  return (
      <div ref={ref} className="mainContainer">
          {grid.map((row, rowId) => {
            return (
              <div className="row" key={rowId}>
                {row.map((node, nodeId) => {
                  console.log(node.id);
                  return (
                    <Bubble key={nodeId}></Bubble>
                  );
                })}
              </div>);
          })}
      </div>
  )
}



ReactDOM.render(<App />, document.getElementById('root'));