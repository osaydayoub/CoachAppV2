import React, { useState } from "react";
import { useData } from "../../context/DataContext.jsx";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Typography,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useNotification } from "../../context/NotificationContext.jsx";

function AddWorkout({ client, workoutDisplay }) {
  const exerciseOptions = [
    { value: "Push", label: "Push" },
    { value: "Pull", label: "Pull" },
    { value: "Leg", label: "Leg" },
    { value: "A/b/c/d", label: "A/b/c/d" },
    { value: "Full-body", label: "Full-body" },
  ];

  const [selectedExercise, setSelectedExercise] = useState(
    exerciseOptions[0].value
  );
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  //duration in minutes
  const [workoutDuration, setWorkoutDuration] = useState(60);
  const [adding, setAdding] = useState(false);
  const durationChoices = [
    { value: 30, label: "30 min" },
    { value: 60, label: "60 min" },
    { value: 90, label: "90 min" },
  ];

  const { createWorkout } = useData();
  const showNotification = useNotification();

  const handleCreateWorkout = async (e) => {
    e.preventDefault();
    try {
      setAdding(true);
      await createWorkout({
        exercise: selectedExercise,
        date: new Date(`${date}T${time}`),
        duration: workoutDuration,
        clientID: client._id,
      });
      showNotification("Workout added successfully!", "success");
    } catch (error) {
      console.log("Error in handleLogWeight:", error);
      if (error.response.status == 409) {
        showNotification("A workout already exists at this time.", "error");
        console.log(
          "Error in handleLogWeight: status=>",
          error.response.status
        );
      }
      console.error("Error creating workout:", error);
    } finally {
      setAdding(false);
    }
  };

  console.log(client);

  return (
    <Box sx={{ padding: 2, width: 300 }}>
      {/* <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <IconButton onClick={workoutDisplay}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Typography variant="h6" sx={{ marginBottom: 1, fontWeight: "bold" }}>
        Add a Workout
      </Typography> */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 1,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Add a Workout
        </Typography>
        <IconButton onClick={workoutDisplay}>
          <CloseIcon />
        </IconButton>
      </Box>
      
      <Typography
        variant="body1"
        sx={{
          marginBottom: 2,
          fontSize: "0.875rem", 
          color: "gray", 
        }}
      >
        For {client.name}
      </Typography>
      <form onSubmit={handleCreateWorkout}>
        <FormControl fullWidth variant="outlined" sx={{ marginBottom: 2 }}>
          <InputLabel id="exercise-label">Choose an Exercise</InputLabel>
          <Select
            labelId="exercise-label"
            value={selectedExercise}
            onChange={(e) => setSelectedExercise(e.target.value)}
            label="Choose an Exercise"
          >
            {exerciseOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          type="date"
          label="Date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          fullWidth
          sx={{ marginBottom: 2 }}
          InputLabelProps={{
            shrink: true, // Keep the label always condensed
          }}
        />

        <TextField
          type="time"
          label="Time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
          fullWidth
          sx={{ marginBottom: 2 }}
          InputLabelProps={{
            shrink: true, // Keep the label always condensed
          }}
        />

        <FormControl fullWidth variant="outlined" sx={{ marginBottom: 2 }}>
          <InputLabel id="duration-label">Choose a Duration</InputLabel>
          <Select
            labelId="duration-label"
            value={workoutDuration}
            onChange={(e) => setWorkoutDuration(e.target.value)}
            label="Choose a Duration"
          >
            {durationChoices.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={adding}
          sx={{ marginTop: 2 }}
          fullWidth
        >
          {adding ? "Adding..." : "Add"}
        </Button>
      </form>
    </Box>
  );
}

export default AddWorkout;
