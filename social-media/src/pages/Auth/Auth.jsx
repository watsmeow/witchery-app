import React, { useState } from "react";
import "./Auth.css";
import Logo from "../../img/logo.png";
import { useDispatch, useSelector } from 'react-redux'
import { logIn, signUp } from "../../actions/AuthAction"

const Auth = () => {
  
  const initialState = {
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    confirmpass: "",
  };
  const [signedUp, setSignedUp] = useState(false);
  const dispatch = useDispatch()
  const loading = useSelector((state) => state.authReducer.loading)
  const [data, setData] = useState(initialState);
  const [confirmPass, setConfirmPass] = useState(true);

  // this convention makes it so that the handle change function doesn't have to be written for every input seperately
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  };

  const handleSubmit = (e) => {
    // prevents page from redirecting to another page
    e.preventDefault()
    // check if the form is rendering for someone that's already registered
    if (signedUp) {
      // if password and confirmpass are equal, then dispatch our action using redux, send the data of the form as a parameter. If they are not equal, set confirmPass state to false
      data.password === data.confirmpass 
      ? dispatch(signUp(data)) 
      : setConfirmPass(false)
    } 
    //if there's no password + confirm pass it means the form is a login form, so call the dispatch action and send the data of the form
    else {
      dispatch(logIn(data))
    }
  };

  const resetForm = () => {
      setData(initialState);
      setConfirmPass(confirmPass)
    }

  return (
    <div className="Auth">
      {/* left side */}
      <div className="a-left">
        <img src={Logo} alt="" />
        <div className="Webname">
          <h1>Witchery</h1>
          <h6>A society.</h6>
        </div>
      </div>
    {/* right side */}
      <div className="a-right">
      <form className="infoForm authForm" onSubmit={handleSubmit}>
        <h3>{signedUp ? "Register":"Log In"}</h3>

        {signedUp && (
        <div>
          <input
            type="text"
            placeholder="First Name"
            className="infoInput"
            name="firstname"
            onChange={handleChange}
            value={data.firstname}
          />
          <input
            type="text"
            placeholder="Last Name"
            className="infoInput"
            name="lastname"
            onChange={handleChange}
            value={data.lastname}
          />
        </div>
        )}

        <div>
          <input
            type="text"
            className="infoInput"
            name="username"
            placeholder="User Name"
            onChange={handleChange}
            value={data.username}
          />
        </div>

        <div>
          <input
            type="password"
            className="infoInput"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            value={data.password}
          />
          {signedUp && 
          <input
            type="password"
            className="infoInput"
            name="confirmpass"
            placeholder="Confirm Password"
            onChange={handleChange}
          />}
        </div>
        <span 
        style={{
          display: confirmPass? "none" : "block", 
          color: "hotpink", 
          fontSize: "1.5rem", 
          margin: ".25rem"
        }}>
          Re-confirm Password Please
        </span>
        <span
              style={{
                fontSize: "12px",
                cursor: "pointer",
                textDecoration: "underline",
              }}
              onClick={() => {
                resetForm();
                setSignedUp((prev) => !prev);
              }}
            >
              {signedUp
                ? "Looks like you're already a user, log in here."
                : "Please register."}
            </span>
        <button className="button infoButton" type="submit" disabled={loading}>
          {loading ? "Loading..." : signedUp ? "Register" : "Log In"}
        </button>
      </form>
    </div>
    </div>
  );
};


export default Auth;