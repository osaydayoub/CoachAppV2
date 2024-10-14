import React from "react";
import { List, ListItem, ListItemText } from "@mui/material";

function WeightLogList({ weightTracking }) {
  return (
    <List>
      {weightTracking && weightTracking.length > 0 ? (
        weightTracking.map((log, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={`Weight: ${log.weight} kg`}
              secondary={`Date: ${new Date(log.date).toLocaleDateString()}`}
            />
          </ListItem>
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
