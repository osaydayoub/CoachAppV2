import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Paper,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";

function CaloricIntakeCalculator() {
  const [age, setAge] = useState("");
  const [sex, setSex] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [BMR, setBMR] = useState(0);
  const handleBMRCalculation = (e) => {
    e.preventDefault();
    let calculatedBMR;
    if (sex === "Male") {
      calculatedBMR = 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age;
    } else {
      calculatedBMR = 447.593 + 9.247 * weight + 3.098 * height - 4.33 * age;
    }
    setBMR(calculatedBMR);
  };
  return (
    <Paper
      elevation={4}
      sx={{
        p: 2,
        maxWidth: 400,
        mt: 3,
        mb: 3,
      }}
    >
      <Typography variant="h5" sx={{ fontWeight: "bold" }}>
        Daily Caloric Intake Calculator
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 2,
        }}
      >
        <Typography
          variant="body1"
          sx={{
            marginBottom: 2,
            fontSize: "0.875rem",
            color: "gray",
          }}
        >
          Fill in the information below to calculate personalized calorie
          recommendations using the BMR formula:
        </Typography>
        <form onSubmit={handleBMRCalculation}>
          <TextField
            fullWidth
            type="number"
            margin="normal"
            label="Age in years"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
          <FormControl fullWidth margin="normal">
            <InputLabel id="sex-label">Sex</InputLabel>
            <Select
              labelId="sex-label"
              value={sex}
              onChange={(e) => setSex(e.target.value)}
              label="Sex"
            >
              {["Male", "Female"].map((option, index) => (
                <MenuItem key={index} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            fullWidth
            type="number"
            margin="normal"
            label="Weight in kg"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            required
          />

          <TextField
            fullWidth
            type="number"
            margin="normal"
            label="Height in cm"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            required
          />
          <Button fullWidth variant="outlined" type="submit" sx={{ mt: 2 }}>
            Calculate
          </Button>
          <Button
            fullWidth
            variant="text"
            sx={{ mt: 1 }}
            onClick={() => {
              setAge("");
              setSex("");
              setWeight("");
              setHeight("");
              setBMR(0);
            }}
          >
            Reset
          </Button>
        </form>
        {BMR !== 0 && (
          <Box sx={{ mt: 2, boxShadow: 3, p: 2, borderRadius: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              {`${BMR.toFixed(2)} calories/day`}
            </Typography>
          </Box>
        )}
      </Box>
    </Paper>
  );
}

export default CaloricIntakeCalculator;
