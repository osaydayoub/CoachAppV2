import React, { useEffect, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useData } from "../../context/DataContext";
import Meal from "../Meal/Meal";
import { isSameDay } from "../../utils/helpers";
import { Box  ,Button} from "@mui/material";
import { Link } from "react-router-dom";

export default function MealsAccordion() {
  const [dailyMeals, setdailyMeals] = useState(null);
  const [currentClientUpdated, setCurrentClientUpdated] = useState(false);
  const { currentClient, getCurrentClient } = useData();
  const updateCurrentClient = async () => {
    try {
      console.log(currentClient._id);
      const resTrack = await getCurrentClient(currentClient._id);
      console.log(resTrack);
    } catch (error) {
      console.error("Error fetching current client:", error);
    }
  };
  useEffect(() => {
    const update = async () => {
      try {
        await updateCurrentClient();
        setCurrentClientUpdated(true);
      } catch (error) {}
    };
    if (currentClient?._id) {
      // Check if currentClient and _id exist
      update();
    }
  }, []);

  useEffect(() => {
    if (currentClientUpdated) {
      const dailyMeals = currentClient?.dailyMeals.find((daily) =>
        isSameDay(new Date(daily.date), new Date())
      );
      console.log(dailyMeals);
      setdailyMeals(dailyMeals);
    }
  }, [currentClientUpdated, currentClient]);
  const mealTypes = [
    { title: "Breakfast", key: "breakfast", path: "breakfast" },
    { title: "First Snack", key: "snack-1", path: ["snacks", 0] },
    { title: "Lunch", key: "lunch", path: "lunch" },
    { title: "Second Snack", key: "snack-2", path: ["snacks", 1] },
    { title: "Dinner", key: "dinner", path: "dinner" },
  ];
  return (
    <Box sx={{ width: 300 }}>
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
              {meal.title}
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
              ) : (
                `${meal.title} Meal for Today Not Chosen!`
              )}
            </AccordionDetails>
          {(!mealData||!mealData?.consumed) && <AccordionActions>
              <Button
                component={Link}
                to={`/meals/${meal.title.split(' ').pop().toLowerCase()}`}  
                size="small"
              >
                Add/Choose
              </Button>
            </AccordionActions>}
          </Accordion>
        );
      })}
    </Box>
  );
}
