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
} from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle"; // For dot icons
import { useData } from "../../context/DataContext";
import { useAuth } from "../../context/AuthContext";
import LocalDining from "@mui/icons-material/LocalDining";
import AddIcon from "@mui/icons-material/Add";
import DoneIcon from '@mui/icons-material/Done';

function Meal({ mealOption, setMealsChanged, display }) {
  const [rating, setRating] = useState(null);
  const { currentClient, addMealRating, addDailyMeal,AddCaloriesToDailyTracking } = useData();
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentClient) {
      const clientRating = mealOption?.ratings?.[currentClient._id];
      setRating(clientRating ?? 0);
    }
  }, [currentClient]);

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
      const dailyMeal = await addDailyMeal(
        currentClient._id,
        mealOption._id,
        mealOption.type
      );
    } catch (error) {
      console.log(error);
      console.log("error in handelNewRating");
    }
  };

  const handleConsumeMeal=async()=>{
    console.log("handleConsumeMeal");
    //TODO change flage to consumed =true!
    try {
      await AddCaloriesToDailyTracking(mealOption.totalCalories)
    } catch (error) {
      console.log("error in handleConsumeMeal")
    }
    
  }

  return (
    <Card sx={{ maxWidth: 345, margin: 2 }}>
      <CardContent>
        <List>
          {mealOption.ingredients.map((ingredient) => (
            <ListItem key={ingredient.name} disablePadding>
              <Box display="flex" alignItems="center">
                <CircleIcon sx={{ fontSize: 8, marginRight: 1 }} />
                <Typography variant="body2" color="text.secondary">
                  {`${ingredient.name} - ${ingredient.amount} ${ingredient.unit}`}
                </Typography>
              </Box>
            </ListItem>
          ))}
        </List>
        <Typography variant="h6" sx={{ marginTop: 2 }}>
          Total Calories: {mealOption.totalCalories}
        </Typography>
        {/* Add the Rating component here */}
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
            {/* <Button
              variant="contained"
              endIcon={<LocalDiningIcon />}
              onClick={() => handelAddDailyMeal()}
            >
              Add to Today's Meals
            </Button> */}

            {!display && (
              <Tooltip title="Add to Today's Meals">
                <Button
                  variant="contained"
                  onClick={() => handelAddDailyMeal()}
                  endIcon={<LocalDining />}
                  startIcon={<AddIcon />}
                />
              </Tooltip>
            )}
{/* "You’ve already consumed a meal for this time. You can't select another." */}
            {display && (
              <Button
                variant="contained"
                onClick={() => handleConsumeMeal()}
                endIcon={<DoneIcon />}
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
