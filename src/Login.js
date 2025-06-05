import React, { useState } from "react";
import { Navigate } from 'react-router-dom';
import "./Login.css";
import axios from 'axios';

const Login = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [heading, setHeading] = useState("Sign Up");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    role: ""
  });

  const handleChange = (event) => {
    setUserData({
      ...userData,
      [event.target.name]: event.target.value
    });
  }

  const registerUser = async (event) => {
    event.preventDefault();
  
    const { name, email, password, role } = userData;
  
    if (!name || !email || !password || !role) {
      console.log("All fields are required to register.");
      setErrorMessage("All fields are required to register.");
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:8080/demo', {
        name,
        email,
        password,
        role
      });
  
      console.log("Registration successful. Please log in.");
      console.log(response.data); 
      document.getElementById("display").innerText = "Registration successful. Please log in.";
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage("User with this email already exists. Please log in.");
        console.log("User with this email already exists. Please log in.");
        return;
      }
      setErrorMessage("Error registering user. Please try again later.");
      console.error("Error registering user:", error);
    }
  }
  
  const loginUser = async () => {
    const { email, password } = userData;
  
    if (!email || !password) {
      setErrorMessage("Email and password are required to log in.");
      console.log("Email and password are required to log in.");
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:8080/login', {
        email,
        password
      });
  
      if (response.data.authenticated) {
        setErrorMessage("Incorrect email or password. Please try again.");  
        console.log(`Welcome back, ${response.data.user.name}!`);
        setIsAuthenticated(true);
      } else {
        setErrorMessage("Incorrect email or password. Please try again.");
        console.log("Incorrect email or password. Please try again.");
      }
    } catch (error) {
      setErrorMessage("Error logging in. Please try again later.");
      console.error("Error logging in:", error);
    }
  }
  

  const refresh = event => {
    event.preventDefault();
  }

  return (
    <div className="login">
    <div className="content">
      <div className="heading">
        <div className="textt">{heading}</div>
        <div className="underline"></div>
      </div>
      {isAuthenticated && <Navigate to="/" />}
      <form id="registrationForm" onSubmit={refresh}>
        {heading==="Login"?<div></div>:
        <>
        <div className="input">
          <input type="text" id="name" name="name" value={userData.name} onChange={handleChange} placeholder="Name"required/>
        </div>
        </>}
        <div className="input">
            <input type="email" id="email" name="email" value={userData.email} onChange={handleChange} placeholder="Email"required/>
        </div>
        <div className="input">
            <input type="password" id="password" name="password" value={userData.password} onChange={handleChange} placeholder="Password"required/>
        </div>
        {heading==="Login"?<div></div>:
        <>
        <div className="role-select">
          <label htmlFor="role">Role:</label>
          <select id="role" name="role" value={userData.role} onChange={handleChange} required>
            <option value="">Select Role</option>
            <option value="farmer">Farmer</option>
            <option value="shopkeeper">Shopkeeper</option>
          </select>
        </div> 
        </>}
        <div className="submit-container">
          <div className={heading==="Login"?"submit gray":"submit"} onClick={(event) => {setHeading("Sign Up"); registerUser(event);}}>Sign Up</div>
          <div className={heading==="Sign Up"?"submit gray":"submit"} onClick={() => {setHeading("Login"); loginUser();}}>Login</div>
        </div>
      </form>
      <div className="display">{errorMessage}</div>
    </div>
    </div>
  );
}

export default Login;
