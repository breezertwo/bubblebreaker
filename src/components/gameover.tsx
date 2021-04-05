import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import { GridType } from '~/gameElements/Grid';
import { TextField } from '@material-ui/core';
import axios from 'axios';
import { getBase64GridString } from '~/util/io';
export interface GameoverScreenProps {
  show: boolean,
  grid: GridType,
  gridId: string
  score: number
}

enum STATUS {
  NOTSET = -1,
  SUCCESS = 1,
  ERROR = 0
}
 
const GameoverScreen: React.FC<GameoverScreenProps> = ({ show, grid, gridId, score }): JSX.Element | null => {

  const [playerName, setPlayerName] = useState<string>("");
  const [status, setStatus] = useState<STATUS>(STATUS.NOTSET);

  const handleTextFieldChanges =  (e: any) => {
    setPlayerName(e.target.value);
  }

  const onSubmitClicked = () => {
    const data = {
      grid: getBase64GridString(grid),
      gridId,
      userName: playerName,
      stats: [
        {
          player: playerName,
          score
        }
      ]
    }

    axios.post(`http://localhost:3030/game`, data)
      .then(res => {
        (res.status === 201) ? setStatus(STATUS.SUCCESS) : setStatus(STATUS.ERROR)
      })
  }

  useEffect(() => {
    if (show) {
      document.getElementsByClassName('gridContainer')[0].classList.add('blur');
    } else {
      document.getElementsByClassName('gridContainer')[0].classList.remove('blur');
      setStatus(STATUS.NOTSET)
    }
  }, [show]);

  return show ? (
    <div className="gameOver">
      <p className="gameOverText">GAME OVER</p>
      <div className="submitContainer">
        { status === STATUS.NOTSET ? (
          <>
            <TextField label="Enter Playername" value={playerName} onChange={handleTextFieldChanges} className="inputField"/>
            <Button onClick={onSubmitClicked}>
              Submit
            </Button>
          </> ) : status === STATUS.SUCCESS ? (
            <div>
              SUCESS
            </div>
          ) : (
            <div>
              ERROR
            </div>
          )
        }
      </div>
    </div>
  ) : null;
}

 
export default GameoverScreen;
