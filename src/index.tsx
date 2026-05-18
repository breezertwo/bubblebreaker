import { StrictMode, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';

import './assets/index.scss';

import packageJSON from './../package.json';
import { Grid, GridType } from './gameElements/Grid';
import Score from './components/score';
import Toolbar from './components/toolbar';
import GameoverScreen from './components/gameover';
import GameGrid from './components/grid';

const GRID_ROW_LENGTH = 20;
const GRID_COL_LENGTH = 12;

const gridInstance = new Grid(GRID_COL_LENGTH, GRID_ROW_LENGTH);

const App: React.FC = () => {
  const [grid, setGrid] = useState<GridType>(gridInstance.getGrid());
  const [score, setScore] = useState<number>(0);
  const [value, setValue] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);

  const isFirstClick = useRef(true);
  const oldColor = useRef('');
  const toDelete = useRef<(number | string)[][] | null>(null);

  function onClick(e: React.MouseEvent<HTMLDivElement>): void {
    if (!(e.target instanceof HTMLElement) || !e.target.parentElement?.id) return;
    const col = parseInt(e.target.parentElement.id);
    const row = parseInt(e.target.id);

    const bubble = gridInstance.getElement(col, row);

    // If bubbles selected & not the first click --> Remove selection
    if (bubble?.color.indexOf('white') === -1 && toDelete.current) {
      gridInstance.getMatchingElements(Number(toDelete.current[0][0]), Number(toDelete.current[0][1]), 'white', oldColor.current);
      setGrid([...gridInstance.getGrid()]);
      isFirstClick.current = true;
    }

    // Frist click --> Make selection of neigbours with same color
    if (isFirstClick.current) {
      oldColor.current = bubble!.color;
      toDelete.current = gridInstance.getMatchingElements(col, row, oldColor.current, 'white');
      if (toDelete.current.length > 1) {
        setValue(toDelete.current.length * (toDelete.current.length - 1));
        setGrid([...gridInstance.getGrid()]);
        isFirstClick.current = false;
      } else {
        bubble!.color = oldColor.current;
      }
    }

    // Second click --> Remove selected bubbles.
    else if (!isFirstClick.current && toDelete.current) {
      for (let ele of toDelete.current) {
        gridInstance.deleteElementByKey(Number(ele[0]), String(ele[2]));
      }
      setScore((prev) => prev + value);
      setValue(0);
      setGrid([...gridInstance.getGrid()]);
      if (gridInstance.runGameEndCheck()) {
        setGameOver(true);
      }
      isFirstClick.current = true;
    }
  }

  function handleRefresh(): void {
    setGrid(gridInstance.getGrid(true));
    setValue(0);
    setScore(0);
    setGameOver(false);
  }

  return (
    <>
      <div className='mainContainer'>
        <Score score={score} value={value} />
        <GameGrid grid={grid} onBubbleClick={onClick} gridSize={[GRID_COL_LENGTH, GRID_ROW_LENGTH]} blurred={gameOver}></GameGrid>
        <GameoverScreen show={gameOver} />
        <Toolbar onRefreshClick={handleRefresh}></Toolbar>
      </div>
      <div className='footer'>
        <p>
          Version {packageJSON.version} by{' '}
          <a target='_blank' href='https://github.com/breezertwo/'>
            {packageJSON.author}
          </a>{' '}
          | 2026
        </p>
      </div>
    </>
  );
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
