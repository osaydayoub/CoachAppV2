import React, { useEffect, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useData } from "../../context/DataContext";
import Meal from "../Meal/Meal";
import { isSameDay, isToday } from "../../utils/helpers";
import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import LocalDiningIcon from '@mui/icons-material/LocalDining';

export default function MealsAccordion() {
  const [dailyMeals, setdailyMeals] = useState(null);
  const { currentClient } = useData();
  const { t, language } = useAuth();

  useEffect(() => {
    if (currentClient) {
      const dailyMeals = currentClient?.dailyMeals.find((daily) =>
        // isSameDay(new Date(daily.date), new Date())
        isToday(daily.date)
      );
      console.log(dailyMeals);
      setdailyMeals(dailyMeals);
    }
  }, [currentClient]);
  const mealTypes = [
    { title: "Breakfast", key: "breakfast", path: "breakfast" },
    { title: "First Snack", key: "snack-1", path: ["snacks", 0] },
    { title: "Lunch", key: "lunch", path: "lunch" },
    { title: "Second Snack", key: "snack-2", path: ["snacks", 1] },
    { title: "Dinner", key: "dinner", path: "dinner" },
  ];
  return (
    <Box sx={{ width: 300 }}>
      <Box
        sx={{
          backgroundColor: "#f0f0f0",
          padding: 1,
          borderRadius: 1,
          marginBottom: 2,
          textAlign: "center",
          display:"flex",
          flexDirection:"row",
          alignContent:"center",
          justifyContent:"center",
          gap:1
        }}
      >
        <Typography variant="h6" component="div">
          {t("Your Daily Meals")}
        </Typography>
        <LocalDiningIcon sx={{mt:0.3}}/>
      </Box>
      {mealTypes.map((meal) => {
        const mealData = Array.isArray(meal.path)
          ? dailyMeals?.[meal.path[0]]?.[meal.path[1]]
          : dailyMeals?.[meal.path];

        return (
          <Accordion key={meal.key} sx={{ width: "300px" }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`${meal.key}-content`}
              id={`${meal.key}-header`}
            >
              {t(meal.title)}
            </AccordionSummary>
            <AccordionDetails
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {mealData ? (
                <Meal
                  mealOption={mealData.meal}
                  mealType={meal.key}
                  consumed={mealData.consumed}
                  display={true}
                />
              ) : language == "en" ? (
                `${t(meal.title)}${t("Meal Not Chosen message")}`
              ) : (
                `${t("Meal Not Chosen message")} ${t(meal.title)}`
              )}
            </AccordionDetails>
            {(!mealData || !mealData?.consumed) && (
              <AccordionActions>
                <Button
                  component={Link}
                  to={`/meals/${meal.title.split(" ").pop().toLowerCase()}`}
                  size="small"
                >
                  {t("Add/Choose")}
                </Button>
              </AccordionActions>
            )}
          </Accordion>
        );
      })}
    </Box>
  );
}
