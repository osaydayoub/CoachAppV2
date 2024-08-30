import React from 'react'

import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

// TODO add autoHideDuration as a prop
function Notification({open,setOpen,message,severity}) {
    // severity Can be 'success', 'error', 'warning', 'info'
  
  
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpen(false);
    };
  
    return (
      <div>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity={severity}>
            {message}
          </Alert>
        </Snackbar>
      </div>
    );
  }

export default Notification

