import React, { useState } from "react";
import { Button, TextField, Box, Paper, Typography } from "@mui/material";
import { useData } from "../../context/DataContext";
import WeightLogList from "../WeightLogList/WeightLogList";
import WeightLogChart from "../WeightLogChart/WeightLogChart";
import { useNotification } from "../../context/NotificationContext";
import WeightLogListTable from "../WeightLogListTable/WeightLogListTable";
import LogSwitch from "../LogSwitch/LogSwitch";
import { useAuth } from "../../context/AuthContext";

function WeightTracking() {
  const [date, setDate] = useState("");
  const [newWeight, setNewWeight] = useState("");
  const [loggingWeight, setLoggingWeight] = useState(false);
  const { currentClient, addWeightTracking } = useData();
  const showNotification = useNotification();
  const [isTable, setIsTable] = useState(true);
  const {t}=useAuth();

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
      if (error.response.status == 409) {
        showNotification(
          "Weight data for this date already exists. Would you like to update the existing entry?",
          "error"
        );
        console.log(
          "Error in handleLogWeight: status=>",
          error.response.status
        );
      }
    }
    setLoggingWeight(false);
    setNewWeight("");
  };

  return (
    <Paper
      elevation={4}
      sx={{
        p: 2,
        maxWidth: 400,
      }}
    >
      <Typography variant="h7" component="h3" gutterBottom >
        {t("TrackingPage.Weight Tracking")}
      </Typography>

      <TextField
        type="date"
        label={t("TrackingPage.Date")}
        value={date}
        onChange={(e) => setDate(e.target.value)}
        fullWidth
        required
        sx={{ mt: 2 }}
        InputLabelProps={{ shrink: true }} // Keeps the label inside the border
      />

      <TextField
        label={t("TrackingPage.Weight in kg")}
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
        {loggingWeight ? t("TrackingPage.Logging...") : t("TrackingPage.Log Weight")}
      </Button>

      <Box sx={{ mt: 2 }}>
        {currentClient.weightTracking && (
          <>
            <LogSwitch handleSwitche={setIsTable} />
            {isTable ? (
              <WeightLogListTable weightTracking={sortedWeightTracking} />
            ) : (
              <WeightLogChart weightTracking={sortedWeightTracking} />
            )}
          </>
        )}
      </Box>
    </Paper>
  );
}

export default WeightTracking;
