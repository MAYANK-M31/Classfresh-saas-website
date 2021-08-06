import React, { Component } from "react";
import "../../../../css/Classes/Class/Header/NavHeader.css";
const NavHeader = ({ StudentsTab, TeachersTab, IndicatorPosition }) => {
  return (
    <div className="NavDiv">
      <div onClick={StudentsTab} style={{color: IndicatorPosition !== 0 ?  "#ACABAA" : null}} className="Element">
        Students
      </div>
      <div onClick={TeachersTab} style={{color: IndicatorPosition !== 1 ?  "#ACABAA" : null}} className="Element">
        Teachers
      </div>
      <div className="Line">
        <div
          className={
            IndicatorPosition == 0 ? "HighLightBar" : "HighLightBarRight"
          }
        ></div>
      </div>
    </div>
  );
};

export default NavHeader;
