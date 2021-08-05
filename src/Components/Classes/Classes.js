import React, { Component, useState } from "react";
import "../../css/Classes/Classes.css";
import ClassesHeader from "./Header/ClassesHeader";

import "react-toastify/dist/ReactToastify.css";
import ClassesTable from "./Table/ClassesTable";
import { Button, Modal, Form } from "react-bootstrap";
import Creatable from "react-select/creatable";

import Select from "react-select";
import Chip from "@material-ui/core/Chip";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { css } from "@emotion/react";
import PulseLoader from "react-spinners/PulseLoader";

const Loadercss = css`
  display: block;
  margin: 0 auto;
  border-color: red;
  margin-top: 6px;
`;

const Classes = () => {
  const [ModalShow, setModalShow] = useState(false);
  const [Class, setBatch] = useState(null);
  const [section, setsection] = useState(null);
  const [ClassSectionList, setClassSectionList] = useState([]);
  const [Loader, setLoader] = useState(false);

  return (
    <div className="Classes">
      <ClassesHeader />
      <div className="Main-Div">
        <div className="Container-Div">
          <div className="TitleDiv">
            <div className="Title">List</div>
          </div>
          <div className="UtilityDiv">
            <div className="InputDiv">
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
                  placeholder="Search class"
                />
              </div>
              <div>
                <button
                  onClick={() => setModalShow(true)}
                  className="CreateClassBtnDiv"
                >
                  <p style={{ cursor: "pointer" }}>Create Class</p>
                </button>
              </div>
            </div>
          </div>

          <ClassesTable />
        </div>
      </div>
      <MyVerticallyCenteredModal
        show={ModalShow}
        onHide={() => setModalShow(false)}
        ClassOptions={ClassOptions}
        Class={Class}
        setSection={(e) => {
          setsection(e);
        }}
        setClass={(e) => {
          setBatch(e);
        }}
        SectionOptions={SectionOptions}
      />
    </div>
  );
};

const ClassOptions = [
  { value: "1", label: "I" },
  { value: "2", label: "II" },
  { value: "3", label: "III" },
  { value: "4", label: "IV" },
  { value: "5", label: "V" },
  { value: "6", label: "VI" },
  { value: "7", label: "VII" },
  { value: "8", label: "VIII" },
  { value: "9", label: "IX" },
  { value: "10", label: "X" },
  { value: "11", label: "XI" },
  { value: "12", label: "XII" },
  { value: "ukg", label: "UKG" },
  { value: "lkg", label: "LKG" },
];
const SectionOptions = [
  { value: "a", label: "A" },
  { value: "b", label: "B" },
  { value: "c", label: "C" },
  { value: "d", label: "D" },
  { value: "e", label: "E" },
  { value: "f", label: "F" },
];


function MyVerticallyCenteredModal(props) {
  return (
    <Modal contentClassName="ClassModal" {...props} centered>
      <div className="TitleBar">
        <div>CREATE CLASS</div>
        <div className="FormView">
          <Form className="FormDataView">
            <div className="AddDataForm">
              <Form.Group className="InputFormView">
                <div className="ClassSectionView">
                  <div style={{ width: "110px" }}>
                    <Creatable
                      name="class"
                      type="text"
                      isClearable="true"
                      autoComplete="off"
                      className="Input"
                      placeholder="Class"
                      options={props.ClassOptions}
                      components={{
                        DropdownIndicator: () => null,
                        IndicatorSeparator: () => null,
                      }}
                      value={props.Class}
                      onChange={(e) => {
                        props.setClass(e);
                      }}
                    />
                  </div>

                  <div style={{ width: "110px" }}>
                    <Creatable
                      name="class"
                      type="text"
                      isClearable="true"
                      autoComplete="off"
                      className="Input"
                      placeholder="Section"
                      options={props.SectionOptions}
                      components={{
                        DropdownIndicator: () => null,
                        IndicatorSeparator: () => null,
                      }}
                      value={props.section}
                      onChange={(e) => {
                        props.setSection(e)
                      }}
                    />
                  </div>

                
                
                </div>
              </Form.Group>
            </div>

          </Form>
        </div>
      </div>
    </Modal>
  );
}

export default Classes;
