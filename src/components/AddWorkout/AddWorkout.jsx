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
  const [adding, setAdding] = useState(false);

  const { createWorkout } = useData();

  const handleCreateWorkout = async (e) => {
    e.preventDefault();
    try {
      setAdding(true);
      await createWorkout({
        exercise: selectedExercise,
        date: new Date(`${date}T${time}`),
        clientID: client._id,
      });
    } catch (error) {
      console.error("Error creating workout:", error);
    } finally {
      setAdding(false);
    }
  };

  return (
    <Box sx={{ padding: 2, width: 300 }}>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <IconButton onClick={workoutDisplay}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        Add a Workout
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

        {date && (
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
        )}

        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={adding}
          sx={{ marginTop: 2 }}
        >
          {adding ? "Adding..." : "Add"}
        </Button>
      </form>
    </Box>
  );
}

export default AddWorkout;
