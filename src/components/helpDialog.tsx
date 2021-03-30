import React from 'react';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import Typography from '@material-ui/core/Typography';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
      'background-color': 'darkgrey;'
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[900],
    },
  });

export interface DialogTitleProps extends WithStyles<typeof styles> {
  id: string;
  children: React.ReactNode;
  onClose: () => void;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
    'background-color': 'darkgrey;'
  },
}))(MuiDialogContent);

const HelpDialog: React.FC = (): JSX.Element => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <IconButton aria-label="helpButton" className='icon' onClick={handleClickOpen}>
        <HelpOutlineIcon />
      </IconButton>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          How to play
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            The objective is to align similar colored bubbles to form large blocks of bubbles before bursting them. 
            The more bubbles you have in a block before bursting them, the greater the amount of points you will receive. 
            To burst a bubble, the bubble must at least be connected to one other similar colored bubble on the grid.
          </Typography>
          <Typography gutterBottom>
            Tap once to highlight the block of bubbles. Select an other block to deselect the previous one. Select the highlighted block again to burst the bubbles.
          </Typography>
          <Typography gutterBottom>
            The number in the orange field represents the value of this block. (Value is calculated: x * (x - 1))
          </Typography>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default HelpDialog;