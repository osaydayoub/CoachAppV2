import React, { useState } from "react";
import "./TrackingPage.css";
import { useAuth } from "../../context/AuthContext.jsx";
import { useData } from "../../context/DataContext.jsx";
import DailyTracking from "../../components/DailyTracking/DailyTracking";
import WeightTracking from "../../components/WeightTracking/WeightTracking.jsx";
import BarcodeScanner from "../../components/BarcodeScanner/BarcodeScanner.jsx";
import { Box, Tab, Tabs, Typography } from "@mui/material";
function TrackingPage() {
  const { currentUser } = useAuth();
  const { currentClient } = useData();
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
              // centered
              variant="scrollable"
              scrollButtons="auto"
            >
              <Tab label="Daily Tracking" />
              <Tab label="Weight Tracking" />
              <Tab label="Barcode Scanner" />
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
              {activeTab === 0 && <DailyTracking />}
              {activeTab === 1 && <WeightTracking />}
              {activeTab === 2 && <BarcodeScanner />}
            </Box>
          </Box>
        </div>
      )}
      {currentUser.isAdmin && (
        <>
          <h2> Admin Daily Tracking</h2>
          <BarcodeScanner />
        </>
      )}
    </div>
  );
}

export default TrackingPage;
