import React from "react";
import { List, ListItem, ListItemText } from "@mui/material";
import WeightLogItem from "../WeightLogItem/WeightLogItem";
import { useData } from "../../context/DataContext";

function WeightLogList({ weightTracking }) {
  const {currentClient, updateWeightTracking } = useData();

  const handleUpdateWeightTracking = async (date, newWeight) => {
    const newLog = { weight: newWeight, date: new Date(date) };
    try {
      await updateWeightTracking(currentClient._id, newLog);
    } catch (error) {
      console.log("Error in handleUpdateWeightTracking:", error);
    }
  };

  return (
    <List>
      {weightTracking && weightTracking.length > 0 ? (
        weightTracking.map((log, index) => (
          // <ListItem key={index}>
          //   {/* <ListItemText
          //     primary={`Weight: ${log.weight} kg`}
          //     secondary={`Date: ${new Date(log.date).toLocaleDateString()}`}
          //   /> */}
          //   {/* <WeightLogItem key={log.date} log={log} onUpdate={handleUpdateWeightTracking} /> */}
          //   </ListItem>
          <WeightLogItem
            key={log.date}
            log={log}
            onUpdate={handleUpdateWeightTracking}
          />
        ))
      ) : (
        <ListItem>
          <ListItemText primary="No logs available!" />
        </ListItem>
      )}
    </List>
  );
}

export default WeightLogList;
