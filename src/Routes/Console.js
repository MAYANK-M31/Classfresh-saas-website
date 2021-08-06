import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import "../App.css";
import SideBar from "../Components/SideBar/SideBar.js";
import ScrollMemory from "react-router-scroll-memory";
import Dashboard from "../Components/Dashboard/Dashboard";
import Setting from "../Components/Settings/Setting";
import People from "../Components/People/People";
import Teachers from "../Components/Connect/Teachers";
import Students from "../Components/Connect/Students";
import FeeCollection from "../Components/FeeCollection/FeeCollection";
import Result from "../Components/Result/Result";
import Classes from "../Components/Classes/Classes";
import Class from "../Components/Classes/Class/Class";


function Console() {


  useEffect(()=>{
    document.title = "Classfresh Console"

  },[])
 
  return (
    <div className="App">
      <ScrollMemory />
      <SideBar />
      <div className="App-Main">
      {/* {access ? <Redirect to={"/"} /> : <Redirect to={"/login"} />} */}
        <Route path="/" exact component={Dashboard} />
        <Route path="/connect/students" component={Students} />
        <Route path="/connect/teachers" component={Teachers} />
        <Route path="/feecollection" component={FeeCollection} />
        <Route path="/result" component={Result} />
        <Route path="/users/classes" component={Classes} />
        <Route path="/users/class" component={Class} />

        <Route path="/users/all" component={People} />
        <Route path="/settings" component={Setting} />
      </div>
    </div>
  );
}

export default Console;
