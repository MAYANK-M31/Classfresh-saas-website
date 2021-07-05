import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import "./App.css";
import Verify from "./Routes/Verify";
import Console from "./Routes/Console";

function App() {
  let host = window.location;
  let path = host.pathname;
  var token = false;

  const [access, setaccess] = useState(false);

  useEffect(() => {

    if (window.location.pathname == "/" && window.location.host.split(".")[0] !== "console") {
      window.location = "http://easycap.in";
    }

    if (window.location.host.split(".")[0] == "console") {
      if (token == true) {
        setaccess(true);
      } else {
        setaccess(false);
        window.location = "http://localhost:3000/login";
        document.title = "Classfresh:Log in"
      }
    }
  }, []);

  return (
    <BrowserRouter>

      <Route to={"/"} render={() => (access ? <Console /> : <Verify />)} />
    </BrowserRouter>
  );
}

export default App;
