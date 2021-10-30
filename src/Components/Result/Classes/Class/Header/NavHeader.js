import React, { Component } from "react";
import "../../../../../css/Classes/Class/Header/NavHeader.css";
const NavHeader = ({ StudentsTab, TeachersTab, IndicatorPosition }) => {
  return (
    <div className="NavDiv">
      <div onClick={StudentsTab} style={{color: IndicatorPosition !== 0 ?  "#ACABAA" : "#0069ff"}} className="Element">
        Subjects
      </div>
      <div onClick={TeachersTab} style={{color: IndicatorPosition !== 1 ?  "#ACABAA" : "#0069ff"}} className="Element">
        Report Cards
      </div>
      <div className="Line">
        <div  style={{
            left: IndicatorPosition == 1 ? 106 :0,
            borderTopLeftRadius:100,
            borderTopRightRadius:100,
}}
          className={
            IndicatorPosition == 0 ? "HighLightBar" : "HighLightBarRight"
          }
        ></div>
      </div>
    </div>
  );
};

export default NavHeader;
