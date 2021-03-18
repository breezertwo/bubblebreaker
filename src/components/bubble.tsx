import React, { useState } from 'react';

export interface BubbleProps {
  onClick: (event: React.MouseEvent) => void;
  id: string,
  hasBubble: boolean,
  bgColor: string
}
 
const Bubble: React.FC<BubbleProps> = ({ onClick, id, hasBubble, bgColor }): JSX.Element => {

  return ( 
    <div style={!hasBubble ? { backgroundColor: bgColor } : {}} onClick={onClick} id={id} className={!hasBubble ? 'bubble' : 'bubbleEmpty'}></div>
  );
}

 
export default Bubble;