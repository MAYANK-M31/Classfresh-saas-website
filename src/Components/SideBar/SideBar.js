import React, { useCallback, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../../css/SideBar.css";
import { motion } from "framer-motion";
import classboard from "../../Assets/Logos/blackboard.png"
import ConnectLogo from "../../Assets/Logos/connect.png"

const SideBar = () => {
  const [showConnect, setshowConnect] = useState(false);

  var x;

  const location = useLocation();

  useEffect(() => {
    if (
      location.pathname === "/connect/students" ||
      location.pathname === "/connect/teachers"
    ) {
      return setshowConnect(false);
    }
  }, [location]);

  return (
    <nav className="SideBar">
      <div className="Box" style={{ backgroundColor: "#0076FE" }}>
        <Link to="/">
          <div id="LogoBox" className="Box-Inside">
            {/* <motion.svg
             whileTap={{ scale: 0.8 }}
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19.0463 39.5209C29.5652 39.5209 38.0925 30.9936 38.0925 20.4747C38.0925 9.95573 29.5652 1.42843 19.0463 1.42843C8.5273 1.42843 0 9.95573 0 20.4747C0 30.9936 8.5273 39.5209 19.0463 39.5209Z"
                fill="#0076FE"
              />
              <path
                d="M9.99353 20.7017C9.99353 18.8974 10.3839 17.2926 11.1646 15.8873C11.9453 14.4646 13.0297 13.3629 14.4177 12.5822C15.823 11.7841 17.4104 11.3851 19.1801 11.3851C21.3488 11.3851 23.2051 11.9576 24.7492 13.1027C26.2933 14.2478 27.3256 15.8092 27.8461 17.787H22.9536C22.5892 17.0237 22.0688 16.4425 21.3921 16.0434C20.7329 15.6444 19.9782 15.4449 19.128 15.4449C17.7574 15.4449 16.6471 15.922 15.797 16.8762C14.9468 17.8304 14.5218 19.1056 14.5218 20.7017C14.5218 22.2979 14.9468 23.5731 15.797 24.5273C16.6471 25.4815 17.7574 25.9586 19.128 25.9586C19.9782 25.9586 20.7329 25.7591 21.3921 25.36C22.0688 24.961 22.5892 24.3798 22.9536 23.6164H27.8461C27.3256 25.5943 26.2933 27.1557 24.7492 28.3008C23.2051 29.4285 21.3488 29.9923 19.1801 29.9923C17.4104 29.9923 15.823 29.602 14.4177 28.8213C13.0297 28.0232 11.9453 26.9215 11.1646 25.5162C10.3839 24.1109 9.99353 22.5061 9.99353 20.7017Z"
                fill="white"
              />
              <path
                d="M36.7831 5.95195C38.4267 5.95195 39.7591 4.61956 39.7591 2.97598C39.7591 1.33239 38.4267 0 36.7831 0C35.1395 0 33.8071 1.33239 33.8071 2.97598C33.8071 4.61956 35.1395 5.95195 36.7831 5.95195Z"
                fill="#0076FE"
              />
            </motion.svg> */}
            <motion.svg
             whileTap={{ scale: 0.8 }}
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19.0463 39.521C29.5652 39.521 38.0925 30.9937 38.0925 20.4747C38.0925 9.95577 29.5652 1.42847 19.0463 1.42847C8.5273 1.42847 0 9.95577 0 20.4747C0 30.9937 8.5273 39.521 19.0463 39.521Z"
                fill="white"
              />
              <path
                d="M9.99353 20.7018C9.99353 18.8974 10.3839 17.2926 11.1646 15.8873C11.9453 14.4646 13.0297 13.363 14.4177 12.5822C15.823 11.7842 17.4104 11.3851 19.1801 11.3851C21.3488 11.3851 23.2051 11.9577 24.7492 13.1027C26.2933 14.2478 27.3256 15.8092 27.8461 17.7871H22.9536C22.5892 17.0237 22.0688 16.4425 21.3921 16.0434C20.7329 15.6444 19.9782 15.4449 19.128 15.4449C17.7574 15.4449 16.6471 15.922 15.797 16.8762C14.9468 17.8304 14.5218 19.1056 14.5218 20.7018C14.5218 22.2979 14.9468 23.5731 15.797 24.5273C16.6471 25.4815 17.7574 25.9586 19.128 25.9586C19.9782 25.9586 20.7329 25.7591 21.3921 25.3601C22.0688 24.961 22.5892 24.3798 22.9536 23.6165H27.8461C27.3256 25.5943 26.2933 27.1557 24.7492 28.3008C23.2051 29.4285 21.3488 29.9924 19.1801 29.9924C17.4104 29.9924 15.823 29.602 14.4177 28.8213C13.0297 28.0232 11.9453 26.9215 11.1646 25.5162C10.3839 24.1109 9.99353 22.5061 9.99353 20.7018Z"
                fill="#007CF7"
              />
              <path
                d="M36.7831 5.95195C38.4267 5.95195 39.7591 4.61956 39.7591 2.97598C39.7591 1.33239 38.4267 0 36.7831 0C35.1395 0 33.8071 1.33239 33.8071 2.97598C33.8071 4.61956 35.1395 5.95195 36.7831 5.95195Z"
                fill="white"
              />
            </motion.svg>
          </div>
        </Link>
      </div>

      <div className="Box">
        <Link to="/">
          <div
          
            className="Box-Inside"
            style={{
              backgroundColor: location.pathname == "/" ? "#0076FE" : null,
              boxShadow:
                location.pathname == "/" ? "0px 0px 1px 1px #0475fc" : null,
            }}
          >
            <motion.svg
             whileTap={{ scale: 0.8 }}
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0)">
                <path
                  d="M27.3 12.124C27.2992 12.1233 27.2985 12.1225 27.2979 12.1219L15.8761 0.700471C15.3892 0.21341 14.742 -0.0546875 14.0535 -0.0546875C13.365 -0.0546875 12.7177 0.21341 12.2306 0.700471L0.814789 12.1161C0.810943 12.1199 0.806884 12.124 0.803253 12.1278C-0.196505 13.1334 -0.194796 14.7648 0.808166 15.7678C1.26639 16.2262 1.87137 16.4915 2.51844 16.5195C2.54492 16.5221 2.57141 16.5233 2.59812 16.5233H3.05314V24.9286C3.05314 26.5921 4.40665 27.9454 6.07014 27.9454H10.5387C10.9918 27.9454 11.359 27.5779 11.359 27.1251V20.5352C11.359 19.7762 11.9766 19.1588 12.7356 19.1588H15.3713C16.1303 19.1588 16.7477 19.7762 16.7477 20.5352V27.1251C16.7477 27.5779 17.1149 27.9454 17.568 27.9454H22.0366C23.7003 27.9454 25.0536 26.5921 25.0536 24.9286V16.5233H25.4757C26.164 16.5233 26.8113 16.2553 27.2985 15.768C28.3026 14.7635 28.303 13.1291 27.3 12.124ZM26.1384 14.608C25.9613 14.7851 25.7258 14.8827 25.4757 14.8827H24.2333C23.7802 14.8827 23.4129 15.2499 23.4129 15.703V24.9286C23.4129 25.6874 22.7956 26.3047 22.0366 26.3047H18.3883V20.5352C18.3883 18.8717 17.035 17.5182 15.3713 17.5182H12.7356C11.0719 17.5182 9.7184 18.8717 9.7184 20.5352V26.3047H6.07014C5.31135 26.3047 4.69376 25.6874 4.69376 24.9286V15.703C4.69376 15.2499 4.32654 14.8827 3.87345 14.8827H2.65238C2.63956 14.8819 2.62696 14.8812 2.61393 14.881C2.36954 14.8767 2.14032 14.7798 1.96857 14.6078C1.60327 14.2425 1.60327 13.648 1.96857 13.2825C1.96878 13.2825 1.96878 13.2823 1.969 13.282L1.96964 13.2814L13.391 1.86045C13.5679 1.68335 13.8031 1.58594 14.0535 1.58594C14.3036 1.58594 14.5388 1.68335 14.7159 1.86045L26.1347 13.279C26.1364 13.2808 26.1384 13.2825 26.1401 13.2842C26.5034 13.6501 26.5028 14.2433 26.1384 14.608Z"
                  fill= {location.pathname == "/" ? "white" : "#8C97AC"} 
                />
              </g>
              <defs>
                <clipPath id="clip0">
                  <rect width="28" height="28" fill="white" />
                </clipPath>
              </defs>
            </motion.svg>
          </div>
        </Link>
      </div>

      <div className="Box">
        {showConnect && (
          <div
            onMouseEnter={() => {
              clearTimeout(x);
            }}
            onMouseLeave={() => {
              setshowConnect(false);
            }}
            className="dropdown"
            style={{
              position: "absolute",
              width: "202px",
              // height: "187px",
              left: "75px",
            }}
          >
            <h2>Connect</h2>

            <Link style={{ textDecoration: "none" }} to="/connect/students">
              <div className="dropdown-content">
                <img
                  alt="class"
                  src={classboard}
                />
                <span>Students</span>
              </div>
            </Link>

            <Link style={{ textDecoration: "none" }} to="/connect/teachers">
              <div className="dropdown-content">
                <img
                  alt="teacher"
                  src={ConnectLogo}
                />
                <span>Teachers</span>
              </div>
            </Link>
          </div>
        )}

        <div
          onMouseEnter={() => {
            if (showConnect !== true) {
              setshowConnect(true);
              clearTimeout(x);
            }
          }}
          onMouseLeave={() => {
            x = setTimeout(() => {
              setshowConnect(false);
            }, 500);
          }}
          className="Box-Inside"
          style={{
            backgroundColor:
              location.pathname == "/connect/students"
                ? "#0076FE"
                : location.pathname == "/connect/teachers"
                ? "#0076FE"
                : null,
                boxShadow:
                location.pathname == "/connect/students"
                ? "0px 0px 1px 1px #0475fc"
                : location.pathname == "/connect/teachers"
                ? "0px 0px 1px 1px #0475fc"
                : null,
          
          }}
        >
          <motion.svg
           whileTap={{ scale: 0.8 }}
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.625 5.25H6.125C5.642 5.25 5.25 5.642 5.25 6.125C5.25 6.608 5.642 7 6.125 7H16.625C17.108 7 17.5 6.608 17.5 6.125C17.5 5.642 17.108 5.25 16.625 5.25Z"
              fill= {
                location.pathname == "/connect/students"
                ? "white"
                : location.pathname == "/connect/teachers"
                ? "white"
                : "#8C97AC"
              } 
            />
            <path
              d="M13.125 8.75H6.125C5.642 8.75 5.25 9.142 5.25 9.625C5.25 10.108 5.642 10.5 6.125 10.5H13.125C13.608 10.5 14 10.108 14 9.625C14 9.142 13.608 8.75 13.125 8.75Z"
              fill= {
                location.pathname == "/connect/students"
                ? "white"
                : location.pathname == "/connect/teachers"
                ? "white"
                : "#8C97AC"
              } 
            />
            <path
              d="M19.25 0H3.5C1.56975 0 0 1.56975 0 3.5V21C0 21.3395 0.196 21.6493 0.504 21.7927C0.62125 21.847 0.749 21.875 0.875 21.875C1.07625 21.875 1.27575 21.805 1.435 21.672L6.44175 17.5H19.25C21.1803 17.5 22.75 15.9303 22.75 14V3.5C22.75 1.56975 21.1803 0 19.25 0ZM21 14C21 14.9642 20.216 15.75 19.25 15.75H6.125C5.92025 15.75 5.7225 15.8218 5.565 15.953L1.75 19.1327V3.5C1.75 2.53575 2.534 1.75 3.5 1.75H19.25C20.216 1.75 21 2.53575 21 3.5V14Z"
              fill= {
                location.pathname == "/connect/students"
                ? "white"
                : location.pathname == "/connect/teachers"
                ? "white"
                : "#8C97AC"
              } 
            />
            <path
              d="M24.5 7C24.017 7 23.625 7.392 23.625 7.875C23.625 8.358 24.017 8.75 24.5 8.75C25.466 8.75 26.25 9.53575 26.25 10.5V25.3032L23.296 22.9408C23.142 22.8183 22.9478 22.75 22.75 22.75H10.5C9.534 22.75 8.75 21.9642 8.75 21V20.125C8.75 19.642 8.358 19.25 7.875 19.25C7.392 19.25 7 19.642 7 20.125V21C7 22.9303 8.56975 24.5 10.5 24.5H22.442L26.5773 27.8092C26.7365 27.9352 26.9307 28 27.125 28C27.2528 28 27.3822 27.972 27.5047 27.9142C27.8075 27.7673 28 27.461 28 27.125V10.5C28 8.56975 26.4303 7 24.5 7Z"
              fill= {
                location.pathname == "/connect/students"
                ? "white"
                : location.pathname == "/connect/teachers"
                ? "white"
                : "#8C97AC"
              } 
            />
          </motion.svg>
        </div>
      </div>

      <div className="Box">
        <Link to="/feecollection">
          <div
            className="Box-Inside"
            style={{
              backgroundColor:
                location.pathname == "/feecollection" ? "#0076FE" : null,
              boxShadow:
                location.pathname == "/feecollection"
                  ? "0px 0px 1px 1px #0475fc"
                  : null,
            }}
          >
            <motion.svg
             whileTap={{ scale: 0.8 }}
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M24.9375 4.375H3.0625C1.37386 4.375 0 5.74886 0 7.4375V20.5625C0 22.2511 1.37386 23.625 3.0625 23.625H24.9375C26.6261 23.625 28 22.2511 28 20.5625V7.4375C28 5.74886 26.6261 4.375 24.9375 4.375ZM3.0625 6.125H24.9375C25.6612 6.125 26.25 6.71382 26.25 7.4375V9.1875H1.75V7.4375C1.75 6.71382 2.33882 6.125 3.0625 6.125ZM24.9375 21.875H3.0625C2.33882 21.875 1.75 21.2862 1.75 20.5625V10.9375H26.25V20.5625C26.25 21.2862 25.6612 21.875 24.9375 21.875Z"
                fill= {
                   location.pathname == "/feecollection" ? "white": "#8C97AC"
                } 
              />
              <path
                d="M6.125 19.25H5.25C4.76678 19.25 4.375 18.8582 4.375 18.375V17.5C4.375 17.0168 4.76678 16.625 5.25 16.625H6.125C6.60822 16.625 7 17.0168 7 17.5V18.375C7 18.8582 6.60822 19.25 6.125 19.25Z"
                fill= {
                   location.pathname == "/feecollection" ? "white": "#8C97AC"
                }
              />
            </motion.svg>
          </div>
        </Link>
      </div>

      <div className="Box">
        <Link to="/people">
          <div
            className="Box-Inside"
            style={{
              backgroundColor:
                location.pathname == "/people" ? "#0076FE" : null,
              boxShadow:
                location.pathname == "/people"
                  ? "0px 0px 1px 1px #0475fc"
                  : null,
            }}
          >
            <motion.svg
             whileTap={{ scale: 0.8 }}
              width="30"
              height="20"
              viewBox="0 0 32 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M27.6755 9.78119C28.6126 9.1227 29.2331 8.02733 29.2331 6.79266C29.2331 4.77288 27.5995 3.13932 25.5797 3.13932C23.56 3.13932 21.9264 4.77288 21.9264 6.79266C21.9264 8.02733 22.5406 9.1227 23.484 9.78119C22.6799 10.0598 21.9454 10.4903 21.3249 11.0475C20.4701 10.3194 19.4634 9.76219 18.3617 9.43295C19.6977 8.6225 20.5968 7.14723 20.5968 5.46936C20.5968 2.91138 18.5263 0.840942 15.9683 0.840942C13.4104 0.840942 11.3399 2.91771 11.3399 5.46936C11.3399 7.14723 12.2327 8.6225 13.575 9.43295C12.486 9.76219 11.4919 10.313 10.6435 11.0285C10.023 10.484 9.30115 10.0598 8.5097 9.78752C9.44677 9.12903 10.0673 8.03366 10.0673 6.799C10.0673 4.77921 8.43372 3.14565 6.41393 3.14565C4.39414 3.14565 2.76059 4.77921 2.76059 6.799C2.76059 8.03366 3.37475 9.12903 4.31816 9.78752C1.80451 10.655 0 13.042 0 15.8469V16.2648C0 16.2774 0.0126632 16.2901 0.0253265 16.2901H7.7689C7.72458 16.6383 7.69925 16.9992 7.69925 17.3601V17.7907C7.69925 19.6522 9.20617 21.1591 11.0677 21.1591H20.8817C22.7432 21.1591 24.2501 19.6522 24.2501 17.7907V17.3601C24.2501 16.9992 24.2248 16.6383 24.1805 16.2901H31.9747C31.9873 16.2901 32 16.2774 32 16.2648V15.8469C31.9873 13.0356 30.1892 10.6486 27.6755 9.78119ZM22.9395 6.78633C22.9395 5.33006 24.1235 4.14605 25.5797 4.14605C27.036 4.14605 28.22 5.33006 28.22 6.78633C28.22 8.22361 27.0613 9.39496 25.6304 9.42662C25.6114 9.42662 25.5987 9.42662 25.5797 9.42662C25.5607 9.42662 25.5481 9.42662 25.5291 9.42662C24.0918 9.40129 22.9395 8.22994 22.9395 6.78633ZM12.3403 5.46936C12.3403 3.4749 13.9612 1.854 15.9557 1.854C17.9501 1.854 19.571 3.4749 19.571 5.46936C19.571 7.39417 18.0578 8.97074 16.1646 9.07838C16.095 9.07838 16.0253 9.07838 15.9557 9.07838C15.886 9.07838 15.8164 9.07838 15.7467 9.07838C13.8536 8.97074 12.3403 7.39417 12.3403 5.46936ZM3.75465 6.78633C3.75465 5.33006 4.93866 4.14605 6.39493 4.14605C7.85121 4.14605 9.03522 5.33006 9.03522 6.78633C9.03522 8.22361 7.87653 9.39496 6.44559 9.42662C6.42659 9.42662 6.41393 9.42662 6.39493 9.42662C6.37594 9.42662 6.36328 9.42662 6.34428 9.42662C4.91334 9.40129 3.75465 8.22994 3.75465 6.78633ZM7.94618 15.2707H1.02572C1.31065 12.5734 3.59003 10.4587 6.35695 10.4397C6.36961 10.4397 6.38227 10.4397 6.39493 10.4397C6.4076 10.4397 6.42026 10.4397 6.43292 10.4397C7.7499 10.446 8.95291 10.9335 9.88366 11.725C8.9719 12.7127 8.29442 13.9284 7.94618 15.2707ZM23.2244 17.7907C23.2244 19.0887 22.167 20.146 20.869 20.146H11.055C9.75703 20.146 8.69964 19.0887 8.69964 17.7907V17.3601C8.69964 13.4282 11.8401 10.2117 15.7467 10.0978C15.8164 10.1041 15.8924 10.1041 15.962 10.1041C16.0317 10.1041 16.1076 10.1041 16.1773 10.0978C20.0839 10.2117 23.2244 13.4282 23.2244 17.3601V17.7907ZM23.9778 15.2707C23.6296 13.9347 22.9648 12.7381 22.0594 11.7503C22.9964 10.9399 24.2121 10.4523 25.5418 10.4397C25.5544 10.4397 25.5671 10.4397 25.5797 10.4397C25.5924 10.4397 25.6051 10.4397 25.6177 10.4397C28.3846 10.4587 30.664 12.5734 30.949 15.2707H23.9778Z"
                fill= {location.pathname == "/people" ? "white" : "#8C97AC"}
                stroke= {location.pathname == "/people" ? "white" : "#8C97AC"}
                stroke-width="0.5"
              />
            </motion.svg>
          </div>
        </Link>
      </div>

      <div className="Box">
        <Link to="/result">
          <div
            className="Box-Inside"
            style={{
              backgroundColor:
                location.pathname == "/result" ? "#0076FE" : null,
              boxShadow:
                location.pathname == "/result"
                  ? "0px 0px 1px 1px #0475fc"
                  : null,
            }}
          >
            <motion.svg
             whileTap={{ scale: 0.8 }}
              width="29"
              height="29"
              viewBox="0 0 29 29"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22.9922 3.79953H20.3686V2.62583C20.3686 2.2461 19.9544 2.07351 19.5747 2.07351H17.538C17.0547 0.692659 15.8464 0.00223519 14.4656 0.00223519C13.0999 -0.0491056 11.8578 0.788271 11.3932 2.07351H9.39096C9.01123 2.07351 8.63149 2.2461 8.63149 2.62583V3.79953H6.00783C4.45307 3.81612 3.18111 5.04261 3.10803 6.59572V26.3763C3.10803 27.8953 4.48888 28.9999 6.00783 28.9999H22.9922C24.5112 28.9999 25.892 27.8953 25.892 26.3763V6.59579C25.819 5.04261 24.547 3.81612 22.9922 3.79953ZM10.0123 3.45436H11.911C12.2424 3.41392 12.5086 3.16177 12.5669 2.83298C12.7713 1.94268 13.5524 1.30359 14.4656 1.27954C15.3703 1.30696 16.1396 1.94803 16.3297 2.83298C16.3916 3.17314 16.6754 3.42852 17.0201 3.45436H18.9879V6.21605H10.0123V3.45436ZM24.5112 26.3764C24.5112 27.1359 23.7517 27.6191 22.9922 27.6191H6.00783C5.24835 27.6191 4.48888 27.1359 4.48888 26.3764V6.59579C4.55932 5.80526 5.21426 5.19492 6.00783 5.18045H8.63143V6.94103C8.6679 7.32784 9.0029 7.61719 9.3909 7.59697H19.5746C19.9697 7.61857 20.3153 7.33319 20.3686 6.94103V5.18038H22.9922C23.7857 5.19492 24.4407 5.80519 24.5111 6.59572V26.3764H24.5112Z"
                fill= {location.pathname == "/result" ? "white" : "#8C97AC"} 
              />
              <path
                d="M11.8419 15.4332C11.5829 15.1602 11.153 15.1448 10.8753 15.3987L8.66589 17.5045L7.73383 16.5379C7.47488 16.2649 7.04499 16.2496 6.76721 16.5034C6.4998 16.7835 6.4998 17.2243 6.76721 17.5045L8.18254 18.9544C8.30505 19.0915 8.482 19.1674 8.66582 19.1615C8.84792 19.1589 9.02164 19.0845 9.1491 18.9544L11.8417 16.3998C12.1087 16.1549 12.1265 15.74 11.8816 15.4731C11.869 15.4592 11.8558 15.4459 11.8419 15.4332Z"
                fill= {location.pathname == "/result" ? "white" : "#8C97AC"} 
              />
              <path
                d="M21.7495 16.9176H13.8097C13.4284 16.9176 13.1193 17.2267 13.1193 17.608C13.1193 17.9894 13.4284 18.2985 13.8097 18.2985H21.7495C22.1309 18.2985 22.44 17.9894 22.44 17.608C22.44 17.2267 22.1309 16.9176 21.7495 16.9176Z"
                fill= {location.pathname == "/result" ? "white" : "#8C97AC"} 
              />
              <path
                d="M11.8419 9.90983C11.5829 9.63687 11.153 9.62147 10.8753 9.87533L8.66589 11.9811L7.73383 11.0145C7.47488 10.7415 7.04499 10.7261 6.76721 10.98C6.4998 11.2601 6.4998 11.7009 6.76721 11.9811L8.18254 13.431C8.30505 13.5682 8.482 13.644 8.66582 13.6381C8.84792 13.6356 9.02164 13.5611 9.1491 13.431L11.8417 10.8764C12.1087 10.6316 12.1265 10.2166 11.8816 9.94974C11.869 9.93579 11.8558 9.92251 11.8419 9.90983Z"
                fill= {location.pathname == "/result" ? "white" : "#8C97AC"} 
              />
              <path
                d="M21.7495 11.3942H13.8097C13.4284 11.3942 13.1193 11.7033 13.1193 12.0847C13.1193 12.466 13.4284 12.7751 13.8097 12.7751H21.7495C22.1309 12.7751 22.44 12.466 22.44 12.0847C22.44 11.7033 22.1309 11.3942 21.7495 11.3942Z"
                fill= {location.pathname == "/result" ? "white" : "#8C97AC"} 
              />
              <path
                d="M11.8419 20.9566C11.5829 20.6836 11.153 20.6683 10.8753 20.9221L8.66589 23.0278L7.73383 22.0612C7.47488 21.7882 7.04499 21.7729 6.76721 22.0267C6.4998 22.3069 6.4998 22.7477 6.76721 23.0278L8.18254 24.4777C8.30505 24.6149 8.482 24.6907 8.66582 24.6849C8.84792 24.6823 9.02164 24.6078 9.1491 24.4777L11.8417 21.9232C12.1087 21.6783 12.1265 21.2633 11.8816 20.9965C11.869 20.9826 11.8558 20.9693 11.8419 20.9566Z"
                 fill= {location.pathname == "/result" ? "white" : "#8C97AC"} 
              />
              <path
                d="M21.7495 22.441H13.8097C13.4284 22.441 13.1193 22.7501 13.1193 23.1314C13.1193 23.5127 13.4284 23.8218 13.8097 23.8218H21.7495C22.1309 23.8218 22.44 23.5127 22.44 23.1314C22.44 22.7501 22.1309 22.441 21.7495 22.441Z"
                 fill= {location.pathname == "/result" ? "white" : "#8C97AC"} 
              />
            </motion.svg>
          </div>
        </Link>
      </div>

      <div className="Box">
        <Link to="/chatbot">
          <div
            className="Box-Inside"
            style={{
              backgroundColor:
                location.pathname == "/chatbot" ? "#0076FE" : null,
              boxShadow:
                location.pathname == "/chatbot"
                  ? "0px 0px 1px 1px #0475fc"
                  : null,
            }}
          >
            <motion.svg
             whileTap={{ scale: 0.8 }}
              width="32"
              height="29"
              viewBox="0 0 32 29"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M29.2692 13.6923H27.5385V11.9615C27.5385 10.371 26.2444 9.07692 24.6538 9.07692H21.7692V7.34615C21.7692 7.02769 21.5108 6.76923 21.1923 6.76923H16.5769V5.53346C17.5692 5.27558 18.3077 4.37962 18.3077 3.30769C18.3077 2.035 17.2727 1 16 1C14.7273 1 13.6923 2.035 13.6923 3.30769C13.6923 4.37962 14.4308 5.27558 15.4231 5.53346V6.76923H10.8077C10.4892 6.76923 10.2308 7.02769 10.2308 7.34615V9.07692H7.34615C5.75558 9.07692 4.46154 10.371 4.46154 11.9615V13.6923H2.73077C1.77654 13.6923 1 14.4688 1 15.4231V22.3462C1 23.3004 1.77654 24.0769 2.73077 24.0769H4.46154V25.8077C4.46154 27.3983 5.75558 28.6923 7.34615 28.6923H24.6538C26.2444 28.6923 27.5385 27.3983 27.5385 25.8077V24.0769H29.2692C30.2235 24.0769 31 23.3004 31 22.3462V15.4231C31 14.4688 30.2235 13.6923 29.2692 13.6923ZM14.8462 3.30769C14.8462 2.67135 15.3637 2.15385 16 2.15385C16.6363 2.15385 17.1538 2.67135 17.1538 3.30769C17.1538 3.94404 16.6363 4.46154 16 4.46154C15.3637 4.46154 14.8462 3.94404 14.8462 3.30769ZM2.73077 22.9231C2.41288 22.9231 2.15385 22.664 2.15385 22.3462V15.4231C2.15385 15.1052 2.41288 14.8462 2.73077 14.8462H4.46154V22.9231H2.73077ZM11.3846 7.92308H20.6154V9.07692H11.3846V7.92308ZM26.3846 25.8077C26.3846 26.7619 25.6081 27.5385 24.6538 27.5385H7.34615C6.39192 27.5385 5.61538 26.7619 5.61538 25.8077V11.9615C5.61538 11.0073 6.39192 10.2308 7.34615 10.2308H24.6538C25.6081 10.2308 26.3846 11.0073 26.3846 11.9615V25.8077ZM29.8462 22.3462C29.8462 22.664 29.5871 22.9231 29.2692 22.9231H27.5385V14.8462H29.2692C29.5871 14.8462 29.8462 15.1052 29.8462 15.4231V22.3462Z"
                fill= { location.pathname == "/chatbot" ? "white" : "#8C97AC"} 
                stroke= { location.pathname == "/chatbot" ? "white" : "#8C97AC"} 
                stroke-width="0.5"
              />
              <path
                d="M21.1923 19.4615H10.8076C10.4892 19.4615 10.2307 19.72 10.2307 20.0385V20.6154C10.2307 23.7965 12.8188 26.3846 15.9999 26.3846C19.1811 26.3846 21.7692 23.7965 21.7692 20.6154V20.0385C21.7692 19.72 21.5107 19.4615 21.1923 19.4615ZM15.9999 25.2308C13.4551 25.2308 11.3846 23.1602 11.3846 20.6154H20.6153C20.6153 23.1602 18.5448 25.2308 15.9999 25.2308Z"
                                fill= { location.pathname == "/chatbot" ? "white" : "#8C97AC"} 
                stroke= { location.pathname == "/chatbot" ? "white" : "#8C97AC"} 

                stroke-width="0.5"
              />
              <path
                d="M12.5385 16C12.5385 14.7273 11.5035 13.6923 10.2308 13.6923C8.9581 13.6923 7.9231 14.7273 7.9231 16C7.9231 17.2727 8.9581 18.3077 10.2308 18.3077C11.5035 18.3077 12.5385 17.2727 12.5385 16ZM9.07694 16C9.07694 15.3637 9.59444 14.8462 10.2308 14.8462C10.8671 14.8462 11.3846 15.3637 11.3846 16C11.3846 16.6364 10.8671 17.1539 10.2308 17.1539C9.59444 17.1539 9.07694 16.6364 9.07694 16Z"
                                fill= { location.pathname == "/chatbot" ? "white" : "#8C97AC"} 
                stroke= { location.pathname == "/chatbot" ? "white" : "#8C97AC"} 

                stroke-width="0.5"
              />
              <path
                d="M21.7692 13.6923C20.4965 13.6923 19.4615 14.7273 19.4615 16C19.4615 17.2727 20.4965 18.3077 21.7692 18.3077C23.0419 18.3077 24.0769 17.2727 24.0769 16C24.0769 14.7273 23.0419 13.6923 21.7692 13.6923ZM21.7692 17.1539C21.1329 17.1539 20.6154 16.6364 20.6154 16C20.6154 15.3637 21.1329 14.8462 21.7692 14.8462C22.4056 14.8462 22.9231 15.3637 22.9231 16C22.9231 16.6364 22.4056 17.1539 21.7692 17.1539Z"
                                fill= { location.pathname == "/chatbot" ? "white" : "#8C97AC"} 
                stroke= { location.pathname == "/chatbot" ? "white" : "#8C97AC"} 

                stroke-width="0.5"
              />
            </motion.svg>
          </div>
        </Link>
      </div>

      <div className="Box">
        <Link to="/settings">
          <div
            className="Box-Inside"
            style={{
              backgroundColor:
                location.pathname == "/settings" ? "#0076FE" : null,
              boxShadow:
                location.pathname == "/settings"
                  ? "0px 0px 1px 1px #0475fc"
                  : null,
            }}
          >
            <motion.svg
             whileTap={{ scale: 0.8 }}
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0)">
                <path
                  d="M14.8786 28H13.1213C11.7001 28 10.5437 26.8437 10.5437 25.4224V24.8279C9.93945 24.6349 9.35238 24.3912 8.78839 24.0993L8.36708 24.5206C7.34666 25.5423 5.71211 25.5123 4.72134 24.5202L3.47933 23.2783C2.4868 22.2869 2.45826 20.6528 3.47966 19.6325L3.90064 19.2116C3.60877 18.6476 3.36514 18.0606 3.17204 17.4563H2.57759C1.15637 17.4563 0 16.2999 0 14.8787V13.1213C0 11.7001 1.15637 10.5437 2.57764 10.5437H3.17209C3.3652 9.93945 3.60883 9.35244 3.9007 8.78845L3.47938 8.36719C2.45859 7.34748 2.48675 5.71331 3.47971 4.72145L4.72183 3.47938C5.7149 2.48495 7.34907 2.46012 8.36752 3.47971L8.78845 3.90064C9.35244 3.60883 9.93951 3.36514 10.5437 3.17204V2.57759C10.5437 1.15631 11.7001 0 13.1214 0H14.8787C16.2999 0 17.4563 1.15631 17.4563 2.57759V3.17209C18.0605 3.36514 18.6476 3.60883 19.2116 3.9007L19.6329 3.47938C20.6533 2.45771 22.2878 2.48768 23.2786 3.47977L24.5206 4.72172C25.5131 5.71315 25.5417 7.34716 24.5203 8.36746L24.0993 8.78845C24.3912 9.35244 24.6348 9.9394 24.8279 10.5437H25.4224C26.8436 10.5437 28 11.7001 28 13.1213V14.8787C28 16.2999 26.8436 17.4563 25.4224 17.4563H24.8279C24.6348 18.0605 24.3912 18.6476 24.0993 19.2116L24.5206 19.6329C25.5414 20.6526 25.5133 22.2867 24.5203 23.2786L23.2782 24.5207C22.2851 25.5151 20.6509 25.5399 19.6325 24.5203L19.2116 24.0994C18.6476 24.3912 18.0605 24.6349 17.4563 24.828V25.4225C17.4563 26.8437 16.2999 28 14.8786 28ZM9.06265 22.3765C9.84616 22.8399 10.6894 23.1899 11.569 23.4169C11.9313 23.5104 12.1844 23.8371 12.1844 24.2112V25.4224C12.1844 25.939 12.6048 26.3594 13.1214 26.3594H14.8787C15.3953 26.3594 15.8157 25.939 15.8157 25.4224V24.2112C15.8157 23.8371 16.0688 23.5104 16.431 23.4169C17.3106 23.1899 18.1539 22.8399 18.9374 22.3765C19.2598 22.1858 19.6702 22.2377 19.9351 22.5025L20.793 23.3605C21.1629 23.7309 21.7569 23.7223 22.1178 23.3609L23.3606 22.1181C23.7206 21.7586 23.7326 21.1644 23.361 20.7933L22.5026 19.935C22.2379 19.6702 22.186 19.2597 22.3766 18.9374C22.84 18.1539 23.19 17.3106 23.417 16.431C23.5105 16.0687 23.8372 15.8157 24.2113 15.8157H25.4224C25.939 15.8157 26.3594 15.3954 26.3594 14.8787V13.1214C26.3594 12.6048 25.939 12.1844 25.4224 12.1844H24.2113C23.8371 12.1844 23.5105 11.9313 23.417 11.5691C23.19 10.6895 22.8399 9.84621 22.3766 9.06276C22.186 8.74043 22.2379 8.32995 22.5026 8.06515L23.3606 7.20716C23.7315 6.8367 23.7219 6.2428 23.361 5.88235L22.1182 4.63958C21.758 4.27886 21.1638 4.2683 20.7934 4.63925L19.9351 5.49757C19.6703 5.76242 19.2597 5.81427 18.9375 5.62362C18.154 5.16026 17.3107 4.8102 16.4311 4.5832C16.0688 4.48973 15.8157 4.16303 15.8157 3.78891V2.57759C15.8157 2.06095 15.3954 1.64062 14.8787 1.64062H13.1214C12.6048 1.64062 12.1844 2.06095 12.1844 2.57759V3.7888C12.1844 4.16292 11.9313 4.48962 11.5691 4.58309C10.6895 4.81009 9.84621 5.16015 9.0627 5.62352C8.74027 5.8141 8.32984 5.76226 8.06504 5.49746L7.2071 4.63947C6.8372 4.26912 6.24312 4.27771 5.88235 4.63909L4.63947 5.88191C4.27952 6.24143 4.26748 6.8355 4.63914 7.20672L5.49746 8.06504C5.76226 8.32984 5.8141 8.74032 5.62352 9.06265C5.16015 9.8461 4.81015 10.6894 4.58314 11.569C4.48962 11.9313 4.16292 12.1843 3.78886 12.1843H2.57764C2.06101 12.1844 1.64062 12.6047 1.64062 13.1213V14.8787C1.64062 15.3953 2.06101 15.8156 2.57764 15.8156H3.7888C4.16292 15.8156 4.48957 16.0687 4.58309 16.4309C4.81009 17.3106 5.16015 18.1538 5.62346 18.9373C5.81405 19.2596 5.7622 19.6701 5.49741 19.9349L4.63941 20.7929C4.26852 21.1634 4.2782 21.7573 4.63909 22.1177L5.88186 23.3605C6.24209 23.7212 6.83621 23.7318 7.20666 23.3608L8.06493 22.5025C8.26006 22.3074 8.666 22.1419 9.06265 22.3765Z"
                  fill= { location.pathname == "/settings" ? "white" : "#8C97AC"}
                />
                <path
                  d="M14 20.092C10.6407 20.092 7.90784 17.3591 7.90784 13.9998C7.90784 10.6406 10.6407 7.90765 14 7.90765C17.3593 7.90765 20.0922 10.6406 20.0922 13.9998C20.0922 17.3591 17.3593 20.092 14 20.092ZM14 9.54828C11.5454 9.54828 9.54846 11.5452 9.54846 13.9998C9.54846 16.4544 11.5454 18.4514 14 18.4514C16.4546 18.4514 18.4516 16.4544 18.4516 13.9998C18.4516 11.5452 16.4547 9.54828 14 9.54828Z"
                  fill= { location.pathname == "/settings" ? "white" : "#8C97AC"}
                />
              </g>
              <defs>
                <clipPath id="clip0">
                  <rect width="28" height="28" fill="white" />
                </clipPath>
              </defs>
            </motion.svg>
          </div>
        </Link>
      </div>

      {/* <div className="Box">
                            <div className="Box-Inside" >

           

            </div> */}
    </nav>
  );
};

export default SideBar;
