import React, { useState } from "react";
import "./TrackingPage.css";
import { useAuth } from "../../context/AuthContext.jsx";
import DailyTracking from "../../components/DailyTracking/DailyTracking";
import WeightTracking from "../../components/WeightTracking/WeightTracking.jsx";

import { Box, Tab, Tabs } from "@mui/material";
function TrackingPage() {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <div className="TrackingPage page">
      {!currentUser.isAdmin && (
        <div className="add-track-container">
          <Box sx={{ width: "100%" }}>
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              centered
              // variant="scrollable"
              // scrollButtons="auto"
            >
              <Tab label="Daily Tracking" />
              <Tab label="Weight Tracking" />
            </Tabs>

            <Box
              sx={{
                mt:2,
                pt: 2,
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              {activeTab === 0 && <DailyTracking />}
              {activeTab === 1 && <WeightTracking />}
            </Box>
          </Box>
        </div>
      )}
      {currentUser.isAdmin && (
        <>
          <h2> Admin Daily Tracking</h2>
        </>
      )}
    </div>
  );
}

export default TrackingPage;
