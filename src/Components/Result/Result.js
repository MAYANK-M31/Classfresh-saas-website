import React, { Component, useEffect, useState } from "react";
import "../../css/Result/Result.css";

import * as qs from "query-string";


import ResultSidebar from "./Sidebar/ResultSideBar";
import ResultTable from "./TableView/ResultTable";
import Split from "react-split";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import LinearProgress from "@material-ui/core/LinearProgress";

import { motion } from "framer-motion";
import Lottie from "react-lottie";
import animationData from "../../Assets/Lottie/folderbox.json";
import ClassHeader from "../Classes/Class/Header/ClassHeader";
import ResultHeaders from "./Header/ResultHeader";

const Result = (props) => {
  const [minimize, setminimize] = useState(false);
  const [Show, setShow] = useState(false);
  const [DomLoader, setDomLoader] = useState(true);
  const parsedQuery = qs.parse(props.location.search);


  useEffect(() => {
    setTimeout(() => {
      setDomLoader(false);
    }, 2000);
    // setDomLoader(false);
  }, []);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  if (DomLoader == true) {
    return (
      
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          // left: 0,
          zIndex: 1000000,
          backgroundColor: "white",
        }}
      >
         <ResultHeaders
          classname={parsedQuery.classlabel ? parsedQuery.classlabel : null}
          section={parsedQuery.sectionlabel ? parsedQuery.sectionlabel : null}
        />
        <LinearProgress color="primary" />
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <motion.div
          // animate={{
          //   scale: [1, 1.01, 1, 1.01, 1],
          //   // opacity:[0,1,0,1,0],
          // }}
          // transition={{
          //   duration: 1,
          //   ease: "easeInOut",
          //   // times: [0, 0.2, 0.5, 0.8, 0],
          //   loop: Infinity,
          //   repeatDelay: 1,
          // }}
          >
            <Lottie options={defaultOptions} height={200} width={200} />
            <h1 className="LoadingFiles">Loading Files...</h1>
            {/* <img style={{ width: "20vw", height: "auto" }} src={Logo} /> */}
          </motion.div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="Main-Div">
       
       <ResultHeaders
          classname={parsedQuery.classlabel ? parsedQuery.classlabel : null}
          section={parsedQuery.sectionlabel ? parsedQuery.sectionlabel : null}
        />
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

                  <div
                    onClick={() => {
                      setShow(Show ? false : true);
                    }}
                    className="InsertColumnBtn"
                  >
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
        <React.Fragment>
          <SwipeableDrawer
            anchor={"right"}
            open={Show}
            onClose={() => {
              setShow(false);
            }}
            onOpen={() => {
              setShow(false);
            }}
          >
            <div className="InsertDrawer"></div>
          </SwipeableDrawer>
        </React.Fragment>
      </div>
    );
  }
};

export default Result;
