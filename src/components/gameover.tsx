import React, { useEffect } from 'react';

export interface GameoverScreenProps {
  show: boolean
}
 
const GameoverScreen: React.FC<GameoverScreenProps> = ({ show }): JSX.Element | null => {

  useEffect(() => {
    if (show) document.getElementsByClassName('gridContainer')[0].classList.add('blur');
    else document.getElementsByClassName('gridContainer')[0].classList.remove('blur');
  }, [show]);

  return show ? ( 
    <p className="gameOver">GAME OVER</p>
  ) : null;
}

 
export default GameoverScreen;