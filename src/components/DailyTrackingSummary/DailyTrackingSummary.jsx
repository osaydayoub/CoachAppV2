import React from "react";
import { Box, Typography, CircularProgress, Paper } from "@mui/material";

function DailyTrackingSummary({ currentUser, dailyTracking, currentClient }) {
  const progressPercentage = dailyTracking
    ? Math.floor((dailyTracking.calories / currentClient.caloricIntake) * 100)
    : 0;

  return (
    <Paper elevation={3} sx={{  padding: 3, borderRadius: 2 }}>
      <Box sx={{ marginBottom: 2 }}>
        <Typography variant="h6" component="h2">
          {`Hello ${currentUser.name} !`}
        </Typography>

        {dailyTracking && (
          <Typography variant="body1" sx={{ marginTop: 2 }}>
            {`Your caloric intake is currently at ${currentClient.caloricIntake}, and you have consumed ${dailyTracking.calories} calories so far.`}
          </Typography>
        )}

        <Box sx={{ marginTop: 3 }}>
          <Typography variant="body1">
            Don't forget to log your calorie intake in your Daily Tracking.
            Whether you're maintaining, gaining, or losing, keeping an eye on
            your calories helps you stay on track with your health and fitness
            goals.
          </Typography>

          {dailyTracking && (
            <Box
              sx={{
                marginTop: 3,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box sx={{ position: "relative", display: "inline-flex" }}>
                {/* Full Circle Background */}
                <CircularProgress
                  variant="determinate"
                  value={100}
                  size={120}
                  thickness={4}
                  sx={{
                    color: "#939292", // Background color for the full circle
                  }}
                />
                {/* Actual Progress */}
                <CircularProgress
                  variant="determinate"
                  value={progressPercentage}
                  size={120}
                  thickness={4}
                  sx={{
                    color: "#fd8e06", // Customize the color of the progress circle
                    position: "absolute", // Stack on top of the full circle
                    left: 0,
                  }}
                />
                {/* Percentage Text in the Center */}
                <Box
                  sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: "absolute",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography variant="caption" component="div" color="textSecondary">
                    {`${progressPercentage}%`}
                  </Typography>
                </Box>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Paper>
  );
}

export default DailyTrackingSummary;
