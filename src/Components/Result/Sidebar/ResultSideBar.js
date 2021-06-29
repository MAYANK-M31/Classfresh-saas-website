import React, { Component } from "react";
import "../../../css/Result/Sidebar/ResultSideBar.css";

const ResultSideBar = () => {
  return (
    <div className="ResultSidebar">
      <div className="GroupView">
        <p>All Lists</p>
        <svg
          width="25"
          height="25"
          viewBox="0 0 25 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="1"
            y="1"
            width="23"
            height="23"
            rx="5"
            stroke="#506D85"
            stroke-width="2"
          />
          <g clip-path="url(#clip0)">
            <path
              d="M18.9772 11.1364H13.8636V6.02273C13.8636 5.45818 13.4054 5 12.8409 5H12.1591C11.5945 5 11.1364 5.45818 11.1364 6.02273V11.1364H6.02273C5.45818 11.1364 5 11.5945 5 12.1591V12.8409C5 13.4054 5.45818 13.8636 6.02273 13.8636H11.1364V18.9772C11.1364 19.5418 11.5945 20 12.1591 20H12.8409C13.4054 20 13.8636 19.5418 13.8636 18.9772V13.8636H18.9772C19.5418 13.8636 20 13.4054 20 12.8409V12.1591C20 11.5945 19.5418 11.1364 18.9772 11.1364Z"
              fill="#506D85"
            />
          </g>
          <defs>
            <clipPath id="clip0">
              <rect
                width="15"
                height="15"
                fill="white"
                transform="translate(5 5)"
              />
            </clipPath>
          </defs>
        </svg>
      </div>

      <div className="SearchGroupView">
        <div className="SearchGroupInputView">
          <div className="SearchGroupIcon">
            <svg
              width="19"
              height="18"
              viewBox="0 0 19 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.36713 0C3.89981 0 0.265137 3.55609 0.265137 7.92682C0.265137 12.2978 3.89981 15.8536 8.36713 15.8536C12.8347 15.8536 16.4691 12.2978 16.4691 7.92682C16.4691 3.55609 12.8347 0 8.36713 0ZM8.36713 14.3903C4.72448 14.3903 1.76089 11.4908 1.76089 7.92686C1.76089 4.36296 4.72448 1.46341 8.36713 1.46341C12.0098 1.46341 14.9734 4.36293 14.9734 7.92682C14.9734 11.4907 12.0098 14.3903 8.36713 14.3903Z"
                fill="#506D85"
              />
              <path
                d="M18.4437 16.7511L14.1559 12.5559C13.8637 12.2701 13.3906 12.2701 13.0984 12.5559C12.8062 12.8416 12.8062 13.305 13.0984 13.5906L17.3862 17.7857C17.5323 17.9286 17.7235 18.0001 17.915 18.0001C18.1062 18.0001 18.2976 17.9286 18.4437 17.7857C18.7359 17.5001 18.7359 17.0367 18.4437 16.7511Z"
                fill="#506D85"
              />
            </svg>
          </div>
          <input className="SearchGroupInput" placeholder="Search..." />
        </div>
      </div>

      <div className="GroupListView">
        <div className="GroupParentView">
          <div className="GroupParentViewInside">
            <svg
              style={{ marginLeft: "20px" }}
              width="7"
              height="7"
              viewBox="0 0 7 7"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.15001 5.74127L6.81188 1.85304C6.93489 1.67348 7 1.49255 7 1.34217C7 1.05143 6.76666 0.871582 6.37608 0.871582L0.623012 0.871582C0.232886 0.871582 0 1.0512 0 1.34126C0 1.49187 0.0651627 1.66991 0.188519 1.84987L2.85033 5.73991C3.02179 5.99008 3.25252 6.12862 3.50031 6.12862C3.74793 6.12868 3.97861 5.99172 4.15001 5.74127Z"
                fill="#2C385C"
              />
            </svg>

                  <p>Science</p>
          </div>
          <div className="GroupChildView">
            <p>Mid Term</p>
          </div>
          <div className="GroupChildView">
            <p>Recently Added</p>
          </div>
        </div>

        <div className="GroupParentView">
          <div className="GroupParentViewInside">
            <svg
              style={{ marginLeft: "20px" }}
              width="7"
              height="7"
              viewBox="0 0 7 7"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.15001 5.74127L6.81188 1.85304C6.93489 1.67348 7 1.49255 7 1.34217C7 1.05143 6.76666 0.871582 6.37608 0.871582L0.623012 0.871582C0.232886 0.871582 0 1.0512 0 1.34126C0 1.49187 0.0651627 1.66991 0.188519 1.84987L2.85033 5.73991C3.02179 5.99008 3.25252 6.12862 3.50031 6.12862C3.74793 6.12868 3.97861 5.99172 4.15001 5.74127Z"
                fill="#2C385C"
              />
            </svg>

           

            <p>Maths</p>
          </div>
          <div className="GroupChildView">
            <p>class 5th</p>
          </div>
          <div className="GroupChildView">
            <p>Recently Added</p>
          </div>
        </div>

        <div className="GroupParentView">
          <div className="GroupParentViewInside">
            <svg
              style={{ marginLeft: "20px" }}
              width="7"
              height="7"
              viewBox="0 0 7 7"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.15001 5.74127L6.81188 1.85304C6.93489 1.67348 7 1.49255 7 1.34217C7 1.05143 6.76666 0.871582 6.37608 0.871582L0.623012 0.871582C0.232886 0.871582 0 1.0512 0 1.34126C0 1.49187 0.0651627 1.66991 0.188519 1.84987L2.85033 5.73991C3.02179 5.99008 3.25252 6.12862 3.50031 6.12862C3.74793 6.12868 3.97861 5.99172 4.15001 5.74127Z"
                fill="#2C385C"
              />
            </svg>

            

            <p>English</p>
          </div>
          <div className="GroupChildView">
            <p>First UT</p>
          </div>
          <div className="GroupChildView">
            <p>Recently Added</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultSideBar;
