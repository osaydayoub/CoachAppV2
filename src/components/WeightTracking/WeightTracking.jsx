import React, { useState } from "react";
import { Button, TextField, Box } from "@mui/material";
import { useData } from "../../context/DataContext";
import WeightLogList from "../WeightLogList/WeightLogList";
import WeightLogChart from "../WeightLogChart/WeightLogChart";
import { useNotification } from "../../context/NotificationContext";

function WeightTracking() {
  const [date, setDate] = useState("");
  const [newWeight, setNewWeight] = useState("");
  const [loggingWeight, setLoggingWeight] = useState(false);
  const [showLogs, setShowLogs] = useState(false);
  const { currentClient, addWeightTracking } = useData();
  const showNotification = useNotification();

  const sortedWeightTracking = currentClient.weightTracking
    ? [...currentClient.weightTracking].sort(
        (log1, log2) => new Date(log1.date) - new Date(log2.date)
      )
    : [];

  const handleLogWeight = async (date, newWeight) => {
    const newLog = { weight: newWeight, date: new Date(date) };
    try {
      setLoggingWeight(true);
      await addWeightTracking(currentClient._id, newLog);
    } catch (error) {
      console.log("Error in handleLogWeight:", error);
      if(error.response.status==409){
        showNotification(
          "Weight data for this date already exists. Would you like to update the existing entry?",
          "error"
        );
        console.log("Error in handleLogWeight: status=>", error.response.status);
      }
    }
    setLoggingWeight(false);
    setNewWeight("");
  };

  const toggleLogs = () => {
    setShowLogs(!showLogs);
  };

  return (
    <Box
      sx={{
        p: 2,
        maxWidth: 400,
        border: "2px solid #1976d2",
        borderRadius: "8px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.4)",
      }}
    >
      <h3>Weight Tracking</h3>

      <TextField
        type="date"
        label="Date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        fullWidth
        required
        sx={{ mt: 2 }}
        InputLabelProps={{ shrink: true }} // Keeps the label inside the border
      />

      <TextField
        label="Weight in kg"
        variant="outlined"
        value={newWeight}
        type="number"
        onChange={(e) => setNewWeight(e.target.value)}
        fullWidth
        sx={{ mt: 2, mb: 2 }}
      />

      <Button
        variant="contained"
        color="primary"
        onClick={() => handleLogWeight(date, newWeight)}
        fullWidth
        sx={{ mt: 2 }}
        disabled={!date || newWeight === "" || loggingWeight}
      >
        {loggingWeight ? "Logging..." : "Log Weight"}
      </Button>

      <Button
        variant="outlined"
        color="secondary"
        onClick={toggleLogs}
        fullWidth
        sx={{ mt: 2 }}
      >
        {showLogs ? "Hide Logs" : "Show Logs"}
      </Button>

      {showLogs && currentClient.weightTracking && (
        <>
      {false&&<WeightLogChart weightTracking={sortedWeightTracking} />}
          <WeightLogList weightTracking={sortedWeightTracking} />
        </>
      )}
    </Box>
  );
}

export default WeightTracking;
