import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  Box,
  Rating,
  Button,
  Tooltip,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import { useData } from "../../context/DataContext";
import { useAuth } from "../../context/AuthContext";
import LocalDining from "@mui/icons-material/LocalDining";
import AddIcon from "@mui/icons-material/Add";
import DoneIcon from "@mui/icons-material/Done";
import { isRTL } from "../../utils/helpers";

function Meal({ mealOption, mealType, setMealsChanged, display, consumed }) {
  const [rating, setRating] = useState(null);
  const [selectedSnack, setSelectedSnack] = useState(""); // State to store selected snack
  const [addingMeal, setAddingMeal] = useState(false);
  // Handle snack selection
  const handleSnackChange = (event) => {
    setSelectedSnack(event.target.value);
  };
  const {
    currentClient,
    addMealRating,
    addDailyMeal,
    AddCaloriesToDailyTracking,
    consumeDailyMeal,
  } = useData();
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentClient) {
      const clientRating = mealOption?.ratings?.[currentClient._id];
      setRating(clientRating ?? 0);
    }
  }, []);


  const handelNewRating = async (newValue) => {
    setRating(newValue);
    console.log("handleAddMealRating");
    console.log(newValue);
    try {
      // setLoggingWeight(true);
      const updatedClient = await addMealRating(
        mealOption._id,
        currentClient._id,
        newValue
      );
      // setMealsChanged(true);
    } catch (error) {
      console.log(error);
      console.log("error in handelNewRating");
    }

    setRating(newValue);
  };

  const handelAddDailyMeal = async () => {
    console.log("handelAddDailyMeal");
    try {
      setAddingMeal(true);
      const dailyMeal = await addDailyMeal(
        currentClient._id,
        mealOption._id,
        mealOption.type === "snack" ? selectedSnack : mealOption.type
      );
    } catch (error) {
      console.log(error);
      console.log("error in handelNewRating");
    } finally {
      setAddingMeal(false);
    }
  };

  const handleConsumeMeal = async () => {
    console.log("handleConsumeMeal");
    //TODO change flage to consumed =true!
    try {
      await AddCaloriesToDailyTracking(mealOption.totalCalories);
      await consumeDailyMeal(
        currentClient._id,
        mealOption.type === "snack" ? mealType : mealOption.type
      );
    } catch (error) {
      console.log("error in handleConsumeMeal");
    }
  };

  return (
    <Card sx={{ width: 230, minHeight: 200 }}>
      <CardContent>
        <List>
          {mealOption.ingredients.map((ingredient) => (
            <ListItem key={ingredient.name} disablePadding>
              <Box display="flex" alignItems="center">
                <CircleIcon sx={{ fontSize: 8, marginRight: 1 }} />
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    textAlign: isRTL(ingredient.name) ? "right" : "left",
                    direction: isRTL(ingredient.name) ? "rtl" : "ltr",
                  }}
                >
                  {`${ingredient.name} - ${ingredient.amount} ${ingredient.unit}`}
                </Typography>
              </Box>
            </ListItem>
          ))}
        </List>
        <Typography variant="h6" sx={{ marginTop: 2 }}>
          Total Calories: {mealOption.totalCalories}
        </Typography>
        {/* //TODO admin cant rate  */}
        {/* TODO Add rating average if  isAdmin */}
        {!currentUser.isAdmin && (
          <Box
            sx={{
              marginTop: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center", // Optional: To center the contents horizontally
              gap: 2,
            }}
          >
            <Rating
              name="half-rating"
              value={rating} // Bind value to the rating state
              precision={0.5}
              onChange={(event, newValue) => handelNewRating(newValue)} // Update state on change
            />

            {!display && (
              <>
                {mealOption.type === "snack" && (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 2,
                      marginTop: 2,
                    }}
                  >
                    <FormControl sx={{ minWidth: 110 }}>
                      <InputLabel id="snack-select-label">Select as</InputLabel>
                      <Select
                        labelId="snack-select-label"
                        value={selectedSnack}
                        label="Select Snack"
                        onChange={handleSnackChange}
                      >
                        <MenuItem value="snack-1">Snack 1</MenuItem>
                        <MenuItem value="snack-2">Snack 2</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                )}
                <Tooltip title="Add to Today's Meals">
                  <span>
                    <Button
                      variant="contained"
                      onClick={() => handelAddDailyMeal()}
                      endIcon={<LocalDining />}
                      startIcon={<AddIcon />}
                      disabled={
                        (mealOption.type === "snack" && selectedSnack === "") ||
                        addingMeal
                      }
                    />
                  </span>
                </Tooltip>
              </>
            )}
            {/*TODO "You’ve already consumed a meal for this time. You can't select another." */}
            {display && (
              <Button
                variant="contained"
                onClick={() => handleConsumeMeal()}
                endIcon={<DoneIcon />}
                disabled={consumed}
              >
                I Ate This
              </Button>
            )}
          </Box>
        )}
      </CardContent>
    </Card>
  );
}

export default Meal;
