import React, { Component, useState } from "react";
import "../../css/Result/Result.css";
import ResultHeader from "./Header/ResultHeader";
import ResultSidebar from "./Sidebar/ResultSideBar";
import ResultTable from "./TableView/ResultTable";

const Result = () => {
  const [addteacher, setaddteacher] = useState(false);

  return (
    <div className="Main-Div">
      <ResultHeader />
      <div className="Inside-Div">
        <ResultSidebar />
        <div className="Middle-Div">
          <ResultTable/>
        </div>
      </div>
    </div>
  );
};

export default Result;
