//react imports
import React, {useContext, useState } from "react";
import {  useLocation } from "react-router-dom";
import "./register.css";
//COmponents import
import Signup from "./Signup";
import Signin from "./Signin";
import Loading from '../Loading/Loading'

// ===========================================================================================================

import { AuthContextProvider } from "../../Context/AuthContext";

const Register = () => {
  const location = useLocation();
  const {authInfo,dispatch} = useContext(AuthContextProvider);
  console.log(authInfo)
  const [formLoading,setFLoading] = useState(false);
  const sigup = new URLSearchParams(location.search).get('value');
  const [isSignup, setIsSignup] =  useState(sigup === 'signup' ? true :false) ; 
 const [loading,setLoading] = useState(false)

  const toggleForm = () => {
    setIsSignup(!isSignup);
  };

  return (
    <div className="register-container">
      {loading ? <><Loading width={'30px'} height={'30px'}/> </> : <>  <div
        className={`container ${
          isSignup ? "right-panel-active right-panel-act" : ""
        }`}
      >
        <Signup
          toggleForm={toggleForm}
          setLoading={setLoading}
          formLoading={formLoading}
          setFLoading={setFLoading}
       
        />
        <Signin
          toggleForm={toggleForm}
          setLoading={setLoading}
          formLoading={formLoading}
          setFLoading={setFLoading}

        />
       
      </div></>}
    
    </div>
  );
};

// ===================Form Action Function ==========================================

export default Register;
