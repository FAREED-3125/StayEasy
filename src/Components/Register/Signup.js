import React ,{useState,useContext}from "react";
import { Form,useNavigate } from "react-router-dom";
import { URL_fetch } from "../../hooks/useFetch";
//icon imports
import { FaFacebookF, FaGoogle, FaTwitter } from "react-icons/fa";
import axios from "axios";
import { AuthContextProvider } from "../../Context/AuthContext";
import { AuthOpt } from "../../Context/AuthContext";

const Signup = ({ toggleForm,setLoading}) => {
  const {authInfo,dispatch} = useContext(AuthContextProvider);
  const [email,setEmail] = useState("");
  const [username,setusername] = useState("");
  const [password , setPass] = useState("");
  const [err,setErr] = useState(false);
  const navigate = useNavigate();
  const handleSignupFunc = async(e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${URL_fetch}/Auth/signup`,{email,password,username});
      setLoading(true)
      dispatch({type: AuthOpt.LOGIN_USER,payload: response.data})
      setLoading(false)
      navigate(-1)
    } catch (error) {
      setErr(true)
      console.log(err)
      dispatch({type: AuthOpt.USER_ERR,payload: error?.response?.data})
    }
  }
  return (
    <>
      <div className="form-container sign-up-container">
        <form className="form"  method="post" onSubmit={(e) => handleSignupFunc(e)}>
          <h1 className="h1" style={{
            color: "var(--s-color)"
          }}>Create Account</h1>
          <div className="social-container">
            <a href="#" className="social a">
              <FaFacebookF />
            </a>
            <a href="#" className="social a">
              <FaGoogle />
            </a>
            <a href="#" className="social a">
              <FaTwitter />
            </a>
          </div>
          <span>or use your email for registration</span>
          <input
            className="input"
            required
            type="text"
            name="username"
            placeholder="Name"
            onChange={(e) => setusername(e.target.value)}
          />
          <input
            className="input"
            required
            type="email"
            name="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}

          />
       
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
      
       
          <button className="resgister-btn" type="submit" >
            SignUp
          </button>
          <p className="p">
            Already have an account?
            <span style={
              {
                display: "inline"
              }
            }  className="switch" onClick={toggleForm}>
             {" "} Sign in
            </span>
          </p>
        </form>
      </div>
    </>
  );
};


export default Signup;
