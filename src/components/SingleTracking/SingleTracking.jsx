import React, { useEffect, useRef, useState } from "react";
import { Box, Typography, Button, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

function SingleTracking({
  trackingType,
  dailyTracking,
  trackingState,
  trackingStateHandler,
}) {
  const [adding, setAdding] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (adding) {
      inputRef.current.focus();
    }
  }, [adding]);

  return (
    <Box 
      sx={{
        border: "1px solid #ddd",
        padding: 2,
        borderRadius: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        mb: 2
      }}
    >
      <Typography variant="body1">{`${trackingType}: ${dailyTracking}`}</Typography>

      <Button
        variant="contained"
        onClick={() => setAdding(true)}
        sx={{ minWidth: 0, padding: 1 }} // Adjust padding if needed
      >
        <AddIcon />
      </Button>

      {adding && (
        <TextField
          inputRef={inputRef}
          type="number"
          id={trackingType}
          value={trackingState}
          onChange={(e) => trackingStateHandler(e.target.value)}
          required
          size="small"
          sx={{ ml: 2, width: "100px" }}
        />
      )}
    </Box>
  );
}

export default SingleTracking;

