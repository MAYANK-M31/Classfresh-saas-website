import React, { Component } from "react";

const SubjectUtilityHeader = ({ ShowModal, ShowSideBar }) => {
  return (
    <div className="UtilityDiv">
      <div className="InputDivLeft">
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
          <input className="SearchGroupInput" placeholder="Search" />
        </div>
        <div>
          <button onClick={ShowSideBar} className="CreateClassBtnDiv">
            <p style={{ cursor: "pointer" }}>Add Subject</p>
          </button>
        </div>
        {/* <div>
          <button onClick={ShowModal} className="FilterBtnDiv">
            <p style={{ cursor: "pointer" }}>Filter</p>
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.64524 7.08807C5.80265 7.25937 5.88907 7.48314 5.88907 7.71463V14.5357C5.88907 14.9462 6.38445 15.1546 6.67767 14.866L8.58047 12.6854C8.8351 12.3798 8.97554 12.2286 8.97554 11.9261V7.71617C8.97554 7.48468 9.0635 7.26091 9.21937 7.0896L14.6793 1.16514C15.0883 0.72069 14.7735 0 14.1685 0H0.696082C0.0911348 0 -0.225228 0.719147 0.185272 1.16514L5.64524 7.08807Z"
                fill="#64656A"
              />
            </svg>
          </button>
        </div> */}
      </div>

      <div className="InputDivRight">
        <div>
          <button onClick={ShowModal} className="ImportBtnDiv">
            <p style={{ cursor: "pointer" }}>Import</p>
          </button>
        </div>
        <div>
          <button onClick={ShowModal} className="ExportBtnDiv">
            <p style={{ cursor: "pointer" }}>Export</p>
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.64524 7.08807C5.80265 7.25937 5.88907 7.48314 5.88907 7.71463V14.5357C5.88907 14.9462 6.38445 15.1546 6.67767 14.866L8.58047 12.6854C8.8351 12.3798 8.97554 12.2286 8.97554 11.9261V7.71617C8.97554 7.48468 9.0635 7.26091 9.21937 7.0896L14.6793 1.16514C15.0883 0.72069 14.7735 0 14.1685 0H0.696082C0.0911348 0 -0.225228 0.719147 0.185272 1.16514L5.64524 7.08807Z"
                fill="#ffffff"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubjectUtilityHeader;
