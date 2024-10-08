import React, { useState } from "react";
import { Box, Card, CardActions, CardContent, Button, Typography, TextField } from "@mui/material";
import { useAuth } from "../../context/AuthContext.jsx";

function NutritionCard({
  status,
  scannedBarcode,
  nutritionData,
  nutritionDataFetchStatus,
  handleManualInput,
}) {
  const [manualBarcode, setManualBarcode] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const [inputValue, setInputValue] = useState(""); // To store the user's input (either calories or weight)
  const [result, setResult] = useState(null); // To store the result of the calculation
  const { currentUser } = useAuth();
  const handleSubmit = () => {
    if (manualBarcode.trim() !== "") {
      handleManualInput(manualBarcode);
    }
  };
  const handleAddCalories = () => {
    console.log("handleAddCalories");
  };
  

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleCalculateWeight = () => {
    // Logic to calculate weight from calories
    const weight = (inputValue / nutritionData) * 100; // Example: Assuming calories per 100g, calculate weight
    setResult(weight.toFixed(2) + " gr");
  };

  const handleCalculateCalories = () => {
    // Logic to calculate calories from weight
    const calories = (inputValue * nutritionData) / 100; // Example: calories per 100g, calculate total calories
    setResult(calories.toFixed(2) + " cal");
  };
  return (
    <Card
      sx={{ minWidth: 275, maxWidth: 450, mt: 2, backgroundColor: "#f5f5f5" }}
    >
      <CardContent>
        {status === "failed" ? (
          <>
            <Typography
              gutterBottom
              sx={{ color: "text.secondary", fontSize: 14 }}
            >
              Scanning failed. Please try again by clicking the Start Scanning
              button, or enter the barcode number manually below.
            </Typography>

            <TextField
              label="Enter Barcode"
              variant="outlined"
              value={manualBarcode}
              onChange={(e) => setManualBarcode(e.target.value)}
              sx={{ mt: 1, mb: 2, width: "100%" }}
            />
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Submit Barcode
            </Button>
          </>
        ) : (
          <>
            <Typography
              gutterBottom
              sx={{ color: "text.secondary", fontSize: 14 }}
            >
              {`Nutrition Information for scanned Barcode ${scannedBarcode} `}
            </Typography>
            <Typography variant="h5" component="div">
              Calories in 100 gr
            </Typography>
            <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
              {nutritionData}
            </Typography>
          </>
        )}
      </CardContent>
      {status === "success" && (
        currentUser.isAdmin&& <CardActions>
          {/* Button to choose first option (Calories to Weight) */}
          <Button onClick={() => setSelectedOption("calories-to-weight")}>
            Input Calories to Continue Calculation for Weight
          </Button>

          {/* Button to choose second option (Weight to Calories) */}
          <Button onClick={() => setSelectedOption("weight-to-calories")}>
            Input Weight to Continue Calculation for Calories
          </Button>
        </CardActions>
      )}
      {selectedOption && (
        <Box
          sx={{
            padding: 1,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Input field to enter either calories or weight */}
          <TextField
            label={
              selectedOption === "calories-to-weight"
                ? "Enter Calories"
                : "Enter Weight (g)"
            }
            variant="outlined"
            value={inputValue}
            onChange={handleInputChange}
            sx={{ mt: 2, mb: 2 }}
          />

          {/* Button to calculate based on user selection */}
          <Button
            variant="contained"
            onClick={
              selectedOption === "calories-to-weight"
                ? handleCalculateWeight
                : handleCalculateCalories
            }
          >
            Calculate
          </Button>
        </Box>
      )}
      {/* Display the result */}
      {result && (
        <Box
          sx={{
            padding: 2,
            display: "flex",
            flexDirection: 'column',
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h5" component="div">
            {selectedOption === "calories-to-weight"
              ? `Weight: ${result}`
              : `Calories: ${result}`}
          </Typography>

          <Button variant="contained"
          onClick={handleAddCalories}
          >
            Add Calories to your daily tracking
            {/* Calories to your daily tracking */}
          </Button>
        </Box>
      )}
    </Card>
  );
}

export default NutritionCard;
