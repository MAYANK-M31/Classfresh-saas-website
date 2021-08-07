import React, { Component } from "react";
import "../../../css/AllUsers/Header/NavHeader.css";
const NavHeader = ({ StudentsTab, TeachersTab,OtherTab, IndicatorPosition }) => {
  return (
    <div className="NavDivAllUsers">
      <div onClick={StudentsTab} style={{color: IndicatorPosition !== 0 ?  "#ACABAA" : null}} className="Element">
        Students
      </div>
      <div onClick={TeachersTab} style={{color:  IndicatorPosition !== 1 ?  "#ACABAA" : null}} className="Element">
        Teachers
      </div>
      <div onClick={OtherTab} style={{color: IndicatorPosition !== 2 ?   "#ACABAA" : null}} className="Element">
        Other
      </div>
      <div className="Line">
        <div
          className={
            IndicatorPosition == 0 ? "HighLightBar" :IndicatorPosition == 1  ? "HighLightBarMiddle"  : "HighLightBarRight"
          }
        ></div>
      </div>
    </div>
  );
};

export default NavHeader;
