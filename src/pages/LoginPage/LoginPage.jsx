import React, { useState } from 'react'
import './LoginPage.css'
import Login from '../../components/Login/Login';
import SignUp from '../../components/SignUp/SignUp';
import loginImg from "../../assets/images/loginImg.jpg";



function LoginPage() {
  const [login, signUp] = ['login', 'signUp']
  const [selectedComponent, setSelectedComponent] = useState(login);
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