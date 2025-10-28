import React, { useEffect, useState } from 'react'
// import './LoginPage.css'
import Login from '../../components/Login/Login';
import SignUp from '../../components/SignUp/SignUp';
import loginImg from "../../assets/images/loginImg.jpg";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Box, Paper, Tab, Tabs, Typography } from '@mui/material';
import { alpha } from "@mui/material/styles";


function LoginPage() {
  const [login, signUp] = ['login', 'signUp']
  const [selectedComponent, setSelectedComponent] = useState(login);
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  // Redirect to homepage if already logged in
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/'); // Redirect to the homepage
    }
  }, [isLoggedIn, navigate]);

  function handleComponentChange() {
    if (selectedComponent === login) {
      setSelectedComponent(signUp);
    } else {
      setSelectedComponent(login);

    }
  }
  return (
    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Paper sx={{ display: "flex", margin: { xs: 2, md: 4 }, width: { xs: "90%", md: "70%" }, overflow: "hidden" }} elevation={3} >
        <Box sx={{
          width: { xs: "100%", md: "50%" },
          py: 1,
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",

        }}>
          <Tabs
            value={selectedComponent}
            onChange={(event, newValue) => setSelectedComponent(newValue)}
            sx={{
              "& .MuiTab-root": { textTransform: "none", fontWeight: 600 },
              "& .MuiTabs-indicator": {
                height: 3,
                borderRadius: 2,
                background: (theme) =>
                  `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
              },
            }}
          >
            <Tab value={login} label="Login" />
            <Tab value={signUp} label="Sign up" />
          </Tabs>

          {selectedComponent === login && <Login handle={handleComponentChange} />}
          {selectedComponent === signUp && <SignUp handle={handleComponentChange} />}

        </Box>

        <Box
          sx={{
            display: { xs: "none", md: "block" },
            position: "relative",
            minHeight: 500,
            width: "50%",
            backgroundImage: `url(${loginImg})`,
            // backgroundSize: "cover",
            // backgroundPosition: "center",
            backgroundPosition: "top left",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",

          }}
        >
          <Box
            sx={{
              position: "absolute",
              inset: 0,

              background: (theme) =>
                `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.5)} 0%, ${alpha(theme.palette.grey[900], 0.5)} 100%)`,
            }}
          />
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              p: 3,
              color: "#fff",
              textShadow: "0 2px 12px rgba(0,0,0,.45)",
            }}
          >
            <Typography variant="h6" fontWeight={700}>
              Welcome to CoachApp
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              Coaches and clients, log in to plan, track, and achieve your goals.
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Box>

  )
}

export default LoginPage