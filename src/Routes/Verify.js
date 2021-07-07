import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import "../App.css";
import CreatePassword from "../Components/CreatePassword/CreatePassword";
import Login from "../Components/Login/Login";
import Signup from "../Components/Signup/Signup";
import VerifyEmail from "../Components/VerifyEmail/VerifyEmail";

function Verify() {

  

  return (
    <div>
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/createpassword" component={CreatePassword} />
      <Route path="/verifyemail" component={VerifyEmail} />
    </div>
  );
}

export default Verify;
