import React, { Component, useCallback, useEffect, useState } from "react";
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
import { URL } from "../../URL/URL";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useHistory } from "react-router-dom";
import { Form } from "react-bootstrap";

const Result = (props) => {
  const [minimize, setminimize] = useState(false);
  const [ShowRowInserter, setShowRowInserter] = useState(false);
  const [ShowColumnInserter, setShowColumnInserter] = useState(false);

  const [DomLoader, setDomLoader] = useState(true);
  const [StudentData, setStudentData] = useState([]);
  const [StudentSavedData, setStudentSavedData] = useState([]);
  const [FileId, setFileId] = useState(null);
  const [RerenderTable, setRerenderTable] = useState(false);

  const [ColumnName, setColumnName] = useState("");
  const [ColumnType, setColumnType] = useState("MARKS");
  const [ColumnMaxMarks, setColumnMaxMarks] = useState("");

  const parsedQuery = qs.parse(props.location.search);

  let TOKEN = localStorage.getItem("access_token");
  const history = useHistory();

  useEffect(() => {
    setTimeout(() => {
      setDomLoader(false);
    }, 1500);
    // setDomLoader(false);
  }, []);

  // useEffect(() => {
  //   setDomLoader(true);

  //   setTimeout(() => {
  //     setDomLoader(false);
  //   }, 1500);
  //   // setDomLoader(false);
  // }, []);

  const FileSelected = (item) => {
    setFileId(item?.id);
  };

  const FetchStudentToAdd = useCallback(async () => {
    await axios({
      method: "get", //you can set what request you want to be
      url: `${URL}/excel/row/students/tobeadd?fileId=${parsedQuery?.fileId}`,
      headers: {
        Authorization: "Bearer " + TOKEN,
      },
    })
      .then(({ data }) => {
        if (data.status == 200) {

          setStudentData(data.payload.data);
          setStudentSavedData(data.payload.data);
        } else {
          toast.error(data.message, {
            position: "top-center",
            autoClose: 3000,
          });
        }
      })
      .catch((e) => {
        toast.error("Something went wrong", {
          position: "top-center",
          autoClose: 3000,
        });
      });
  }, [
    setShowRowInserter,
    ShowRowInserter,
    history,
    parsedQuery,
    setStudentData,
    setStudentSavedData,
  ]);

  const AddRow = useCallback(
    async (item) => {
      const Data = {
        subjectId: parsedQuery?.subjectId,
        payload: item,
      };

      if (item.length == StudentData.length) {
        setShowRowInserter(false);
      }

      await axios({
        method: "post", //you can set what request you want to be
        url: `${URL}/excel/row`,
        headers: {
          Authorization: "Bearer " + TOKEN,
        },
        data: Data,
      })
        .then(({ data }) => {
          if (data.status == 200) {
            // FetchStudentToAdd()
            var FilteredArray = StudentData;
            item.forEach((element) => {
              FilteredArray = FilteredArray.filter(
                (e) => e.uuid != element.uuid
              );
            });
            setRerenderTable(!RerenderTable);
            setStudentData(FilteredArray);
            toast.success(data.message, {
              position: "top-center",
              autoClose: 3000,
            });
          } else {
            toast.error(data.message, {
              position: "top-center",
              autoClose: 3000,
            });
          }
        })
        .catch((e) => {
          toast.error("Something went wrong", {
            position: "top-center",
            autoClose: 3000,
          });
        });
    },
    [
      setShowRowInserter,
      ShowRowInserter,
      history,
      parsedQuery,
      setStudentData,
      StudentData,
    ]
  );

  const AddColumn = useCallback(async () => {
    const Data = {
      fileId: parsedQuery.fileId,
      name: ColumnName,
      valueType: ColumnType,
      maxmarks: ColumnMaxMarks,
    };

    await axios({
      method: "post", //you can set what request you want to be
      url: `${URL}/excel/column`,
      headers: {
        Authorization: "Bearer " + TOKEN,
      },
      data: Data,
    })
      .then(({ data }) => {
        if (data.status == 200) {
          setShowColumnInserter(false);
          FetchStudentToAdd();
          setRerenderTable(!RerenderTable);
          setColumnName("")
          setColumnMaxMarks("")
          setColumnType("MARKS")
          toast.success(data.message, {
            position: "top-center",
            autoClose: 3000,
          });
        } else {
          toast.error(data.message, {
            position: "top-center",
            autoClose: 3000,
          });
        }
      })
      .catch((e) => {
        toast.error("Something went wrong", {
          position: "top-center",
          autoClose: 3000,
        });
      });
  }, [setShowColumnInserter, ShowColumnInserter, history, parsedQuery]);

  const Search = useCallback((search) => {
    var condition = new RegExp(search.trim());

    var result = StudentSavedData.filter(function (el) {
      return (
        condition.test(el?.name) ||
        condition.test(el?.contact) ||
        condition.test(el?.rollnumber)
      );
    });

    setStudentData(result);
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
        {/* <ToastContainer /> */}
        <ResultHeaders
          classname={parsedQuery.classlabel ? parsedQuery.classlabel : null}
          section={parsedQuery.sectionlabel ? parsedQuery.sectionlabel : null}
        />
        <div className="Inside-Div">
          <Split
            sizes={[minimize ? 0 : 15.5, minimize ? 100 : 84.5]}
            minSize={0}
            snapOffset={150}
            gutterSize={5}
            direction="horizontal"
            cursor="col-resize"
            className="split-flex" // You'll need to define this. check styles.css
          >
            {/* <div style={{width:"100%",backgroundColor:"red"}} > */}

            <ResultSidebar
              urlData={JSON.stringify(parsedQuery)}
              FileSelected={FileSelected}
            />
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
                      setShowColumnInserter(true);
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

                  <div
                    onClick={() => {
                      FetchStudentToAdd();
                      setShowRowInserter((ShowRowInserter) => !ShowRowInserter);
                    }}
                    className="InsertRowBtn"
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
              <ResultTable
                props={props}
                FileId={FileId}
                RerenderTable={RerenderTable}
              />
            </div>
          </Split>
        </div>

        {/* ROW INSERDER MODAL */}
        <React.Fragment>
          <SwipeableDrawer
            anchor={"right"}
            open={ShowRowInserter}
            onClose={() => {
              setShowRowInserter(false);
            }}
            onOpen={() => {
              setShowRowInserter(false);
            }}
          >
            <div className="RowInsertDrawer">
              <div className="SideBarTitleView">
                <div
                  onClick={() => setShowRowInserter(false)}
                  className="BackBtn"
                >
                  <svg
                    width="14"
                    height="13"
                    viewBox="0 0 14 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M7.207 0.29329C7.3945 0.48081 7.4998 0.73512 7.4998 1.00029C7.4998 1.26545 7.3945 1.51976 7.207 1.70729L3.414 5.5003H13C13.2652 5.5003 13.5196 5.6056 13.7071 5.7932C13.8946 5.9807 14 6.2351 14 6.5003C14 6.7655 13.8946 7.0199 13.7071 7.2074C13.5196 7.3949 13.2652 7.5003 13 7.5003H3.414L7.207 11.2933C7.2998 11.3862 7.3735 11.4965 7.4237 11.6179C7.4739 11.7392 7.4997 11.8693 7.4997 12.0006C7.4997 12.132 7.4737 12.262 7.4234 12.3834C7.3731 12.5047 7.2994 12.6149 7.2065 12.7078C7.1136 12.8006 7.0033 12.8743 6.8819 12.9245C6.7606 12.9747 6.6305 13.0005 6.4991 13.0005C6.3678 13.0004 6.2377 12.9745 6.1164 12.9242C5.9951 12.8739 5.8848 12.8002 5.792 12.7073L0.293 7.2073C0.1119 7.0269 0.00701 6.7838 0 6.5283V6.4713C0.00716 6.2161 0.11205 5.9734 0.293 5.7933L5.792 0.29329C5.8849 0.20031 5.9952 0.12655 6.1166 0.07623C6.238 0.0259 6.3681 0 6.4995 0C6.6309 0 6.761 0.0259 6.8824 0.07623C7.0038 0.12655 7.1141 0.20031 7.207 0.29329Z"
                      fill="#2C385C"
                    />
                  </svg>
                </div>

                <span>Insert Student</span>
              </div>

              <div className="SearchDiv">
                <div className="SearchBarView">
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
                    <input
                      className="SearchGroupInput"
                      placeholder="Search student"
                      // value={props.value}
                      onChange={(e) => Search(e.target.value)}
                      // onChange={(e) => props.onChange(e)}
                    />
                  </div>
                </div>
                {/* Add New User Button */}
                <div
                  style={{
                    cursor: StudentData.length == 0 ? "not-allowed" : "pointer",
                  }}
                  onClick={() =>
                    StudentData.length == 0 ? null : AddRow(StudentData)
                  }
                  className="ImportAllBtn"
                >
                  <p
                    style={{
                      cursor:
                        StudentData.length == 0 ? "not-allowed" : "pointer",
                    }}
                  >
                    Import All
                  </p>
                </div>
              </div>
              <div className="ListDiv">
                {StudentData.length > 0 ? (
                  StudentData.map((item) => (
                    <div className="RowDiv">
                      <div className="NameDiv">
                        <p className="Name">{item?.name}</p>
                        <p className="Contact">{item?.contact}</p>
                      </div>
                      <div className="BatchDiv"></div>
                      <div onClick={() => AddRow([item])} className="BtnDiv">
                        <div className="Btn">Add</div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="ModalNotFoundDiv">
                    <p className="ModalNoTeacherFound">No More Student Found</p>
                  </div>
                )}
              </div>
              <div className="BottomDiv">
                <div
                  onClick={() => {
                    setShowRowInserter((ShowRowInserter) => !ShowRowInserter);
                  }}
                  className="CancelBtn"
                >
                  Cancel
                </div>

                <div
                  onClick={() => {
                    setShowRowInserter((ShowRowInserter) => !ShowRowInserter);
                  }}
                  className="DoneBtn"
                >
                  Done
                </div>
              </div>
            </div>
          </SwipeableDrawer>
        </React.Fragment>

        {/* COLUMN INSERDER MODAL */}
        <React.Fragment>
          <SwipeableDrawer
            anchor={"right"}
            open={ShowColumnInserter}
            onClose={() => {
              setShowColumnInserter(false);
            }}
            onOpen={() => {
              setShowColumnInserter(false);
            }}
          >
            <div className="RowInsertDrawer">
              <div className="SideBarTitleView">
                <div
                  onClick={() => setShowColumnInserter(false)}
                  className="BackBtn"
                >
                  <svg
                    width="14"
                    height="13"
                    viewBox="0 0 14 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M7.207 0.29329C7.3945 0.48081 7.4998 0.73512 7.4998 1.00029C7.4998 1.26545 7.3945 1.51976 7.207 1.70729L3.414 5.5003H13C13.2652 5.5003 13.5196 5.6056 13.7071 5.7932C13.8946 5.9807 14 6.2351 14 6.5003C14 6.7655 13.8946 7.0199 13.7071 7.2074C13.5196 7.3949 13.2652 7.5003 13 7.5003H3.414L7.207 11.2933C7.2998 11.3862 7.3735 11.4965 7.4237 11.6179C7.4739 11.7392 7.4997 11.8693 7.4997 12.0006C7.4997 12.132 7.4737 12.262 7.4234 12.3834C7.3731 12.5047 7.2994 12.6149 7.2065 12.7078C7.1136 12.8006 7.0033 12.8743 6.8819 12.9245C6.7606 12.9747 6.6305 13.0005 6.4991 13.0005C6.3678 13.0004 6.2377 12.9745 6.1164 12.9242C5.9951 12.8739 5.8848 12.8002 5.792 12.7073L0.293 7.2073C0.1119 7.0269 0.00701 6.7838 0 6.5283V6.4713C0.00716 6.2161 0.11205 5.9734 0.293 5.7933L5.792 0.29329C5.8849 0.20031 5.9952 0.12655 6.1166 0.07623C6.238 0.0259 6.3681 0 6.4995 0C6.6309 0 6.761 0.0259 6.8824 0.07623C7.0038 0.12655 7.1141 0.20031 7.207 0.29329Z"
                      fill="#2C385C"
                    />
                  </svg>
                </div>

                <span>Insert Column</span>
              </div>

              <Form
                // onSubmit={(e) => props.HandleSubmitForm(e)}
                className="FormView"
              >
                <Form.Group className="mb-3 " controlId="ModalInputFormView">
                  <Form.Label>Column name</Form.Label>
                  <div style={{ width: "100%" }}>
                    <Form.Control
                      name="text"
                      type="text"
                      aria-required={true}
                      autoComplete="off"
                      className="Input"
                      placeholder="Enter Column name"
                      value={ColumnName}
                      onChange={(e) => {
                        setColumnName(e.target.value);
                      }}
                      required
                    />
                  </div>
                </Form.Group>

                <Form.Group
                  key={`inline-radio`}
                  className="mb-3 "
                  controlId="ModalInputFormView"
                >
                  <Form.Label>Column Type</Form.Label>

                  <div>
                    <Form.Check
                      onChange={() => setColumnType("MARKS")}
                      defaultChecked={true}
                      inline
                      label="Marks"
                      name="group1"
                      type={"radio"}
                      id={`inline-radio-1`}
                    />
                    <Form.Check
                      onChange={() => setColumnType("GRADE")}
                      inline
                      label="Grade"
                      name="group1"
                      type={"radio"}
                      id={`inline-radio-2`}
                    />

                    <Form.Check
                      onChange={() => setColumnType("PERCENTAGE")}
                      inline
                      label="percentage"
                      name="group1"
                      type={"radio"}
                      id={`inline-radio-3`}
                    />
                  </div>
                </Form.Group>

                {ColumnType == "MARKS" && (
                  <Form.Group className="mb-3 " controlId="ModalInputFormView">
                    <Form.Label>Max marks</Form.Label>
                    <div style={{ width: "100%" }}>
                      <Form.Control
                        name="text"
                        required
                        type="number"
                        className="Input"
                        autoComplete="off"
                        placeholder="Enter Max Marks"
                        value={ColumnMaxMarks}
                        onChange={(e) => {
                          setColumnMaxMarks(e.target.value);
                        }}
                      />
                    </div>
                  </Form.Group>
                )}
              </Form>

              <div
                style={{ position: "absolute", bottom: 0 }}
                className="BottomDiv"
              >
                <div
                  onClick={() => {
                    setShowColumnInserter(
                      (ShowColumnInserter) => !ShowColumnInserter
                    );
                  }}
                  className="CancelBtn"
                >
                  Cancel
                </div>

                <div
                  onClick={() => {
                   if( !/[^\s]/.test(ColumnMaxMarks) == false ||  !/[^\s]/.test(ColumnName) == false ) AddColumn()
                  }}
                  className="DoneBtn"
                >
                  Create
                </div>
              </div>
            </div>
          </SwipeableDrawer>
        </React.Fragment>
      </div>
    );
  }
};

function InsertRow(props) {
  return (
    <div contentClassName="TeacherClassModal">
      <div onClick={props.onHide} className="ModalCloseBtn">
        <svg
          width="26"
          height="26"
          viewBox="0 0 26 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16.8774 6.0072L12.5865 10.2981L8.29564 6.0072C7.82192 5.53348 7.053 5.53348 6.57929 6.0072L6.00721 6.57928C5.5335 7.05299 5.5335 7.82191 6.00721 8.29562L10.2981 12.5865L6.00721 16.8774C5.5335 17.3511 5.5335 18.12 6.00721 18.5937L6.57929 19.1658C7.053 19.6395 7.82192 19.6395 8.29564 19.1658L12.5865 14.8749L16.8774 19.1658C17.3511 19.6395 18.12 19.6395 18.5937 19.1658L19.1658 18.5937C19.6395 18.12 19.6395 17.3511 19.1658 16.8774L14.8749 12.5865L19.1658 8.29562C19.6395 7.82191 19.6395 7.05299 19.1658 6.57928L18.5937 6.0072C18.12 5.53348 17.3511 5.53348 16.8774 6.0072Z"
            fill="#B8B9BA"
          />
        </svg>
      </div>
      <div className="TitleBar">
        <div>Saved Teachers</div>
      </div>
      <div className="SearchBarView">
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
          <input
            className="SearchGroupInput"
            placeholder="Search name or contact"
            value={props.value}
            onChange={(e) => props.onChange(e)}
          />
        </div>
      </div>

      <div className="ListDiv">
        {true ? (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* <PulseLoader
              color={"#0d71eb"}
              loading={true}
              css={Loadercss}
              size={10}
              margin={3}
            /> */}
          </div>
        ) : props.data.length == 0 ? (
          <div className="ModalNotFoundDiv">
            <p className="ModalNoTeacherFound">No Saved Teacher Found</p>
          </div>
        ) : (
          props.data.map((item) => (
            <div className="RowDiv">
              <div className="NameDiv">
                <p className="Name">{item.name}</p>
                <p className="Contact">{item.contact}</p>
              </div>
              <div className="BatchDiv"></div>
              <div className="BtnDiv">
                <div onClick={() => props.AssignBatch(item)} className="Btn">
                  Add
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Result;
