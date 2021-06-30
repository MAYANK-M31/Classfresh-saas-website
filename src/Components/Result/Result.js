import React, { Component, useState } from "react";
import "../../css/Result/Result.css";
import ResultHeader from "./Header/ResultHeader";
import ResultSidebar from "./Sidebar/ResultSideBar";
import ResultTable from "./TableView/ResultTable";
import Split from "react-split";

const Result = () => {
  const [addteacher, setaddteacher] = useState(false);

  return (
    <div className="Main-Div">
      <ResultHeader />
      <div className="Inside-Div">
        <Split
          sizes={[15.5,84.5 ]}
          minSize={0}
          snapOffset={100}
          gutterSize={5}
          direction="horizontal"
          cursor="col-resize"
          className="split-flex" // You'll need to define this. check styles.css
        >
          {/* <div style={{width:"100%",backgroundColor:"red"}} > */}
          <ResultSidebar />
          {/* </div> */}
          <div className="Middle-Div">
            <ResultTable />
          </div>
        </Split>
      </div>
    </div>
  );
};

export default Result;
