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

import Class from "../Components/Classes/Class/Class";
import Users from "../Components/Classes/Classes";
import AllUsers from "../Components/AllUsers/AllUsers"

import ResultClasses from "../Components/Result/Classes/Classes";
import ResultClass from "../Components/Result/Classes/Class/Class";




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


        <Route exact path="/users/classes" component={Users} />
        <Route path="/users/classes/:class" component={Class} />
        <Route path="/users/all" component={People} />
        
        <Route exact path="/result" component={ResultClasses} />
        <Route path="/result/classes/:class" component={ResultClass} />
        
        <Route exact path="/result/sheet" component={Result} />



        
        <Route path="/settings" component={Setting} />
      </div>
    </div>
  );
}

export default Console;
