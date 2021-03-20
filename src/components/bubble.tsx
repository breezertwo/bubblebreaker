import React from 'react';

export interface BubbleProps {
  onClick: (event: React.MouseEvent) => void;
  id: string,
  bgColor: string
}
 
const Bubble: React.FC<BubbleProps> = ({ onClick, id, bgColor }): JSX.Element => {

  return ( 
    <div style={{ backgroundColor: bgColor }} onClick={onClick} id={id} className={'bubble'} />
  );
}

 
export default Bubble;