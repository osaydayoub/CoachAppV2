import React, { useEffect, useState } from "react";
import { isSameDay } from "../../utils/helpers.js";
import { useData } from "../../context/DataContext.jsx";
import SingleTracking from "../SingleTracking/SingleTracking.jsx";
import { Box, Button, Typography, Paper } from "@mui/material";
import UpdateIcon from "@mui/icons-material/Update";
import { useAuth } from "../../context/AuthContext.jsx";

function DailyTracking() {
  const [adding, setAdding] = useState(false);
  const [calories, setCalories] = useState(0);
  const [waterAmount, setWaterAmount] = useState(0);
  const [sleepHours, setSleepHours] = useState(0);
  const [dailyTracking, setDailyTracking] = useState(null);
  const { currentClient, addDailyTracking, getCurrentClient } = useData();
  const {t}=useAuth();

  useEffect(() => {
    if (currentClient) {
      let track = currentClient.dailyTracking.find((track) => {
        return isSameDay(new Date(track.date), new Date());
      });
      if (track === undefined) {
        console.log("still no data");
        const newTrack = {
          date: new Date(),
          calories: 0,
          waterAmount: 0,
          sleepHours: 0,
        };
        track = newTrack;
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
    <Paper
      elevation={4}
      sx={{
        p: 2,
        maxWidth: 400,
      }}
    >
      {/* Title */}
      <Typography variant="h5" component="h1" align="center" gutterBottom>
        {t("TrackingPage.Daily Tracking")}
      </Typography>

      {/* Description */}
      <Typography variant="body1" align="center" gutterBottom>
        {t("TrackingPage.Daily Tracking message")}
        {/* to keep a record of your progress and maintain a comprehensive overview of your
        daily activities and goals. */}
      </Typography>

      {/* Tracking Data Box */}
      <Box p={1}>
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
              {adding ? t("TrackingPage.Updating...") : t("TrackingPage.Update")}
            </Button>
          </Box>
        )}
      </Box>
    </Paper>
  );
}

export default DailyTracking;
