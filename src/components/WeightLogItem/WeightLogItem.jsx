import {
  Box,
  IconButton,
  ListItem,
  ListItemText,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import SaveIcon from "@mui/icons-material/Save";
import UpdateIcon from "@mui/icons-material/Update";
import EditIcon from "@mui/icons-material/Edit";
import { useNotification } from "../../context/NotificationContext";
import { getFullDate } from "../../utils/helpers";

function WeightLogItem({ log, onUpdate }) {
  const [newWeight, setNewWeight] = useState(log.weight);
  const [isEditing, setIsEditing] = useState(false);
  const showNotification = useNotification();
  //   useEffect(()=>{
  //     setNewWeight(log.weight);
  //   },[isEditing]);

  const handleUpdate = async () => {
    if (newWeight !== log.weight) {
      try {
        await onUpdate(log.date, newWeight);
        showNotification(
          // `Successfully updated the weight to ${newWeight} kg for ${getFullDate(new Date(log.date))}!`,
          `Updated weight: ${newWeight} kg for ${getFullDate(new Date(log.date))} successfully!`,
          "success" 
        );

      } catch (error) {
        console.log("error in handleUpdate", error);
      }
    }
    setIsEditing(false);
  };

  return (
    <ListItem sx={{height: isEditing ? 'auto' : '30px'}}>
      <Box sx={{ flexGrow: 1}}>
        <Box
          sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
        >
          <ListItemText
            primary={`Weight: ${log.weight} kg`}
            secondary={`Date: ${new Date(log.date).toLocaleDateString()}`}
          />

          {/* <Button
            variant="outlined"
            onClick={() => setIsEditing((prev) => !prev)} // Toggle edit mode on button click
            sx={{ marginLeft: 2 }} // Add margin for spacing
          >
            {isEditing ? "Cancel" : "Update"}
          </Button> */}
          <IconButton
            edge="end"
            aria-label="update"
            onClick={() => setIsEditing((prev) => !prev)}
            sx={{
              marginLeft: 2,
              color: isEditing ? "gray" : "primary.main",
              "&:hover": {
                color: "primary.main",
              },
            }}
          >
              <EditIcon />
          </IconButton>
        </Box>

        {isEditing && (
          <Box
            sx={{
              mt: 2,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <TextField
              //   label="Weight in kg"
              label={`Weight in kg in date ${new Date(
                log.date
              ).toLocaleDateString()}`}
              variant="outlined"
              value={newWeight}
              type="number"
              onChange={(e) => setNewWeight(e.target.value)} 
              fullWidth
              sx={{ mt: 2, mb: 2 }} 
            />
            {/* <Button
              variant="outlined"
              onClick={handleUpdate} 
              sx={{ marginLeft: 2 }} 
            >
              Save
            </Button> */}
            <IconButton
              color="primary" 
              onClick={handleUpdate} 
              sx={{ marginLeft: 2 }}
            >
              <SaveIcon />
            </IconButton>
          </Box>
        )}
      </Box>
    </ListItem>
  );
}

export default WeightLogItem;
