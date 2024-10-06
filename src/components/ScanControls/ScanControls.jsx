import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';

const StyledButton = styled(Button)(({ theme, scanning }) => ({
  width: 150,
  height: 50,
  margin: '0 10px',
  color: scanning ? '#fff' : '#001e3c',
  backgroundColor: scanning ? '#003892' : '#aab4be',
  '&:hover': {
    backgroundColor: scanning ? '#002d62' : '#8796A5',
  },
}));

function ScanControls() {
  const [isScanning, setIsScanning] = useState(false);

  const startScanning = () => {
    // Logic to start scanning
    setIsScanning(true);
  };

  const stopScanning = () => {
    // Logic to stop scanning
    setIsScanning(false);
  };

  return (
    <div>
      <StyledButton 
        onClick={startScanning} 
        disabled={isScanning} 
        scanning={isScanning} 
        startIcon={<PlayArrowIcon />}
      >
        Start Scanning
      </StyledButton>

      <StyledButton 
        onClick={stopScanning} 
        disabled={!isScanning} 
        scanning={!isScanning} 
        startIcon={<StopIcon />}
      >
        Stop Scanning
      </StyledButton>
    </div>
  );
}

export default ScanControls;
