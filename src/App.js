import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import "./App.css";
import Verify from "./Routes/Verify";
import Console from "./Routes/Console";
import axios from "axios";
import { URL } from "./URL/URL";

function App() {
  let host = window.location;
  let path = host.pathname;
  let TOKEN = localStorage.getItem("access_token");

  const [access, setaccess] = useState(false);

  useEffect(() => {
    // if (TOKEN == undefined) {
    //   setaccess(false);
    // } else {
    VerifyToken();
    // }
  }, []);

  const VerifyToken = async () => {
    await axios({
      method: "post", //you can set what request you want to be
      url: `${URL}/verifytoken`,
      headers: {
        Authorization: "Bearer " + TOKEN,
      },
    }).then(({ data }) => {
      console.log(data);
      if (data.status == 200) {
        // localStorage.setItem("access_token",data.payload.access_token)
        return setaccess(true);
      } else {
        setaccess(false);
        return localStorage.removeItem("access_token"), setaccess(false);
      }
    });
  };

  return (
    <BrowserRouter>
      {access ? <Redirect to={"/"} /> : <Redirect to={"/login"} />}
      <Route to={"/"} render={() => (access ? <Console /> : <Verify />)} />
    </BrowserRouter>
  );
}

export default App;
