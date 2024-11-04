import React, { useEffect, useState } from "react";
import { isSameDay } from "../../utils/helpers.js";
import { useData } from "../../context/DataContext.jsx";
import SingleTracking from "../SingleTracking/SingleTracking.jsx";
import { Box, Button, Typography, Paper } from "@mui/material";
import UpdateIcon from "@mui/icons-material/Update";

function DailyTracking() {
  const [adding, setAdding] = useState(false);
  const [calories, setCalories] = useState(0);
  const [waterAmount, setWaterAmount] = useState(0);
  const [sleepHours, setSleepHours] = useState(0);
  const [dailyTracking, setDailyTracking] = useState(null);
  const { currentClient, addDailyTracking, getCurrentClient } = useData();

  useEffect(() => {
    if(currentClient){
      let track = currentClient.dailyTracking.find((track) => {
        return isSameDay(new Date(track.date), new Date());
      });
      if (track === undefined) {
        console.log("still no data");
        const t = {
          date: new Date(),
          calories: 0,
          waterAmount: 0,
          sleepHours: 0,
        };
        track = t;
      }
      setDailyTracking(track);
    }

  }, [currentClient]);

  const handleUpdateDailyTracking = async () => {
    console.log("handleUpdateDailyTracking");
    try {
      setAdding(true);

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
    <Box
      sx={{
        p: 2,
        maxWidth: 400,
        border: "2px solid #1976d2",
        borderRadius: "8px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.4)",
      }}
    >
      {/* Title */}
      <Typography variant="h5" component="h1" align="center" gutterBottom>
        Daily Tracking
      </Typography>

      {/* Description */}
      <Typography variant="body1" align="center" gutterBottom>
        Please take a moment to add or update your Daily Tracking to keep a
        record of your progress and maintain a comprehensive overview of your
        daily activities and goals.
      </Typography>

      {/* Tracking Data Box */}
      <Paper
        elevation={4}
        sx={{
          p: 1,
          borderRadius: "10px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        {dailyTracking && (
          <Box sx={{ mt: 2 }}>
            {/* Calories Tracking */}
            <SingleTracking
              trackingType={"Calories"}
              dailyTracking={dailyTracking.calories}
              trackingState={calories}
              trackingStateHandler={setCalories}
            />

            {/* Water Amount Tracking */}
            <SingleTracking
              trackingType={"Water Amount"}
              dailyTracking={dailyTracking.waterAmount}
              trackingState={waterAmount}
              trackingStateHandler={setWaterAmount}
            />

            {/* Sleep Hours Tracking */}
            <SingleTracking
              trackingType={"Sleep Hours"}
              dailyTracking={dailyTracking.sleepHours}
              trackingState={sleepHours}
              trackingStateHandler={setSleepHours}
            />

            {/* Update Button */}
            <Button
              variant="contained"
              color="primary"
              endIcon={<UpdateIcon />}
              onClick={handleUpdateDailyTracking}
              disabled={adding}
              fullWidth
              sx={{ mt: 3 }}
            >
              {adding ? "Updating..." : "Update"}
            </Button>
          </Box>
        )}
      </Paper>
    </Box>
  );
}

export default DailyTracking;
