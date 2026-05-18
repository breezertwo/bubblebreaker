import { IoRefresh } from 'react-icons/io5';

import HelpDialog from './helpDialog';

export interface ToolbarProps {
  onRefreshClick: () => void;
}

const Toolbar: React.FC<ToolbarProps> = ({ onRefreshClick }) => {
  return (
    <div className='toolbar'>
      <HelpDialog />
      <button type='button' aria-label='refresh' className='iconButton' onClick={onRefreshClick}>
        <IoRefresh className='icon' />
      </button>
    </div>
  );
};

export default Toolbar;
