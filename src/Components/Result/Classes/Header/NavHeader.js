import React, { Component } from "react";
import "../../../../css/Classes/Header/NavHeader.css";
const NavHeader = ({ StudentsTab, TeachersTab, IndicatorPosition }) => {
  return (
    <div className="UsersNavDiv">
      <div onClick={StudentsTab} style={{color: IndicatorPosition !== 0 ?  "#ACABAA" : null}} className="Element">
        Classes
      </div>
      <div onClick={TeachersTab} style={{color: IndicatorPosition !== 1 ?  "#ACABAA" : null}} className="Element">
        All Users
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
