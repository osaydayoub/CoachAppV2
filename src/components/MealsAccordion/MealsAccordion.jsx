import React, { useEffect, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import { useData } from "../../context/DataContext";
import Meal from "../Meal/Meal";
import { isSameDay } from "../../utils/helpers";

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
  }, [currentClientUpdated,currentClient]);
  return (
    <div style={{ width: "450px" }}>
      {/* TODO use map for creating diff Accordions */}
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          Breakfast
        </AccordionSummary>
        <AccordionDetails>
          {dailyMeals && dailyMeals.breakfast ? (
            <Meal mealOption={dailyMeals.breakfast.meal} consumed={dailyMeals.breakfast.consumed} display={true} />
          ) : (
            "Breakfast Meal for Today Not Chosen!"
          )}
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          First Snack
        </AccordionSummary>

        {dailyMeals && dailyMeals.snacks[0] ? (
          <Meal mealOption={dailyMeals.snacks[0].meal} mealType={"snack-1"}consumed={dailyMeals.snacks[0].consumed} display={true} />
        ) : (
          <AccordionDetails>No First Snack picked for Today</AccordionDetails>
        )}
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          Lunch
        </AccordionSummary>
        <AccordionDetails>
          {dailyMeals && dailyMeals.lunch ? (
            <Meal mealOption={dailyMeals.lunch.meal} consumed={dailyMeals.lunch.consumed} display={true} />
          ) : (
            "Lunch Meal for Today Not Chosen!"
          )}
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          Second Snack
        </AccordionSummary>
        <AccordionDetails>
          {dailyMeals && dailyMeals.snacks[1] ? (
            <Meal mealOption={dailyMeals.snacks[1].meal} mealType={"snack-2"} consumed={dailyMeals.snacks[1].consumed} display={true} />
          ) : (
            "Second Snack for Today Not Chosen!"
          )}
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          Dinner
        </AccordionSummary>
        <AccordionDetails>
          {dailyMeals && dailyMeals.dinner ? (
            <Meal mealOption={dailyMeals.dinner.meal} consumed={dailyMeals.dinner.consumed}display={true} />
          ) : (
            "Dinner Meal for Today Not Chosen!"
          )}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
