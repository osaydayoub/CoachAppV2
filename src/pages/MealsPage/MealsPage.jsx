import React from "react";
import "./MealsPage.css";
import MealCard from "../../components/MealCard/MealCard";
import {
  Box,
  Typography,
} from "@mui/material";
function MealsPage() {
  const mealsData = [
    { name: "Breakfast", img: "1.jpg" },
    { name: "Lunch", img: "2.jpg" },
    { name: "Snack", img: "3.jpg" },
    { name: "Dinner", img: "4.jpg" },
  ];
  return (
    <div className="MealsPage page">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 4,
          gap: 3,
          backgroundColor: "#f5f5f5",
          borderRadius: 2,
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          maxWidth: 600,
          margin: "0 auto",
          mt: 1,
        }}
      >
        <Typography variant="h4" gutterBottom>
          {`Meals for Today`}
        </Typography>
        <Typography gutterBottom>
          Feel free to choose any meal from the four options - Breakfast, Lunch,
          Snack, or Dinner. Customize your Daily Tracking with the meals that
          best suit your preferences and nutritional goals
        </Typography>
      </Box>

      <div className="cards-container" id="cards-id">
        {mealsData.map((meal, index) => {
          return <MealCard key={index} meal={meal} />;
        })}
      </div>
    </div>
  );
}

export default MealsPage;
