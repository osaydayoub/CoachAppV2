import React, { useState } from "react";
import "./WeightTracking.css";
import { Button, TextField } from "@mui/material";
import { useData } from "../../context/DataContext";
import WeightLogList from "../WeightLogList/WeightLogList";
import WeightLogChart from "../WeightLogChart/WeightLogChart";
function WeightTracking() {
  const [date, setDate] = useState("");
  const [newWeight, setNewWeight] = useState("");
  const [loggingWeight, setLoggingWeight] = useState(false);
  const [showLogs, setShowLogs] = useState(false);
  const { currentClient, addWeightTracking } = useData();

  const sortedWeightTracking = currentClient.weightTracking
  ? [...currentClient.weightTracking].sort(
      (log1, log2) => new Date(log1.date) - new Date(log2.date)
    )
  : [];
 
  const handleLogWeight = async (date, newWeight) => {
    console.log("handleLogWeight");
    console.log(date);
    console.log(newWeight);
    const newLog = { weight: newWeight, date: new Date(date) };
    try {
      setLoggingWeight(true);
      const updatedClient = await addWeightTracking(currentClient._id, newLog);
    } catch (error) {
      console.log(error);
      console.log("error in handleLogWeight");
    }
    setLoggingWeight(false);
    //setDate("");
    setNewWeight("");
  };

  const toggleLogs = () => {
    setShowLogs(!showLogs);
  };

  return (
    <div className="weight-tracking-container">
      <h3>WeightTracking</h3>
      <div style={{ paddingTop: "20px" }}>
        <label htmlFor="date">{`Date: `}</label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>

      <>
        <TextField
          label="Weight in kg"
          variant="outlined"
          value={newWeight}
          type="number"
          onChange={(e) => setNewWeight(e.target.value)}
          sx={{ mt: 2, mb: 2, width: "100%" }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleLogWeight(date, newWeight)}
          sx={{ mt: 2 }}
          disabled={!date || newWeight === "" || loggingWeight}
        >
          {loggingWeight ? "Logging..." : "Log Weight"}
        </Button>
      </>
      {/* Button to toggle weight log visibility */}
      <Button
        variant="outlined"
        color="secondary"
        onClick={toggleLogs}
        sx={{ mt: 2 }}
      >
        {showLogs ? "Hide Logs" : "Show Logs"}
      </Button>

      {showLogs && currentClient.weightTracking && (
        <>
          <WeightLogChart weightTracking={sortedWeightTracking} />
          <WeightLogList weightTracking={sortedWeightTracking} />
        </>
      )}
    </div>
  );
}

export default WeightTracking;
