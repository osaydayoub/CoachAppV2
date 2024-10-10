import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./Homepage.css";
import { useData } from "../../context/DataContext.jsx";
import { isSameDay } from "../../utils/helpers.js";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import { Box, Stack, Typography } from "@mui/material";
import WorkoutsCarousel from "../../components/WorkoutsCarousel/WorkoutsCarousel.jsx";
import MealsAccordion from "../../components/MealsAccordion/MealsAccordion.jsx";
import BarcodeScanner from "../../components/BarcodeScanner/BarcodeScanner.jsx";
function Homepage() {
  const { currentUser, isLoggedIn } = useAuth();
  const { currentClient } = useData();
  const [dailyTracking, setDailyTracking] = useState(null);
  const { workoutsData, getWorkouts } = useData();
  const [workoutsToDisply, setWorkoutsToDisply] = useState(null);

  useEffect(() => {
    if (isLoggedIn && currentUser.isAdmin) {
      if (workoutsData == null) {
        getWorkouts();
      }
    }
  }, [currentUser.isAdmin]);

  useEffect(() => {
    if (workoutsData != null) {
      const workoutsForToday = workoutsData?.filter((workout) => {
        return isSameDay(new Date(workout.date), new Date())&&(new Date(workout.date)>= new Date());
      });
      setWorkoutsToDisply(workoutsForToday);
    }
  }, [workoutsData]);

  useEffect(() => {
    if (currentClient != null) {
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
    }
  }, []);

  return currentUser.isAdmin ? (
    <div className="Homepage page">
      <h2>{`Hello ${currentUser.name} !`}</h2>
      <div>
        <Box sx={{ mb: 2 }}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <EventAvailableIcon sx={{ color: "primary.main", fontSize: 28 }} />
            <Typography variant="h5" color="textPrimary">
            Upcoming Workouts for Today
            </Typography>
          </Stack>
        </Box>
        <WorkoutsCarousel
          workoutsToDisply={workoutsToDisply}
          isViewOnly={true}
          isAdmin={currentUser.isAdmin}
        ></WorkoutsCarousel>
      </div>
      <BarcodeScanner/>
    </div>
  ) : (
    <div className="client-homepage Homepage page">
      <div>
      <h2>{`Hello ${currentUser.name} !`}</h2>
      {dailyTracking && (
        <p>{`Your caloric intake is currently at ${currentClient.caloricIntake}
          , and you have consumed ${dailyTracking.calories} calories so far.`}</p>
      )}
      <div className="homepage-message-container">
        <p className="daily-message-container">
          Don't forget to log your calorie intake in your Daily Tracking.
          Whether you're maintaining, gaining, or losing, keeping an eye on your
          calories helps you stay on track with your health and fitness goals.
        </p>

        {dailyTracking && (
          <div className="progress-container">
            <div className="progress">
              <CircularProgressbar
                value={Math.floor(
                  (dailyTracking.calories / currentClient.caloricIntake) * 100
                )}
                text={`${Math.floor(
                  (dailyTracking.calories / currentClient.caloricIntake) * 100
                )}%`}
              />
            </div>
          </div>
        )}
      </div>
</div>
      <MealsAccordion />
      <BarcodeScanner/>
    </div>
  );
}

export default Homepage;
