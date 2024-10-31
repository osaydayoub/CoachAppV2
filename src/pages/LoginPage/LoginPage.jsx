import React, { useEffect, useState } from 'react'
import './LoginPage.css'
import Login from '../../components/Login/Login';
import SignUp from '../../components/SignUp/SignUp';
import loginImg from "../../assets/images/loginImg.jpg";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; 


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
    }else{
      setSelectedComponent(login);

    }
  }
  return (
    <div className='LoginPage'>
      <div className="login-img"  ></div>
      <div className='login-signup-container'>    
      {selectedComponent === login && <Login handle={handleComponentChange} />}
      {selectedComponent === signUp && <SignUp handle={handleComponentChange} />}
      </div>

   

    </div>
  )
}

export default LoginPage