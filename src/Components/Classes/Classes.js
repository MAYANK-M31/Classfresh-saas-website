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
  const [ClassInput, setClassInput] = useState(null);
  const [section, setsection] = useState(null);
  const [ClassSectionList, setClassSectionList] = useState([]);
  const [alert, setalert] = useState(false);
  const [alertdata, setalertdata] = useState(null);
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
        ClassInput={ClassInput}
        setSection={(e) => {
          setsection(e);
        }}
        setClass={(e) => {
          setClassInput(e);
        }}
        SectionOptions={SectionOptions}
        Loader={Loader}
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
        <div>CREATE CLASS</div>
      </div>

      <Form className="FormView">
        <Form.Group className="mb-3 " controlId="ModalInputFormView">
          <Form.Label>Class</Form.Label>
          <div style={{ width: "100%" }}>
            <Creatable
              name="class"
              type="text"
              isClearable="true"
              autoComplete="off"
              classNamePrefix="Input"
              placeholder="Class"
              options={props.ClassOptions}
              components={{
                DropdownIndicator: () => null,
                IndicatorSeparator: () => null,
              }}
              value={props.ClassInput}
              onChange={(e) => {
                props.setClass(e);
              }}
            />
          </div>
        </Form.Group>
        <Form.Group className="mb-3 " controlId="ModalInputFormView">
          <Form.Label>Section</Form.Label>
          <div style={{ width: "100%" }}>
            <Creatable
              name="section"
              type="text"
              isClearable="true"
              autoComplete="off"
              classNamePrefix="Input"
              placeholder="Section"
              options={props.SectionOptions}
              components={{
                DropdownIndicator: () => null,
                IndicatorSeparator: () => null,
              }}
              value={props.section}
              onChange={(e) => {
                props.setSection(e);
              }}
            />
          </div>
        </Form.Group>

        <div className="Modal-Button-Div">
          <button
            disabled={props.Loader}
            style={{ opacity: props.Loader ? 0.5 : 1 }}
            className="Button"
          >
            {props.Loader ? (
              <PulseLoader
                color={"white"}
                loading={true}
                css={Loadercss}
                size={8}
                margin={3}
              />
            ) : (
              <p>CREATE CLASS</p>
            )}
          </button>
        </div>
      </Form>
    </Modal>
  );
}

export default Classes;
