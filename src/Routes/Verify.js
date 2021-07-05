import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import "../App.css";
import Login from "../Components/Login/Login";
import Signup from "../Components/Signup/Signup";

function Verify() {

  

  return (
    <div>
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
    </div>
  );
}

export default Verify;
