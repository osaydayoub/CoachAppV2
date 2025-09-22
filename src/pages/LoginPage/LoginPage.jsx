import React, { useEffect, useState } from 'react'
import './LoginPage.css'
import Login from '../../components/Login/Login';
import SignUp from '../../components/SignUp/SignUp';
import loginImg from "../../assets/images/loginImg.jpg";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Box, Tab, Tabs } from '@mui/material';


function LoginPage() {
  const [login, signUp] = ['login', 'signUp']
  const [selectedComponent, setSelectedComponent] = useState(login);
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate(); // Initialize the navigate function
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
    // <div className='LoginPage'>
    //   <div className="login-img"  ></div>
    //   <div className='login-signup-container'>    
    //   {selectedComponent === login && <Login handle={handleComponentChange} />}
    //   {selectedComponent === signUp && <SignUp handle={handleComponentChange} />}
    //   </div>



    // </div>

    <Box sx={{
      py:2,
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      alignItems:"center"

    }}>
      <Box >
        <Tabs
          value={selectedComponent}
          onChange={handleComponentChange}
          sx={{
            minHeight: 44,
            "& .MuiTab-root": { textTransform: "none", fontWeight: 600 },
            "& .MuiTabs-indicator": {
              height: 3,
              borderRadius: 2,
              background: "linear-gradient(135deg, rgba(255, 106, 0, 1), rgba(33, 33, 33, 1))",
            },
          }}
        >
          <Tab value={login} label="Login" />
          <Tab value={signUp} label="Sign up" />
        </Tabs>


      </Box>
      <Box
        sx={{
          mt: 2,
          pt: 2,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        {selectedComponent === login && <Login handle={handleComponentChange} />}
        {selectedComponent === signUp && <SignUp handle={handleComponentChange} />}
      </Box>
    </Box>


  )
}

export default LoginPage