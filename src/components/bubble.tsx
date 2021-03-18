import React from 'react';

export interface BubbleProps {}
 
const Bubble: React.FC<BubbleProps> = (): JSX.Element => {
  return ( 
    <div className="bubble"></div>
  );
}
 
export default Bubble;