import * as React from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import  FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import AddWorkout from '../AddWorkout/AddWorkout';



function SimpleDialog(props) {
  const { onClose, open ,client } = props;

  const handleClose = () => {
    onClose();
  };



  return (
    <Dialog onClose={handleClose} open={open}>
      <AddWorkout client={client} workoutDisplay={handleClose}/>
    </Dialog>
  );
}


export default function AddWorkoutDialog({client}) {
  const [open, setOpen] = React.useState(false);
  

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined"  onClick={handleClickOpen}>
      <FitnessCenterIcon sx={{ marginRight: '8px' }} />
       Add a Workout
      </Button>
      <SimpleDialog
        open={open}
        onClose={handleClose}
        client={client}
      />
    </div>
  );
}