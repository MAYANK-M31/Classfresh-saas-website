import React, { Component, useState } from "react";
import "../../css/People/People.css";
import PeopleHeader from "./Header/PeopleHeader";
import TextField from "@material-ui/core/TextField";
import PeopleSideBar from "./PeopleSideBar";

const People = () => {
  const [addteacher, setaddteacher] = useState(false);

  return (
    <div className="Main-Div">
      <PeopleHeader />
      <div className="Inside-Div">
        <PeopleSideBar />
        <div className="Middle-Div">
          <div className="UpperBar-Div">
            <div className="UpperBar-Left">
              <input
                style={{ width: "20px", height: "20px" }}
                type="checkbox"
              />
              <p>Select all</p>
              <hr
                style={{ width: "1px", height: "35%", marginInline: "20px" }}
              ></hr>

              <div className="SearchUserView">
                <div className="SearchUserInputView">
                  <div className="SearchUserIcon">
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
                  <input className="SearchUserInput" placeholder="Search..." />
                </div>
              </div>

              <div className="FilterBtn">
                <p>Filter</p>

                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0)">
                    <path
                      d="M5.71311 7.08807C5.87052 7.25937 5.95694 7.48314 5.95694 7.71463V14.5357C5.95694 14.9462 6.45232 15.1546 6.74554 14.866L8.64834 12.6854C8.90298 12.3798 9.04341 12.2286 9.04341 11.9261V7.71617C9.04341 7.48468 9.13137 7.26091 9.28724 7.0896L14.7472 1.16514C15.1561 0.72069 14.8413 0 14.2364 0H0.763953C0.159006 0 -0.157357 0.719147 0.253143 1.16514L5.71311 7.08807Z"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0">
                      <rect width="15" height="15" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>

              {/* Add New User Button */}
              <div
                onClick={() => {
                  setaddteacher(true);
                }}
                className="AddTeacherBtn"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="1"
                    y="1"
                    width="16"
                    height="16"
                    rx="5"
                    stroke="white"
                    stroke-width="2"
                  />
                  <g clip-path="url(#clip0)">
                    <path
                      d="M13.6637 8.01818H9.98189V4.33636C9.98189 3.92989 9.652 3.6 9.24552 3.6H8.75464C8.34817 3.6 8.01828 3.92989 8.01828 4.33636V8.01818H4.33646C3.92999 8.01818 3.6001 8.34807 3.6001 8.75454V9.24542C3.6001 9.6519 3.92999 9.98179 4.33646 9.98179H8.01828V13.6636C8.01828 14.0701 8.34817 14.4 8.75464 14.4H9.24552C9.652 14.4 9.98189 14.0701 9.98189 13.6636V9.98179H13.6637C14.0702 9.98179 14.4001 9.6519 14.4001 9.24542V8.75454C14.4001 8.34807 14.0702 8.01818 13.6637 8.01818Z"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0">
                      <rect
                        width="10.8"
                        height="10.8"
                        fill="white"
                        transform="translate(3.6001 3.6)"
                      />
                    </clipPath>
                  </defs>
                </svg>

                <p> Add Teacher</p>
              </div>
            </div>
            <div className="UpperBar-Right">
              <div className="ImportBtn">
                <p>Import</p>
                <svg
                  width="7"
                  height="7"
                  viewBox="0 0 7 7"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.15001 5.74126L6.81188 1.85303C6.93489 1.67346 7 1.49254 7 1.34215C7 1.05142 6.76666 0.871567 6.37608 0.871567L0.623012 0.871567C0.232886 0.871567 0 1.05119 0 1.34125C0 1.49186 0.0651627 1.66989 0.188519 1.84986L2.85033 5.7399C3.02179 5.99007 3.25252 6.12861 3.50031 6.12861C3.74793 6.12866 3.97861 5.99171 4.15001 5.74126Z"
                    fill="white"
                  />
                </svg>
              </div>
              <div className="ExportBtn">
                <p>Export</p>
                <svg
                  width="7"
                  height="7"
                  viewBox="0 0 7 7"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0)">
                    <path
                      d="M2.84999 1.25892L0.188122 5.14715C0.065106 5.32671 0 5.50764 0 5.65802C0 5.94876 0.233339 6.12861 0.623918 6.12861L6.37699 6.12861C6.76711 6.12861 7 5.94899 7 5.65893C7 5.50832 6.93484 5.33028 6.81148 5.15032L4.14967 1.26028C3.97821 1.01011 3.74748 0.871568 3.49969 0.871568C3.25207 0.871511 3.02139 1.00847 2.84999 1.25892Z"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0">
                      <rect
                        width="7"
                        height="7"
                        fill="white"
                        transform="translate(7) rotate(90)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </div>
            </div>
          </div>

          <div className="Main-Inside-Div">
            <div
              className="Container-Div"
              style={{
                width: addteacher ? "calc(100% - 340px)" : "calc(100%)",
                transition: "all 0.1s ease-out",
              }}
            >
              <div className="ContainerTableDiv">
                <table class="Table">
                  <thead class="TableHeader">
                    <tr>
                      <th style={{ width: "5%" }} scope="col"></th>
                      <th style={{ width: "25%" }} scope="col">
                        Name
                      </th>
                      <th style={{ width: "25%" }} scope="col">
                        Contact/Email
                      </th>
                      <th style={{ width: "15%" }} scope="col">
                        Class Assigned
                      </th>
                      <th style={{ width: "15%" }} scope="col">
                        Gender
                      </th>
                      <th style={{ width: "15%" }} scope="col">
                        Status
                      </th>
                      <th style={{ width: "5%" }} scope="col"></th>
                    </tr>
                  </thead>

                  <tbody className="TableRow">
                    <tr>
                      <td
                        style={{
                          verticalAlign: "center",
                          paddingTop: "8px",
                          textAlign: "center",
                        }}
                      >
                        <input
                          style={{ width: "16px", height: "16px" }}
                          type="checkbox"
                        />
                      </td>
                      <td>
                        <div className="RowNameDiv">
                          <div className="RowNameCircle">MR</div>
                          Grant Cardone
                        </div>
                      </td>
                      <td>8076505054</td>
                      <td>1st</td>
                      <td>Male</td>
                      <td>Active</td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          height: "43px",
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <input
                          style={{ width: "16px", height: "16px" }}
                          type="checkbox"
                        />
                      </td>
                      <td>
                        <div className="RowNameDiv">
                          <div className="RowNameCircle">MR</div>
                          Mark Rober
                        </div>
                      </td>
                      <td>8076505054</td>
                      <td>1st</td>
                      <td>Male</td>
                      <td>Active</td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          height: "43px",
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <input
                          style={{ width: "16px", height: "16px" }}
                          type="checkbox"
                        />
                      </td>
                      <td>
                        <div className="RowNameDiv">
                          <div className="RowNameCircle">MR</div>
                          Mark Rober
                        </div>
                      </td>
                      <td>8076505054</td>
                      <td>1st</td>
                      <td>Male</td>
                      <td>Active</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="Right-Div" hidden={!addteacher ? true : false}>
              <div className="TitleDiv">
                <p>New Teacher</p>
                <svg
                  onClick={() => {
                    setaddteacher(false);
                  }}
                  width="23"
                  height="23"
                  viewBox="0 0 23 23"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="1"
                    y="1"
                    width="21"
                    height="21"
                    rx="5"
                    stroke="#506d85"
                    stroke-width="2"
                  />
                  <g clip-path="url(#clip0)">
                    <path
                      d="M14.8268 6.39922L11.5002 9.72583L8.17362 6.39922C7.80636 6.03196 7.21023 6.03196 6.84297 6.39922L6.39945 6.84274C6.03219 7.21 6.03219 7.80612 6.39945 8.17338L9.72607 11.5L6.39945 14.8266C6.03219 15.1939 6.03219 15.79 6.39945 16.1573L6.84297 16.6008C7.21023 16.968 7.80636 16.968 8.17362 16.6008L11.5002 13.2742L14.8268 16.6008C15.1941 16.968 15.7902 16.968 16.1575 16.6008L16.601 16.1573C16.9683 15.79 16.9683 15.1939 16.601 14.8266L13.2744 11.5L16.601 8.17338C16.9683 7.80612 16.9683 7.21 16.601 6.84274L16.1575 6.39922C15.7902 6.03196 15.1941 6.03196 14.8268 6.39922V6.39922Z"
                      fill="#506d85"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0">
                      <rect
                        x="1.74219"
                        y="11.5"
                        width="13.8"
                        height="13.8"
                        rx="6.9"
                        transform="rotate(-45 1.74219 11.5)"
                        fill="white"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <div className="AddDataForm">
                <div className="InputFormView">
                  <input className="InputView" placeholder="Enter Name" />
                  <input className="InputView" placeholder="Contact/Email" />
                  <input
                    type="dropdown"
                    className="InputView"
                    placeholder="Gender"
                  />
                  <div className="ClassSectionView">
                    <input className="ClassInputView" placeholder="Class" />
                    <input className="ClassInputView" placeholder="Section" />
                  </div>
                </div>
              </div>
              <div className="AddTeacherSaveBtnDiv">
                <div className="AddTeacherSaveBtn">
                  <p>Save</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default People;
