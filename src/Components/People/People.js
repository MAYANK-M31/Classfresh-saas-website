import React, { Component } from "react";
import "../../css/People/People.css";
import PeopleHeader from "./Header/PeopleHeader";
const People = () => {
  return (
    <div className="Main-Div">
      <PeopleHeader />
      <div className="Inside-Div">
        <div className="Left-Div"></div>
        <div className="Middle-Div">
          <div className="UpperBar-Div"></div>
          <div className="Main-Inside-Div">
            <div className="Container-Div"></div>
            <div className="Right-Div"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default People;
