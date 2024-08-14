import * as React from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';

import AddPackage from '../AddPackage/AddPackage';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';


function SimpleDialog(props) {
  const { onClose, open ,client } = props;

  const handleClose = () => {
    onClose();
  };



  return (
    <Dialog onClose={handleClose} open={open}>
      <AddPackage client={client} packageDisplay={handleClose}/>
    </Dialog>
  );
}


export default function AddPackageDialog({client}) {
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
      <AddShoppingCartIcon sx={{ marginRight: '8px' }} />
      Add a Package
      </Button>
      <SimpleDialog
        open={open}
        onClose={handleClose}
        client={client}
      />
    </div>
  );
}