import React from 'react';

export interface ScoreProps {
  score: number,
  value: number
}
 
const Score: React.FC<ScoreProps> = ({ score, value }): JSX.Element => {

  return (
    <div className="scoreBoard">
      <div className="score">Score: {score}</div>
      <div className="value">+ {value}</div>
    </div> 
  );
}

 
export default Score;