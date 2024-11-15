import React from "react";
import { Box, Typography, CircularProgress, Paper } from "@mui/material";
import { getCurrentDateTime, getGreeting } from "../../utils/helpers";
import { useAuth } from "../../context/AuthContext";
const circle = true;
function DailyTrackingSummary({ currentUser, dailyTracking, currentClient }) {
  const { t, language } = useAuth();
  const progressPercentage = dailyTracking
    ? Math.floor((dailyTracking.calories / currentClient.caloricIntake) * 100)
    : 0;

  const isArabic = language === "ar";
  const textAlign = isArabic ? "right" : "left";

  return (
    <Paper elevation={3} sx={{ padding: 1, borderRadius: 2 }}>
      <Box sx={{ marginBottom: 2, textAlign }}>
        <Box sx={{ textAlign: textAlign == "left" ? "right" : "left", m: 1 }}>
          <Typography variant="body1" color="textSecondary">
            {getCurrentDateTime()}
          </Typography>
        </Box>
        <Typography variant="h6" component="h2" sx={{ mb: 1 }}>
          {language == "en"
            ? `${t(getGreeting())}, ${currentUser.name}!`
            : `!${currentUser.name},${t(getGreeting())}`}
        </Typography>

        {dailyTracking && (
          <Box>
            <Box
              sx={{
                backgroundColor: "#f0f0f0",
                padding: 1,
                borderRadius: 1,
                marginBottom: 1,
              }}
            >
              <Typography variant="body1">
                {`${t("first client daily message")}: ${
                  currentClient.caloricIntake
                } ${t("calories")}`}
              </Typography>
            </Box>
            <Box
              sx={{
                backgroundColor: "#f0f0f0",
                padding: 1,
                borderRadius: 1,
                marginBottom: 1,
              }}
            >
              <Typography variant="body1">
                {`${t("second client daily message")}: ${
                  dailyTracking.calories
                } ${t("calories")}`}
              </Typography>
            </Box>
            <Box
              sx={{
                backgroundColor: "#f0f0f0",
                padding: 1,
                borderRadius: 1,
                marginBottom: 1,
              }}
            >
              <Typography variant="body1" fontWeight="bold">
                {`${t("third client daily message")}: ${
                  currentClient.caloricIntake - dailyTracking.calories
                } ${t("calories")}`}
              </Typography>
            </Box>

            <Box
              sx={{
                marginTop: 3,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {circle && (
                <Box sx={{ position: "relative", display: "inline-flex" }}>
                  {/* Full Circle Background */}
                  <CircularProgress
                    variant="determinate"
                    value={100}
                    size={120}
                    thickness={6}
                    sx={{
                      color: "#939292", // Background color for the full circle
                    }}
                  />
                  {/* Actual Progress */}
                  <CircularProgress
                    variant="determinate"
                    value={progressPercentage}
                    size={120}
                    thickness={6}
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
                    <Typography
                      variant="caption"
                      component="div"
                      color="textSecondary"
                      fontWeight="bold"
                      sx={{ fontSize: "1.2rem" }}
                    >
                      {`${progressPercentage}%`}
                    </Typography>
                  </Box>
                </Box>
              )}
              {!circle && (
                <Box sx={{ position: "relative", width: 220, height: 30 }}>
                  {/* Full Rectangle Background */}
                  <Box
                    sx={{
                      width: "100%",
                      height: "100%",
                      backgroundColor: "#939292", // Background color for the full rectangle
                      borderRadius: 1, // Optional for rounded corners
                    }}
                  />
                  {/* Actual Progress */}
                  <Box
                    sx={{
                      width: `${progressPercentage}%`, // Adjust width based on progress
                      height: "100%",
                      backgroundColor: "#fd8e06", // Progress color
                      position: "absolute",
                      top: 0,
                      left: 0,
                      borderRadius: 1, // Optional for rounded corners
                      // maxWidth?
                    }}
                  />
                  {/* Percentage Text in the Center */}
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography
                      variant="caption"
                      component="div"
                      color="textSecondary"
                      fontWeight="bold"
                    >
                      {`${progressPercentage}%`}
                    </Typography>
                  </Box>
                </Box>
              )}
            </Box>
          </Box>
        )}

        <Box sx={{ marginTop: 3, textAlign }}>
          <Typography variant="body1">{t("forth client message")}</Typography>
        </Box>
      </Box>
    </Paper>
  );
}

export default DailyTrackingSummary;
