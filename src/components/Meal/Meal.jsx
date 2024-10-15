import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  Box,
  Rating,
} from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle"; // For dot icons
import { useData } from "../../context/DataContext";
import { useAuth } from "../../context/AuthContext";


function Meal({ mealOption ,setMealsChanged}) {
  const [rating, setRating] = useState(null);
  const { currentClient,addMealRating} = useData();
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
      const updatedClient = await addMealRating(mealOption._id,currentClient._id, newValue);
      setMealsChanged(true);
    } catch (error) {
      console.log(error);
      console.log("error in handelNewRating");
    }
  
    setRating(newValue)
  };

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
       {!currentUser.isAdmin && <Box sx={{ marginTop: 2 }}>         
          <Rating
            name="half-rating"
            value={rating} // Bind value to the rating state
            precision={0.5}
            onChange={(event, newValue) => handelNewRating(newValue)} // Update state on change
          />
        </Box>}
      </CardContent>
    </Card>
  );
}

export default Meal;
