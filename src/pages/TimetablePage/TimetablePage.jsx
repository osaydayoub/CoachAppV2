import React, { useEffect, useState } from "react";
import "./TimetablePage.css";
import { useAuth } from "../../context/AuthContext.jsx";
import { dateIsWithinSevenDays } from "../../utils/helpers.js";
import WorkoutsCarousel from "../../components/WorkoutsCarousel/WorkoutsCarousel.jsx";
import { Box, Tab, Tabs } from "@mui/material";
import WorkoutsCalendar from "../../components/WorkoutsCalendar/WorkoutsCalendar.jsx";
import { useData } from "../../context/DataContext.jsx";

function TimetablePage() {
  const { currentUser } = useAuth();
  const { currentClient } = useData();
  const [workoutsToDisply, setWorkoutsToDisply] = useState(null);
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  useEffect(() => {
    if (!currentUser.isAdmin&&currentClient) {
      const currentUserWorkouts = currentClient.workouts;
      currentUserWorkouts.sort((a, b) => new Date(a.date) - new Date(b.date));
      const filterdWorkouts = currentUserWorkouts.filter((workout) => {
        return dateIsWithinSevenDays(workout.date);
      });

      setWorkoutsToDisply(filterdWorkouts);
    }
  }, [currentClient]);

  return (
    <div className="TimetablePage page">
      {currentUser.isAdmin ? (
        <WorkoutsCalendar />
      ) : (
        <div className="cont">
          <Box sx={{ width: "100%" }}>
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              // centered
              variant="scrollable"
              scrollButtons="auto"
            >
              <Tab label="Workouts Calendar" />
              <Tab label="7-day Workouts" />
            </Tabs>

            <Box
              sx={{
                pt: 2,
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              {activeTab === 0 && <WorkoutsCalendar />}
              {activeTab === 1 && !currentUser.isAdmin && workoutsToDisply && (
                <div className="calendar-message-container">
                  <Box
                    sx={{
                      p: 1,
                      pt: 0,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 5,
                      margin: 2,
                      maxWidth: 400,
                      height: 350,
                      border: "1px solid",
                      borderColor: "primary.main",
                      borderRadius: "8px",
                      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.4)",
                    }}
                  >
                    <h3>Workouts in the upcoming 7 days</h3>
                    <WorkoutsCarousel
                      autoPlay={false}
                      workoutsToDisply={workoutsToDisply}
                      isViewOnly={false}
                      isAdmin={currentUser.isAdmin}
                    ></WorkoutsCarousel>
                  </Box>
                </div>
              )}
            </Box>
          </Box>
        </div>
      )}
    </div>
  );
}

export default TimetablePage;
