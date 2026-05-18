export interface GameoverScreenProps {
  show: boolean;
}

const GameoverScreen: React.FC<GameoverScreenProps> = ({ show }) => {
  return show ? <p className='gameOver'>GAME OVER</p> : null;
};

export default GameoverScreen;
