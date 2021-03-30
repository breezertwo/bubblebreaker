import React from 'react';
import RefreshIcon from '@material-ui/icons/Refresh';
import { IconButton } from '@material-ui/core';

import HelpDialog from './helpDialog';
export interface ToolbarProps {
  onRefreshClick: () => void;
}
 
const Toolbar: React.FC<ToolbarProps> = ({ onRefreshClick }): JSX.Element => {

  return (
    <div className="toolbar">
      <HelpDialog />
      <IconButton aria-label="close" className="icon" onClick={onRefreshClick}>
          <RefreshIcon />
      </IconButton>
    </div> 
  );
}

 
export default Toolbar;