import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import "./Homepage.css";
import { useData } from "../../context/DataContext.jsx";
import {
  getCurrentDateTime,
  getGreeting,
  isSameDay,
} from "../../utils/helpers.js";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import { Paper, Box, Stack, Typography, Button } from "@mui/material";
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
      <Paper
        elevation={3}
        sx={{
          mt: 2,
          padding: 2,
          borderRadius: 2,
          textAlign: "center",
          backgroundColor: "#f9f9f9",
          minHeight: 400,
        }}
      >
        <Box sx={{ mb: 2 }}>
          <Typography variant="body1" color="textSecondary">
            {getCurrentDateTime()}
          </Typography>
        </Box>
        <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
          {`${getGreeting()}, ${currentUser.name}!`}
        </Typography>
        <Box
          sx={{
            backgroundColor: "#f0f0f0",
            padding: 2,
            borderRadius: 1,
            mb: 2,
            textAlign: "left",
          }}
        >
          <Stack direction="row" alignItems="center" spacing={1}>
            <EventAvailableIcon sx={{ color: "primary.main", fontSize: 20 }} />
            <Typography variant="body1" color="textPrimary">
              Upcoming Workouts for Today
            </Typography>
            <Typography
              component={Link}
              to="/timetable"
              sx={{
                textDecoration: "underline",
                cursor: "pointer",
                color: "primary.main",
                fontSize: "0.875rem",
              }}
            >
              More...
            </Typography>
          </Stack>
        </Box>
        <Box sx={{ mt: 2 }}>
          <WorkoutsCarousel
            workoutsToDisply={workoutsToDisply}
            isViewOnly={true}
            isAdmin={currentUser.isAdmin}
          />
        </Box>
      </Paper>
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
