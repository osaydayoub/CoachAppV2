import React, { useEffect, useRef, useState } from "react";
import { isSameDay } from "../../utils/helpers.js";
import "./DailyTracking.css";
import { useData } from "../../context/DataContext.jsx";
import SingleTracking from "../SingleTracking/SingleTracking.jsx";
import Button from "@mui/material/Button";
import UpdateIcon from "@mui/icons-material/Update";

function DailyTracking() {
  const [adding, setAdding] = useState(false);
  const [calories, setCalories] = useState(0);
  const [waterAmount, setWaterAmount] = useState(0);
  const [sleepHours, setSleepHours] = useState(0);
  const [dailyTracking, setDailyTracking] = useState(null);
  const { currentClient, addDailyTracking, getCurrentClient } = useData();

  useState(() => {
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
    setDailyTracking(track);
  }, []);

  const handleUpdateDailyTracking = async (e) => {
    e.preventDefault();
    console.log("handleUpdateDailyTracking");
    try {
      setAdding(true);
      const newTrack = {
        date: dailyTracking.date,
        calories: dailyTracking.calories,
        waterAmount: dailyTracking.waterAmount,
        sleepHours: dailyTracking.sleepHours,
      };
      const updatednewTrack = {
        date: dailyTracking.date,
        calories: Number(dailyTracking.calories) + Number(calories),
        waterAmount: Number(dailyTracking.waterAmount) + Number(waterAmount),
        sleepHours: Number(dailyTracking.sleepHours) + Number(sleepHours),
      };
      await addDailyTracking(currentClient._id, updatednewTrack);
      const resTrack = await getCurrentClient(currentClient._id);
      const track = resTrack.dailyTracking.find((track) => {
        return isSameDay(new Date(track.date), new Date());
      });
      setDailyTracking(track);
    } catch (error) {
      console.log(error);
      console.log("error in handleDailyTracking");
    }
    setAdding(false);
    setCalories(0);
    setSleepHours(0);
    setWaterAmount(0);
  };

  return (
    <div className="daily-tracking-container">
      <h3>add here!</h3>
      {dailyTracking && (
        <div className="change-container">
          <SingleTracking
            trackingType={"Calories"}
            dailyTracking={dailyTracking.calories}
            trackingState={calories}
            trackingStateHandler={setCalories}
          />
          <SingleTracking
            trackingType={"Water Amount"}
            dailyTracking={dailyTracking.waterAmount}
            trackingState={waterAmount}
            trackingStateHandler={setWaterAmount}
          />
          <SingleTracking
            trackingType={"Sleep Hours"}
            dailyTracking={dailyTracking.sleepHours}
            trackingState={sleepHours}
            trackingStateHandler={setSleepHours}
          />
          {/* <button
            className="update-btn"
            onClick={handleUpdateDailyTracking}
            disabled={adding}
          >
            Update
          </button> */}
          <Button
            variant="contained"
            endIcon={<UpdateIcon />}
            onClick={handleUpdateDailyTracking}
            disabled={adding}
          >
            Update
          </Button>
        </div>
      )}
    </div>
  );
}

export default DailyTracking;
