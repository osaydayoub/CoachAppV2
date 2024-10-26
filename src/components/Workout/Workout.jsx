import React, { useState } from "react";
import "./Workout.css";
import { getFullDate, getTime } from "../../utils/helpers.js";
import { useData } from "../../context/DataContext.jsx";
import EventBusyIcon from '@mui/icons-material/EventBusy';
import { Button } from "@mui/material";
import Notification from "../Notification/Notification.jsx";
function Workout({ workout, isAdmin, index, id, isViewOnly }) {
  const { deleteWorkout } = useData();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('info'); // Can be 'success', 'error', 'warning', 'info'

  const handleCancle = async () => {
    try {
      await deleteWorkout(id);
      setMessage("Workout Removed Successfully!")
      setOpen(true);
      setSeverity("success")
    } catch (error) {
      setMessage("error in deleteWorkout!")
      setOpen(true);
      setSeverity("error")
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
          <Button variant="contained" endIcon={<EventBusyIcon />}onClick={handleCancle}>
          Cancle
          </Button>
          <Notification open={open} setOpen={setOpen} message={message} severity={severity}></Notification>
        </div>
      )}
    </div>
  );
}

export default Workout;
