import React, { useState } from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  TextField,
} from "@mui/material";
import { useAuth } from "../../context/AuthContext.jsx";
import { useData } from "../../context/DataContext.jsx";
import { isSameDay } from "../../utils/helpers.js";
function NutritionCard({
  status,
  scannedBarcode,
  nutritionData,
  nutritionDataFetchStatus,
  handleManualInput,
}) {
  const [manualBarcode, setManualBarcode] = useState("");
  const [manualNutritionData, setManualNutritionData] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const [inputValue, setInputValue] = useState(""); // To store the user's input (either calories or weight)
  const [result, setResult] = useState(null); // To store the result of the calculation
  const [addingCalories, setAdding] = useState(false);
  const [addingProduct,setAddingProduct]=useState(false);
  const [calories, setCalories] = useState(0);
  // const [dailyTracking, setDailyTracking] = useState(null);

  const { currentUser } = useAuth();
  const { currentClient, addDailyTracking, getCurrentClient,addProduct } = useData();
  const handleSubmit = () => {
    if (manualBarcode.trim() !== "") {
      handleManualInput(manualBarcode);
    }
  };

  const handleAddProduct = async () => {
    console.log("handleAddProduct");
    try {
      setAddingProduct(true);
      const newProduct = {
        
          barcodeNumber: scannedBarcode,
          caloriesIn100g: manualNutritionData,
        
      };
      await addProduct(newProduct);
    } catch (error) {
      console.log("error in handleAddProduct");
      console.log(error);
    }

    setAddingProduct(false);
  };
  const handleAddCalories = async () => {
    console.log("handleAddCalories");
    console.log(currentClient);
    let track = currentClient.dailyTracking.find((track) => {
      return isSameDay(new Date(track.date), new Date());
    });
    if (track === undefined) {
      console.log("stil no data");
      const t = {
        date: new Date(),
        calories: 0,
        waterAmount: 0,
        sleepHours: 0,
      };
      track = t;
    }

    try {
      setAdding(true);
      console.log(track);
      const updatednewTrack = {
        date: track.date,
        calories: Number(track.calories) + Number(calories),
        waterAmount: Number(track.waterAmount),
        sleepHours: Number(track.sleepHours),
      };
      await addDailyTracking(currentClient._id, updatednewTrack);
      const resTrack = await getCurrentClient(currentClient._id);
      const uptrack = resTrack.dailyTracking.find((track) => {
        return isSameDay(new Date(track.date), new Date());
      });
    } catch (error) {
      console.log(error);
      console.log("error in handleDailyTracking");
    }
    setAdding(false);
    setSelectedOption(null);
    setResult(null);
    setInputValue("");
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleCalculateWeight = () => {
    // Logic to calculate weight from calories
    const weight = (inputValue / nutritionData) * 100;
    setResult(weight.toFixed(2) + " gr");
    setCalories(inputValue);
  };

  const handleCalculateCalories = () => {
    // Logic to calculate calories from weight
    const calculatedCalories = (inputValue * nutritionData) / 100;
    setCalories(calculatedCalories);
    setResult(calculatedCalories.toFixed(2) + " cal");
  };
  return (
    <Card
      sx={{ minWidth: 275, maxWidth: 450, mt: 2, backgroundColor: "#f5f5f5" }}
    >
      <CardContent>
        {status === "failed" ? (
          nutritionDataFetchStatus === "no_data" ? (
            <>
              <Typography
                gutterBottom
                sx={{ color: "text.secondary", fontSize: 14 }}
              >
                {`Nutrition Information for scanned Barcode ${scannedBarcode} `}
              </Typography>

              <Typography
                gutterBottom
                sx={{ color: "error.main", fontSize: 14 }}
              >
                No data available for this product!
              </Typography>
              {currentUser.isAdmin && (
                <>
                  <Typography
                    gutterBottom
                    sx={{ color: "text.secondary", fontSize: 14 }}
                  >
                    You can add this product to your database
                  </Typography>

                  <TextField
                    label="Calories in 100g"
                    variant="outlined"
                    value={manualNutritionData}
                    type="number"
                    onChange={(e) => setManualNutritionData(e.target.value)}
                    sx={{ mt: 1, mb: 2, width: "100%" }}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddProduct}
                    disabled={addingProduct}
                  >
                    Add product
                  </Button>
                </>
              )}
            </>
          ) : (
            //TODO if currentUser.isAdmin so add option to add new data!
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
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                Submit Barcode
              </Button>
            </>
          )
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
      {status === "success" && !currentUser.isAdmin && (
        <CardActions>
          <Button onClick={() => setSelectedOption("calories-to-weight")}>
            Input Calories to Continue Calculation for Weight
          </Button>

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
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h5" component="div">
            {selectedOption === "calories-to-weight"
              ? `Weight: ${result}`
              : `Calories: ${result}`}
          </Typography>

          <Button variant="contained" onClick={handleAddCalories} disabled={addingCalories}>
            Add Calories to your daily tracking
            {/* Calories to your daily tracking */}
          </Button>
        </Box>
      )}
    </Card>
  );
}

export default NutritionCard;
