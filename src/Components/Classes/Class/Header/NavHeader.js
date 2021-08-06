import React, { Component } from "react";
import "../../../../css/Classes/Class/Header/NavHeader.css"
const NavHeader = () => {
  return (
    <div className="NavDiv">
      <div className="Element">Students</div>
      <div className="Element">Teachers</div>
      <div className="Line" > <div className="HighLightBar" ></div></div>
    </div>
  );
};

export default NavHeader;
