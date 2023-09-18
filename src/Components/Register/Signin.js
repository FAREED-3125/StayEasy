import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

//icon imports
import { FaFacebookF, FaGoogle, FaTwitter } from "react-icons/fa";
import { useFetch } from "../../hooks/useFetch";
import axios from "axios";
import { AuthContextProvider } from "../../Context/AuthContext";
import { AuthOpt } from "../../Context/AuthContext";
import { URL_fetch } from "../../hooks/useFetch";
import Example from "../Loading/Loading";
           
const Signin = ({toggleForm,setLoading,setFLoading,formLoading}) => {
  const {authInfo,dispatch} = useContext(AuthContextProvider);
  const [email,setEmail] = useState("");
  const [password , setPass] = useState("");
  const [err,setErr] = useState(false);
  const navigate = useNavigate();
  const handleLoginFunc = async(e) => {
    e.preventDefault();
    setFLoading(true)
    try {
      
      const response = await axios.post(`${URL_fetch}/Auth/login`,{email,password});
        setLoading(true)
        dispatch({type: AuthOpt.LOGIN_USER,payload: response.data})
       
       navigate(-1)
       setLoading(false)
       alert("Sucessfully logged in");
    } catch (error) {
      setErr(true)
      console.log(err)
      dispatch({type: AuthOpt.USER_ERR,payload: error.response.data})
    }finally{
      setFLoading(false)
    }
  }
  return (
    <>
      <div className="form-container sign-in-container">
        <form
        onSubmit={(e) => handleLoginFunc(e)}
        className="form"
          method="post"
        >
          <h1 className="h1" style={{
         
          }}>Log In</h1>
          <div className="social-container">
            <a  href="#" className="social a">
              <FaFacebookF />
            </a>
            <a  href="#" className="social a">
              <FaGoogle />
            </a>
            <a  href="#" className="social a">
              <FaTwitter />
            </a>
          </div>
          <span>or use your account</span>
          <input className="input"  value={email} required type="email" name="email" onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
         <div  style={{
          padding: "0",
          width: "100%"
         }}> <input   className="input" style={{
          
         }} value={password} onChange={(e) => setPass(e.target.value)} required type="password" name="password" placeholder="Password" />
         {err && <p style={{
          color: "red",
          fontSize: "10px",
          textAlign: "left",
          paddingTop: "5px"
         }} className="small-err">{authInfo?.err?.message}</p>}</div>
      
          <a className="a"href="#">Forgot Your Password</a>
          <button className="resgister-btn" type="submit">
          {formLoading ? <Example color={"#ffffff"} width="10px" height={"10px"}/> : "Sign in"}
          </button>

          <p className="p" href="">
            Don't hava account,{" "}
            <span style={{
              display: "inline",
            }} className="switch" onClick={toggleForm}>
              Create Account
            </span>
          </p>
          
        </form>
      
      </div>
    </>
  );
};


export default Signin;
