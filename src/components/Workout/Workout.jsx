import React from "react";
import "./Workout.css";
import { getFullDate, getTime } from "../../utils/helpers.js";
import { useData } from "../../context/DataContext.jsx";
import EventBusyIcon from '@mui/icons-material/EventBusy';
import { Button } from "@mui/material";
function Workout({ workout, isAdmin, index, id, isViewOnly }) {
  const { deleteWorkout } = useData();

  const handleCancle = async () => {
    try {
      await deleteWorkout(id);
    } catch (error) {
      console.log("error in deleteWorkout");
    }
  };

  return (
    <div
      className={
        index % 2 === 0
          ? "workout-1 workout-container"
          : "workout-2 workout-container"
      }
    >
      {isAdmin && <div>{`Client Name: ${workout.clientName}`} </div>}
      <div>{`Exercise: ${workout.exercise}`}</div>
      {/* <div>{`Date: ${getFullDate(new Date(workout.date))}`}</div> */}
      {(!isAdmin || isViewOnly) && (
        <div>{`Date: ${getFullDate(new Date(workout.date))}`}</div>
      )}
      <div>{`Time: ${getTime(new Date(workout.date))}`}</div>
      {isAdmin && !isViewOnly && (
        <div>
          {/* <button className="workout-btn" onClick={handleCancle}>
            Cancle
          </button> */}
          <Button variant="contained" endIcon={<EventBusyIcon />}onClick={handleCancle}>
          Cancle
          </Button>
        </div>
      )}
    </div>
  );
}

export default Workout;
