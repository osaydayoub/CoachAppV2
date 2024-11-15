import React, { useEffect, useRef, useState } from "react";
import { Box, Typography, Button, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useAuth } from "../../context/AuthContext";

function SingleTracking({
  trackingType,
  dailyTracking,
  trackingState,
  trackingStateHandler,
}) {
  const [adding, setAdding] = useState(false);
  const inputRef = useRef(null);
  const {t,language}=useAuth();

  useEffect(() => {
    if (adding) {
      inputRef.current.focus();
    }
  }, [adding]);

  const isArabic = language === "ar";
  const textAlign = isArabic ? "right" : "left";
  const flexDirection = isArabic ? "row-reverse" : "row";
  return (
    <Box 
      sx={{
        border: "1px solid #ddd",
        padding: 2,
        borderRadius: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection,
        mb: 2,
        textAlign
      }}
    >
      <Typography variant="body1">{`${t(`TrackingPage.${trackingType}`)}: ${dailyTracking}`}</Typography>

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

