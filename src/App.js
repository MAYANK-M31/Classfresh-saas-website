import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import SideBar from "./Components/SideBar/SideBar.js";
import ScrollMemory from "react-router-scroll-memory";
import Dashboard from "./Components/Dashboard/Dashboard";
import Setting from "./Components/Settings/Setting";
import People from "./Components/People/People";
import Teachers from "./Components/Connect/Teachers";
import Students from "./Components/Connect/Students";
import FeeCollection from "./Components/FeeCollection/FeeCollection";

function App() {
  return (
    <BrowserRouter>
      <div className="App" >
        <ScrollMemory />
        <SideBar />
        <Route path="/" exact component={Dashboard} />
        <Route path="/connect/students" component={Students} />
        <Route path="/connect/teachers" component={Teachers} />
        <Route path="/feecollection" component={FeeCollection} />
        {/* <Route path="/chatbot" component={} /> */}
        {/* <Route path="/forms" component={For} /> */}
        <Route path="/people" component={People} />
        <Route path="/settings" component={Setting} />
      </div>
    </BrowserRouter>
  );
}

export default App;
