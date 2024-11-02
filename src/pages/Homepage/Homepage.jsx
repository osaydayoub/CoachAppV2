import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import "./Homepage.css";
import { useData } from "../../context/DataContext.jsx";
import { isSameDay } from "../../utils/helpers.js";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import { Box, Stack, Typography } from "@mui/material";
import WorkoutsCarousel from "../../components/WorkoutsCarousel/WorkoutsCarousel.jsx";
import MealsAccordion from "../../components/MealsAccordion/MealsAccordion.jsx";
import DailyTrackingSummary from "../../components/DailyTrackingSummary/DailyTrackingSummary.jsx";
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
        return (
          isSameDay(new Date(workout.date), new Date()) &&
          new Date(workout.date) >= new Date()
        );
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
  }, [currentClient]);

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
    </div>
  ) : (
    <div className="client-homepage Homepage page">
      <DailyTrackingSummary
        currentUser={currentUser}
        dailyTracking={dailyTracking}
        currentClient={currentClient}
      />
      {currentClient && <MealsAccordion />}
    </div>
  );
}

export default Homepage;
