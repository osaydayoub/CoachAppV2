import React, { useState } from "react";
import "./TrackingPage.css";
import { useAuth } from "../../context/AuthContext.jsx";
import DailyTracking from "../../components/DailyTracking/DailyTracking";
import WeightTracking from "../../components/WeightTracking/WeightTracking.jsx";

import { Box, Tab, Tabs } from "@mui/material";
import CaloricIntakeCalculator from "../../components/CaloricIntakeCalculator/CaloricIntakeCalculator.jsx";
function TrackingPage() {
  const { currentUser,t } = useAuth();
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
              <Tab label={t("TrackingPage.Daily Tracking")} />
              <Tab label={t("TrackingPage.Weight Tracking")} />
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
          {/* <h2> Admin Daily Tracking</h2> */}
          <CaloricIntakeCalculator/>
        </>
      )}
    </div>
  );
}

export default TrackingPage;
