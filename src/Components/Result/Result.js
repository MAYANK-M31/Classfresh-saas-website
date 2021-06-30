import React, { Component, useState } from "react";
import "../../css/Result/Result.css";
import ResultHeader from "./Header/ResultHeader";
import ResultSidebar from "./Sidebar/ResultSideBar";
import ResultTable from "./TableView/ResultTable";
import Split from "react-split";

const Result = () => {
  const [minimize, setminimize] = useState(false);

  return (
    <div className="Main-Div">
      <ResultHeader />
      <div className="Inside-Div">
        <Split
          sizes={[minimize ? 0 : 15.5, minimize ? 100 : 84.5]}
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
          <div
            style={{ borderWidth: minimize ? "0 0 0 0" : "0 0 0 0.5px" }}
            className="Middle-Div"
          >
            <div className="ResultUtilityTopBar">
              <div className="LeftDiv">
                <div
                  onClick={() => {
                    setminimize(minimize ? false : true);
                  }}
                  className="SideBarbtn"
                >
                  <svg
                    style={{ marginLeft: "5px", cursor: "pointer" }}
                    width="22"
                    height="18"
                    viewBox="0 0 22 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="21.8477"
                      y="7.61536"
                      width="2.76923"
                      height="21.4615"
                      rx="1.38462"
                      transform="rotate(90 21.8477 7.61536)"
                      fill="#2C385C"
                    />
                    <rect
                      x="17.3477"
                      y="15.2307"
                      width="2.76923"
                      height="16.9615"
                      rx="1.38462"
                      transform="rotate(90 17.3477 15.2307)"
                      fill="#2C385C"
                    />
                    <rect
                      x="10.4238"
                      width="2.76923"
                      height="10.0385"
                      rx="1.38462"
                      transform="rotate(90 10.4238 0)"
                      fill="#2C385C"
                    />
                  </svg>
                </div>
                <div className="FilterRowBtn">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.6663 2H1.33301L6.66634 8.30667V12.6667L9.33301 14V8.30667L14.6663 2Z"
                      stroke="#66749F"
                      stroke-width="0.583333"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  Filter
                </div>
                <div className="SortRowBtn">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5.33301 4H13.9997"
                      stroke="#66749F"
                      stroke-width="0.583333"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M5.33301 8H13.9997"
                      stroke="#66749F"
                      stroke-width="0.583333"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M5.33301 12H13.9997"
                      stroke="#66749F"
                      stroke-width="0.583333"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M2 4H2.00583"
                      stroke="#66749F"
                      stroke-width="0.583333"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M2 8H2.00583"
                      stroke="#66749F"
                      stroke-width="0.583333"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M2 12H2.00583"
                      stroke="#66749F"
                      stroke-width="0.583333"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  Sort
                </div>

                <div
                  style={{
                    width: "0.5px",
                    height: "20px",
                    backgroundColor: "#E2E5EA",
                    marginInline: "10px",
                  }}
                />

                <div className="InsertColumnBtn">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0)">
                      <path
                        d="M10.9954 4.82727H6.9727V0.804546C6.9727 0.360435 6.61226 0 6.16815 0H5.63182C5.18771 0 4.82727 0.360435 4.82727 0.804546V4.82727H0.804546C0.360435 4.82727 0 5.18771 0 5.63182V6.16815C0 6.61226 0.360435 6.9727 0.804546 6.9727H4.82727V10.9954C4.82727 11.4395 5.18771 11.8 5.63182 11.8H6.16815C6.61226 11.8 6.9727 11.4395 6.9727 10.9954V6.9727H10.9954C11.4395 6.9727 11.8 6.61226 11.8 6.16815V5.63182C11.8 5.18771 11.4395 4.82727 10.9954 4.82727Z"
                        fill="#66749F"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0">
                        <rect width="11.8" height="11.8" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  Insert Column
                </div>
                
                <div className="InsertRowBtn">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0)">
                      <path
                        d="M10.9954 4.82727H6.9727V0.804546C6.9727 0.360435 6.61226 0 6.16815 0H5.63182C5.18771 0 4.82727 0.360435 4.82727 0.804546V4.82727H0.804546C0.360435 4.82727 0 5.18771 0 5.63182V6.16815C0 6.61226 0.360435 6.9727 0.804546 6.9727H4.82727V10.9954C4.82727 11.4395 5.18771 11.8 5.63182 11.8H6.16815C6.61226 11.8 6.9727 11.4395 6.9727 10.9954V6.9727H10.9954C11.4395 6.9727 11.8 6.61226 11.8 6.16815V5.63182C11.8 5.18771 11.4395 4.82727 10.9954 4.82727Z"
                        fill="white"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0">
                        <rect width="11.8" height="11.8" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  Insert Row
                </div>
              </div>
              <div className="RightDiv">
                <div className="ShareMarksBtn">Share Marks</div>
              </div>
            </div>
            <ResultTable />
          </div>
        </Split>
      </div>

     
    </div>

  );
};

export default Result;
