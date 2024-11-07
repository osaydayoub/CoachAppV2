import React from 'react'
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import logo from "/src/assets/images/big-logo.png";
function LoadingScreen() {
  return (
    <Box
    display="flex"
    flexDirection="column"
    alignItems="center"
    justifyContent="center"
    height="100vh"
  >
    <img
      src={logo}
      alt="Loading logo"
      width="200"
      height="200"
      style={{ marginBottom: "20px" }}
    />
    <CircularProgress sx={{ color: "#EB5406" }} />
  </Box>
  )
}

export default LoadingScreen