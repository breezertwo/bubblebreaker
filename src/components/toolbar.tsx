import React from 'react';

export interface ToolbarProps {
  onRefreshClick: () => void;
}
 
const Toolbar: React.FC<ToolbarProps> = ({ onRefreshClick }): JSX.Element => {

  return (
    <div className="toolbar">
      <div onClick={onRefreshClick} className="rf" />
    </div> 
  );
}

 
export default Toolbar;