import { useRef } from 'react';
import { IoClose, IoHelpCircleOutline } from 'react-icons/io5';

const HelpDialog: React.FC = () => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const handleOpen = () => {
    dialogRef.current?.showModal();
  };
  const handleClose = () => {
    dialogRef.current?.close();
  };

  return (
    <>
      <button type='button' aria-label='help' className='iconButton' onClick={handleOpen}>
        <IoHelpCircleOutline className='icon' />
      </button>
      <dialog
        ref={dialogRef}
        className='helpDialog'
        onClose={handleClose}
        onClick={(e) => {
          if (e.target === dialogRef.current) handleClose();
        }}
      >
        <div className='helpDialog__title'>
          <h2>How to play</h2>
          <button type='button' aria-label='close' className='iconButton' onClick={handleClose}>
            <IoClose className='icon' />
          </button>
        </div>
        <div className='helpDialog__content'>
          <p>
            The objective is to align similar colored bubbles to form large blocks of bubbles before bursting them. The more bubbles you
            have in a block before bursting them, the greater the amount of points you will receive. To burst a bubble, the bubble must at
            least be connected to one other similar colored bubble on the grid.
          </p>
          <p>
            Tap once to highlight the block of bubbles. Select an other block to deselect the previous one. Select the highlighted block
            again to burst the bubbles.
          </p>
          <p>The number in the orange field represents the value of this block. (Value is calculated: x * (x - 1))</p>
        </div>
      </dialog>
    </>
  );
};

export default HelpDialog;
