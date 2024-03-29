import React, {
  Component,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
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
import toast, { Toaster } from "react-hot-toast";
import { useHistory } from "react-router-dom";
import { Button, Form, Modal } from "react-bootstrap";
import RadixAlert from "./TableView/RadixAlert.js";
import { css } from "@emotion/react";
import Select from "react-select";

const StudentCard = React.memo(({ item, AddRow }) => {
  console.log("RERENDERDD");

  return (
    <div key={item.uuid} className="RowDiv">
      <div className="NameDiv">
        <p className="Name">{item?.name}</p>
        <p className="Contact">{item?.contact}</p>
      </div>
      <div className="BatchDiv"></div>
      <div onClick={() => AddRow([item], [])} className="BtnDiv">
        <div className="Btn">Add</div>
      </div>
    </div>
  );
});

const Operations = [
  { value: "REDUCE", label: "Reduce Marks" },
  { value: "SUM", label: "Sum" },
  { value: "AVERAGE", label: "Average" },
  { value: "CUSTOM", label: "Custom" },
];

const Result = (props) => {
  const [minimize, setminimize] = useState(false);
  const [ShowRowInserter, setShowRowInserter] = useState(false);
  const [ShowColumnInserter, setShowColumnInserter] = useState(false);
  const [ShowColumnEditor, setShowColumnEditor] = useState(false);
  const [ColumnId, setColumnId] = useState(false);

  const [DomLoader, setDomLoader] = useState(true);
  const [StudentData, setStudentData] = useState([]);
  const [StudentSavedData, setStudentSavedData] = useState([]);
  const [FileId, setFileId] = useState(null);
  const [RerenderTable, setRerenderTable] = useState(false);

  const [ColumnName, setColumnName] = useState("");
  const [ColumnType, setColumnType] = useState("MARKS");
  const [ColumnMaxMarks, setColumnMaxMarks] = useState(0);
  const [SaveStatus, setSaveStatus] = useState(200);
  const [SelectedRow, setSelectedRow] = useState([]);
  const [DeleteRowLoader, setDeleteRowLoader] = useState(false);
  const [DeletedRow, setDeletedRow] = useState([]);

  const [showFunctionsModal, setshowFunctionsModal] = useState(false);
  const [MultiSelectColumn, setMultiSelectColumn] = useState([]);
  const [MultiSelectColumnOptions, setMultiSelectColumnOptions] = useState([]);

  const [OperationSelect, setOperationSelect] = useState([]);
  const [OperationSelectOptions, setOperationSelectOptions] =
    useState(Operations);

  const [CustomFunction, setCustomFunction] = useState(null);
  const [OperationText, setOperationText] = useState("");

  const [Column, setColumn] = useState([]);

  const parsedQuery = useMemo(() => {
    return qs.parse(props.location.search);
  }, [FileId]);

  let TOKEN = localStorage.getItem("access_token");
  const history = useHistory();

  useEffect(() => {
    setTimeout(() => {
      setDomLoader(false);
    }, 1500);
    // setDomLoader(false);
  }, []);

  // useEffect(()=>{
  //   setRerenderTable(old=>!old)
  // },[parsedQuery])

  // useEffect(() => {
  //   setDomLoader(true);

  //   setTimeout(() => {
  // setDomLoader(false);
  //   }, 1500);
  //   // setDomLoader(false);
  // }, []);

  const FileSelected = (item) => {
    setFileId(item?.id);
    setRerenderTable((old) => !old);
  };

  const FetchStudentToAdd = async () => {
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
            duration: 3000,
          });
        }
      })
      .catch((e) => {
        toast.error("Something went wrong", {
          position: "top-center",
          duration: 3000,
        });
      });
  };

  const AddRow = useCallback(
    async (item, AllData) => {
      const Data = {
        subjectId: parsedQuery?.subjectId,
        payload: item,
      };

      if (item.length == AllData.length) {
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
            setRerenderTable((oldData) => !oldData);
            setStudentData((oldData) => {
              var Temp = [];
              item.forEach((element) => {
                Temp = oldData.filter((e) => e.uuid != element.uuid);
              });
              return Temp;
            });
            toast.success(data.message, {
              position: "top-center",
              duration: 3000,
            });
          } else {
            toast.error(data.message, {
              position: "top-center",
              duration: 3000,
            });
          }
        })
        .catch((e) => {
          toast.error("Something went wrong", {
            position: "top-center",
            duration: 3000,
          });
        });
    },
    [
      setShowRowInserter,
      ShowRowInserter,
      history,
      parsedQuery,
      setStudentData,
      setRerenderTable,
    ]
  );

  const AddColumn = useCallback(async () => {
    const Data = {
      fileId: parsedQuery.fileId,
      name: ColumnName,
      valueType: ColumnType,
      maxmarks: ColumnMaxMarks ? JSON.parse(ColumnMaxMarks) : null,
    };

    console.log(Data);

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
          setRerenderTable((old) => !old);
          setColumnName("");
          setColumnMaxMarks("");
          setColumnType("MARKS");
          toast.success(data.message, {
            position: "top-center",
            duration: 3000,
          });
        } else {
          toast.error(data.message, {
            position: "top-center",
            duration: 3000,
          });
        }
      })
      .catch((e) => {
        toast.error("Something went wrong", {
          position: "top-center",
          duration: 3000,
        });
      });
  }, [
    setShowColumnInserter,
    ShowColumnInserter,
    ColumnName,
    ColumnMaxMarks,
    ColumnType,
    setColumnName,
    setColumnMaxMarks,
    setColumnType,
    history,
    parsedQuery,
  ]);

  const EditColumn = async () => {
    const Data = {
      columnId: ColumnId,
      fileId: parsedQuery.fileId,
      name: ColumnName,
      valueType: ColumnType,
      maxmarks: ColumnMaxMarks ? JSON.parse(ColumnMaxMarks) : null,
    };

    console.log(Data);

    await axios({
      method: "post", //you can set what request you want to be
      url: `${URL}/excel/column/edit`,
      headers: {
        Authorization: "Bearer " + TOKEN,
      },
      data: Data,
    })
      .then(({ data }) => {
        if (data.status == 200) {
          ToogleColumnEdit();
          setRerenderTable((old) => !old);
          setColumnId(null);
          toast.success(data.message, {
            position: "top-center",
            duration: 3000,
          });
        } else {
          toast.error(data.message, {
            position: "top-center",
            duration: 3000,
          });
        }
      })
      .catch((e) => {
        toast.error("Something went wrong", {
          position: "top-center",
          duration: 3000,
        });
      });
  };

  const Search = useCallback(
    (search) => {
      var condition = new RegExp(search.trim());

      var result = StudentSavedData.filter(function (el) {
        return (
          condition.test(el?.name) ||
          condition.test(el?.contact) ||
          condition.test(el?.rollnumber)
        );
      });

      setStudentData(result);
    },
    [StudentData, setStudentData]
  );

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const onHandleColumnInserter = useCallback(() => {
    setShowColumnInserter(true);
  }, []);

  const ToogleMinimize = useCallback(() => {
    setminimize(minimize ? false : true);
  }, [setminimize, minimize]);

  const RenderRowInserter = () => {
    FetchStudentToAdd();
    setShowRowInserter((ShowRowInserter) => !ShowRowInserter);
  };

  const ToogleRowInserter = useCallback(() => {
    setShowRowInserter((old) => !old);
  }, []);

  const ToogleColumnInserter = useCallback(() => {
    setShowColumnInserter((old) => !old);
  }, []);

  const ToogleColumnEdit = useCallback((params) => {
    // alert("HI FROM RESULT")
    var item = params?.columnParam;
    if (item) {
      console.log(params.columnParam);
      setColumnName(item.name);
      setColumnMaxMarks(item.maxmarks);
      setColumnType(item.valueType);
      console.log(item);
      setColumnId(item.key);
    } else {
      setColumnName("");
      setColumnMaxMarks("");
      setColumnId(null);
    }

    setShowColumnEditor((old) => !old);
  }, []);

  const handleColumnType = useCallback((value) => setColumnType(value), []);

  const Saving = useCallback(
    (status) => {
      if (status == 200) {
        setTimeout(() => {
          setSaveStatus(200);
        }, 1000);
      } else {
        setSaveStatus(300);
      }
    },
    [setSaveStatus]
  );

  const onRowSelect = (items) => {
    setSelectedRow(items);
  };

  const DeleteRow = useCallback(async () => {
    setDeleteRowLoader(true);
    var Ids = SelectedRow.map((e) => e.id);
    const Payload = {
      docId: FileId,
      rowIds: Ids,
    };

    await axios({
      method: "post", //you can set what request you want to be
      url: `${URL}/excel/row/delete`,
      headers: {
        Authorization: "Bearer " + TOKEN,
      },
      data: Payload,
    })
      .then(({ data }) => {
        if (data.status != 200) {
          setDeleteRowLoader(false);
          return toast.error(data.message);
        }

        setDeleteRowLoader(false);
        setDeletedRow(SelectedRow);
        // setRerenderTable(old=>!old);
        setSelectedRow([]);
        return toast.success(data.message);
      })
      .catch((e) => {});
  }, [FileId, SelectedRow, setSelectedRow, setDeleteRowLoader, setSelectedRow]);

  const ToogleFunctionApplier = () => {
    var Temp = Column.filter(
      (e) => e.valueType == "MARKS" && e?.key != "STUDENT_NAME"
    );
    const alphabet = [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
    ];

    Temp = Temp.slice(0, 24).map((e, index) => {
      return {
        label:
          alphabet[index] +
          " - " +
          e.name +
          " (" +
          e.maxmarks +
          ")",
        value: e.key,
        refId: alphabet[index],
      };
    });

    console.log(Temp)

    setMultiSelectColumnOptions(Temp);

    setshowFunctionsModal((old) => !old);
  };

  const handleMultiSelectColumn = (value) => {
    setMultiSelectColumn(value);
  };

  const handleTableData = useCallback(
    ({ row, column }) => {
      setColumn(column);
    },
    [setColumn]
  );

  const handleSelectColumn = (value) => {
    setMultiSelectColumn(value);

    console.log(value.length);
    if (value.length > 1) {
      setOperationSelectOptions(Operations.filter((e) => e.value != "REDUCE"));
    } else if (value.length == 1) {
      setOperationSelectOptions(Operations);
    } else {
      setOperationSelectOptions([]);
    }
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
        <Toaster />
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
            <ResultSidebar
              urlData={JSON.stringify(parsedQuery)}
              FileSelected={FileSelected}
            />

            <div
              style={{ borderWidth: minimize ? "0 0 0 0" : "0 0 0 0.5px" }}
              className="Middle-Div"
            >
              <div className="ResultUtilityTopBar">
                <div className="LeftDiv">
                  <div onClick={ToogleMinimize} className="SideBarbtn">
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

                  {SelectedRow.length == 0 ? (
                    <>
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
                          width: "1px",
                          height: "20px",
                          backgroundColor: "#E2E5EA",
                          marginInline: "10px",
                        }}
                      />

                      <div
                        onClick={onHandleColumnInserter}
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
                        onClick={() => RenderRowInserter()}
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

                      <div
                        style={{
                          width: "1px",
                          height: "20px",
                          backgroundColor: "#E2E5EA",
                          marginLeft: "10px",
                        }}
                      />

                      <div
                        className="FilterRowBtn"
                        style={{ width: "auto", paddingRight: 5 }}
                        onClick={ToogleFunctionApplier}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="24px"
                          viewBox="0 0 24 24"
                          width="24px"
                          fill="#66749f"
                        >
                          <path d="M0 0h24v24H0V0z" fill="none" />
                          <path d="M18 4H6v2l6.5 6L6 18v2h12v-3h-7l5-5-5-5h7V4z" />
                        </svg>
                        Functions
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="24px"
                          viewBox="0 0 24 24"
                          width="24px"
                          fill="#66749f"
                        >
                          <path d="M0 0h24v24H0V0z" fill="none" />
                          <path d="M7 10l5 5 5-5H7z" />
                        </svg>
                      </div>
                    </>
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        marginLeft: 2,
                      }}
                    >
                      <div
                        // onClick={() => RenderRowInserter()}
                        className="InsertRowBtn"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#ffffff"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          class="sbui-icon "
                        >
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                          <polyline points="7 10 12 15 17 10"></polyline>
                          <line x1="12" y1="15" x2="12" y2="3"></line>
                        </svg>
                        Export to csv
                      </div>
                      <div
                        style={{
                          width: "1px",
                          height: "20px",
                          backgroundColor: "#E2E5EA",
                          marginInline: "10px",
                        }}
                      />
                      <RadixAlert
                        Loader={DeleteRowLoader}
                        count={SelectedRow.length}
                        DeleteRow={DeleteRow}
                      />
                    </div>
                  )}
                </div>
                <div
                  style={{ paddingRight: minimize ? "80px" : "70px" }}
                  className="RightDiv"
                >
                  <div className="ShareMarksBtn">Share Marks</div>
                  <div className="SaveDiv">
                    {SaveStatus == 200 ? (
                      <>
                        Saved <div className="SAVED"></div>
                      </>
                    ) : (
                      "Auto Saving..."
                    )}
                  </div>
                </div>
              </div>

              <ResultTable
                FileId={FileId}
                RerenderTable={RerenderTable}
                parsedQuery={parsedQuery}
                Saving={Saving}
                onRowSelect={onRowSelect}
                DeletedRow={DeletedRow}
                openColumnEdit={ToogleColumnEdit}
                handleTableData={handleTableData}
              />
            </div>
          </Split>
        </div>

        {/* ROW INSERDER MODAL */}
        <React.Fragment>
          <SwipeableDrawer
            anchor={"right"}
            open={ShowRowInserter}
            onClose={ToogleRowInserter}
            onOpen={ToogleRowInserter}
          >
            <div className="RowInsertDrawer">
              <div className="SideBarTitleView">
                <div onClick={ToogleRowInserter} className="BackBtn">
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
                    StudentData.length == 0
                      ? null
                      : AddRow(StudentData, StudentData)
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
                  StudentData.map((item, index) => (
                    <StudentCard key={item.uuid} AddRow={AddRow} item={item} />
                  ))
                ) : (
                  <div className="ModalNotFoundDiv">
                    <p className="ModalNoTeacherFound">No More Student Found</p>
                  </div>
                )}
              </div>
              <div className="BottomDiv">
                <div onClick={ToogleRowInserter} className="CancelBtn">
                  Cancel
                </div>

                <div onClick={ToogleRowInserter} className="DoneBtn">
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
            onClose={ToogleColumnInserter}
            onOpen={ToogleColumnInserter}
          >
            <div className="RowInsertDrawer">
              <div className="SideBarTitleView">
                <div onClick={ToogleColumnInserter} className="BackBtn">
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
                      onChange={(e) => setColumnName(e.target.value)}
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
                      onChange={() => handleColumnType("MARKS")}
                      defaultChecked={true}
                      inline
                      label="Marks"
                      name="group1"
                      type={"radio"}
                      id={`inline-radio-1`}
                    />
                    <Form.Check
                      onChange={() => handleColumnType("GRADE")}
                      inline
                      label="Grade"
                      name="group1"
                      type={"radio"}
                      id={`inline-radio-2`}
                    />

                    <Form.Check
                      onChange={() => handleColumnType("PERCENTAGE")}
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
                  onClick={() => ToogleColumnInserter()}
                  className="CancelBtn"
                >
                  Cancel
                </div>

                <div
                  onClick={() => {
                    if (
                      !/[^\s]/.test(ColumnMaxMarks) == false ||
                      !/[^\s]/.test(ColumnName) == false
                    )
                      AddColumn();
                  }}
                  className="DoneBtn"
                >
                  Create
                </div>
              </div>
            </div>
          </SwipeableDrawer>
        </React.Fragment>

        {/* COLUMN EDIT MODAL */}
        <React.Fragment>
          <SwipeableDrawer
            anchor={"right"}
            open={ShowColumnEditor}
            onClose={ToogleColumnEdit}
            onOpen={ToogleColumnEdit}
          >
            <div className="RowInsertDrawer">
              <div className="SideBarTitleView">
                <div onClick={ToogleColumnEdit} className="BackBtn">
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

                <span>Edit Column</span>
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
                      onChange={(e) => setColumnName(e.target.value)}
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
                      onChange={() => handleColumnType("MARKS")}
                      checked={ColumnType == "MARKS" ? true : false}
                      // defaultChecked={true}
                      inline
                      label="Marks"
                      name="MARKS"
                      type={"radio"}
                      id={`inline-radio-1`}
                    />
                    <Form.Check
                      onChange={() => handleColumnType("GRADE")}
                      checked={ColumnType == "GRADE" ? true : false}
                      inline
                      label="Grade"
                      name="GRADE"
                      type={"radio"}
                      id={`inline-radio-2`}
                    />

                    <Form.Check
                      onChange={() => handleColumnType("PERCENTAGE")}
                      checked={ColumnType == "PERCENTAGE" ? true : false}
                      inline
                      label="percentage"
                      name="PERCENTAGE"
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
                <div onClick={ToogleColumnEdit} className="CancelBtn">
                  Cancel
                </div>

                <div
                  onClick={() => {
                    if (
                      !/[^\s]/.test(ColumnMaxMarks) == false ||
                      !/[^\s]/.test(ColumnName) == false
                    )
                      EditColumn();
                  }}
                  className="DoneBtn"
                >
                  Edit
                </div>
              </div>
            </div>
          </SwipeableDrawer>
        </React.Fragment>

        {/* MATH FUNCTIONS APPLIER MODAL */}
        <React.Fragment>
          <SwipeableDrawer
            anchor={"right"}
            open={showFunctionsModal}
            onClose={ToogleFunctionApplier}
            onOpen={ToogleFunctionApplier}
          >
            <div className="RowInsertDrawer">
              <div className="SideBarTitleView">
                <div onClick={ToogleFunctionApplier} className="BackBtn">
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

                <span>Math Functions</span>
              </div>

              <Form
                // onSubmit={(e) => props.HandleSubmitForm(e)}
                className="FormView"
              >
                <Form.Group className="mb-3 " controlId="ModalInputFormView">
                  <Form.Label>Column name</Form.Label>
                  <div style={{ width: "100%" }}>
                    <Select
                      isMulti={true}
                      value={MultiSelectColumn}
                      onChange={handleSelectColumn}
                      options={MultiSelectColumnOptions}
                    />
                  </div>
                </Form.Group>

                <Form.Group
                  key={`inline-radio`}
                  className="mb-3 "
                  controlId="ModalInputFormView"
                >
                  <Form.Label>Operations</Form.Label>

                  <div>
                    <Select
                      isDisabled={MultiSelectColumn.length > 0 ? false : true}
                      value={OperationSelect}
                      onChange={(value) => setOperationSelect(value)}
                      options={OperationSelectOptions}
                    />
                  </div>
                </Form.Group>

                {OperationSelect.value == "CUSTOM" && (
                  <Form.Group className="mb-3 " controlId="ModalInputFormView">
                    <Form.Label>Custom Function</Form.Label>
                    <div style={{ width: "100%" }}>
                      <Form.Control
                        name="text"
                        required
                        type="text"
                        className="Input"
                        autoComplete="off"
                        placeholder="Eg. (A+B)/2"
                        value={ColumnMaxMarks}
                        onChange={(e) => {
                          setColumnMaxMarks(e.target.value);
                        }}
                      />
                    </div>
                  </Form.Group>
                )}

                {OperationSelect.value == "REDUCE" && (
                  <Form.Group className="mb-3 " controlId="ModalInputFormView">
                    {/* <Form.Label>Reduce Function</Form.Label> */}
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <div style={{ width: "35%" }}>
                        <Form.Label>Max Marks</Form.Label>

                        <Form.Control
                          name="text"
                          required
                          disabled
                          type="text"
                          className="Input"
                          autoComplete="off"
                          placeholder="Eg. (A+B)/2"
                          value={ColumnMaxMarks}
                          onChange={(e) => {
                            setColumnMaxMarks(e.target.value);
                          }}
                        />
                      </div>
                      <div style={{ height: "100%", marginTop: 26 }}>
                        <svg
                          width="27"
                          height="13"
                          viewBox="0 0 27 13"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1.5 5.24829C0.947715 5.24829 0.5 5.69601 0.5 6.24829C0.5 6.80058 0.947715 7.24829 1.5 7.24829V5.24829ZM26.0191 6.24829L16.0191 0.474788V12.0218L26.0191 6.24829ZM1.5 7.24829H17.0191V5.24829H1.5V7.24829Z"
                            fill="#8C97AC"
                          />
                        </svg>
                      </div>
                      <div style={{ width: "35%" }}>
                        <Form.Label>Reduce Marks</Form.Label>
                        <Form.Control
                          name="text"
                          required
                          type="text"
                          className="Input"
                          autoComplete="off"
                          placeholder="Eg. (A+B)/2"
                          value={ColumnMaxMarks}
                          onChange={(e) => {
                            setColumnMaxMarks(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                    <div style={{ width: "100%", marginTop: 20 }}>
                      <Form.Check
                        defaultChecked
                        type={"checkbox"}
                        id={"default-checkbox"}
                        label={"Want new column with changes?"}
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
                  onClick={() => ToogleFunctionApplier()}
                  className="CancelBtn"
                >
                  Cancel
                </div>

                <div
                  onClick={() => {
                    if (
                      !/[^\s]/.test(ColumnMaxMarks) == false ||
                      !/[^\s]/.test(ColumnName) == false
                    )
                      AddColumn();
                  }}
                  className="DoneBtn"
                >
                  Apply
                </div>
              </div>
            </div>
          </SwipeableDrawer>
        </React.Fragment>

        <MyVerticallyCenteredModal />
      </div>
    );
  }
};

function MyVerticallyCenteredModal(props) {
  return (
    <Modal {...props} onHide={props.onHide}>
      <Modal.Header closeButton>
        <Modal.Title style={{ fontSize: 20 }}>Confirm Delete</Modal.Title>
      </Modal.Header>
      <Form
        onSubmit={(e) =>
          props.Value == props.ConfirmValue
            ? props.HandleSubmitForm(e)
            : e.preventDefault()
        }
      >
        <Modal.Body style={{ paddingTop: 5 }}>
          <Form.Group className="mb-0 mt-0 " controlId="ModalInputFormView">
            <Form.Label className="font-weight-light">
              <p style={{ fontWeight: 100, color: "#6c757d" }}>
                To{" "}
                <span style={{ fontWeight: "bold", color: "black" }}>
                  delete
                </span>{" "}
                file please type file name{" "}
                <span style={{ fontWeight: "bold", color: "black" }}>
                  {props.ConfirmValue}
                </span>
              </p>
            </Form.Label>
            <div style={{ width: "100%" }}></div>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="light" onClick={props.onHide}>
            Close
          </Button>
          <Button
            variant="danger"
            disabled={props.Value == props.ConfirmValue ? props.Loader : true}
            onClick={props.HandleSubmitForm}
          >
            {/* {props.Loader ? (
              <PulseLoader
                color={"white"}
                loading={true}
                css={Loadercss}
                size={8}
                margin={1}
              />
            ) : (
              <p>Confirm</p>
            )} */}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

const Loadercss = css`
  display: block;
  border-color: red;
`;

export default Result;
