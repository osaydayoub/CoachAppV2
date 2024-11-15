import React, { useState } from "react";
import { useData } from "../../context/DataContext.jsx";
import { TextField, Button, Typography, IconButton, Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

function AddPackage({ client, packageDisplay }) {
  const [workoutsNumber, setWorkoutsNumber] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [paidAmount, setPaidAmount] = useState(0);
  const [caloricIntake, setCaloricIntake] = useState(0);
  const [adding, setAdding] = useState(false);
  const { addPackage } = useData();

  const handleAddPackage = async (e) => {
    e.preventDefault();
    try {
      setAdding(true);
      await addPackage(client._id, {
        numberOfWorkouts: workoutsNumber,
        totalCost: totalCost,
        paidAmount: paidAmount,
        caloricIntake: caloricIntake,
      });
    } catch (error) {
      console.error("Error adding package:", error);
    }
    setAdding(false);
  };

  return (
    <Box sx={{ padding: 2, maxWidth: 300 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 1,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Add a Package
        </Typography>
        <IconButton onClick={packageDisplay}>
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

      <form onSubmit={handleAddPackage}>
        <TextField
          label="Workouts Number"
          type="number"
          value={workoutsNumber}
          onChange={(e) => setWorkoutsNumber(e.target.value)}
          required
          fullWidth
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Total Cost"
          type="number"
          value={totalCost}
          onChange={(e) => setTotalCost(e.target.value)}
          required
          fullWidth
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Paid Amount"
          type="number"
          value={paidAmount}
          onChange={(e) => setPaidAmount(e.target.value)}
          required
          fullWidth
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Caloric Intake"
          type="number"
          value={caloricIntake}
          onChange={(e) => setCaloricIntake(e.target.value)}
          required
          fullWidth
          sx={{ marginBottom: 2 }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={adding}
          fullWidth
        >
          Add
        </Button>
      </form>
    </Box>
  );
}

export default AddPackage;
