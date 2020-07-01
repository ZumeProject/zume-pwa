import React from 'react';

import { storiesOf } from '@storybook/react';

import Button from '@material-ui/core/Button';
import AlertDialog from './AlertDialog';

function AlertDialogWrapped() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open alert dialog
      </Button>
      <AlertDialog
        title={"Use Google's location service?"}
        description={
          'Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.'
        }
        open={open}
        handleClose={handleClose}
        actions={
          <React.Fragment>
            <Button onClick={handleClose} color="primary">
              Disagree
            </Button>
            <Button onClick={handleClose} color="primary" autoFocus>
              Agree
            </Button>
          </React.Fragment>
        }
      />
    </div>
  );
}

storiesOf('AlertDialog', module).add('renders an alert dialog', () => (
  <AlertDialogWrapped />
));
