import React from 'react';
import { GridType } from '~/gameElements/Grid';
import Bubble from './bubble';

export interface GridProps {
  onBubbleClick?: (event: React.MouseEvent) => void;
  grid: GridType
  gridSize: number[];
}
 
const GameGrid: React.FC<GridProps> = ({ grid, onBubbleClick, gridSize }): JSX.Element => {

  return ( 
    <div className="gridContainer">
        {grid.map((col, colId) => {
          return col.size > 0 ? (
            <div className="collumn" id={colId.toString()} key={colId}>
              {Array.from(col.values()).map((bubble, rowId) => {
                return (
                  <Bubble onClick={onBubbleClick} id={((gridSize[1] - Array.from(col.values()).length) + rowId).toString()} bgColor={bubble.color} key={rowId}></Bubble>
                );
              })}
            </div>
          ) : (
            <div className="collumn" id={colId.toString()} key={colId}>
              <div className="bubblePlaceholder" />
            </div>
          );
        })}
      </div>
  );
}

 
export default GameGrid;