import React, {
  Component,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import "../../../css/Classes/Classes.css";
import ClassesHeader from "./Header/ClassesHeader";

import "react-toastify/dist/ReactToastify.css";
import ClassesTable from "./Table/ClassesTable";
import { Button, Modal, Form } from "react-bootstrap";
import Creatable from "react-select/creatable";

import { URL } from "../../../URL/URL";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { css } from "@emotion/react";
import PulseLoader from "react-spinners/PulseLoader";
import MoonLoader from "react-spinners/MoonLoader";

import NavHeader from "../Classes/Header/NavHeader";
import ClassesUtilityHeader from "./Header/ClassesUtilityHeader";
import axios from "axios";

const Loadercss = css`
  display: block;
  margin: 0 auto;
  border-color: red;
  margin-top: 6px;
`;

const Classes = () => {
  const [ModalShow, setModalShow] = useState(false);
  const [ClassInput, setClassInput] = useState(null);
  const [Section, setSection] = useState(null);
  const [Loader, setLoader] = useState(false);
  const [Loading, setLoading] = useState(true);

  let TOKEN = localStorage.getItem("access_token");

  const [Data, setData] = useState([]);

  useEffect(() => {
    FetchRow();
  }, []);

  const FetchRow = async () => {
    await axios({
      method: "post", //you can set what request you want to be
      url: `${URL}/batch/fetch`,
      headers: {
        Authorization: "Bearer " + TOKEN,
      },
    }).then(({ data }) => {
      console.log(data.payload);
      if (data.status == 200) {
        setLoading(false);
        return setData(data.payload.data);
      } else {
        setLoading(false);
        return toast.error("Something went wrong", {
          position: "bottom-left",
          autoClose: 3000,
        });
      }
    });
  };

  const HandleCreateClass = useCallback(async (e) => {
    e.preventDefault();

    if (!ClassInput)
      return toast.error("Please Select Class", {
        position: "top-right",
        autoClose: 3000,
      });
    setLoader(false);

    setLoader(true);

    const Body = {
      batch: {
        class: ClassInput,
        section: Section,
      },
    };

    await axios({
      method: "post", //you can set what request you want to be
      url: `${URL}/batch/create`,
      headers: {
        Authorization: "Bearer " + TOKEN,
      },
      data: Body,
    })
      .then((res) => {
        if (res.data.status == 200) {
          setLoader(false);
          setModalShow(false);
          setClassInput(null);
          setSection(null);
          FetchRow();
          toast.success("New Batch Created Successfully ", {
            position: "top-right",
            autoClose: 3000,
          });
        } else {
          toast.warning(res.data.message, {
            position: "top-right",
            autoClose: 3000,
          });
          setLoader(false);
        }
      })
      .catch((err) => {
        toast.error("Something went wrong", {
          position: "top-right",
          autoClose: 3000,
        });
        console.log(err);
        setLoader(false);
      });
  });

  return (
    <div className="Classes">
      <ClassesHeader />
      {!Loading ? (
        <div className="Main-Div">
          <div className="Container-Div">
            <ClassesUtilityHeader ShowModal={() => setModalShow(true)} />
            <ClassesTable Data={Data} />
          </div>
        </div>
      ) : (
        <div className="Main-Div">
          <MoonLoader
            color={"#0d71eb"}
            loading={true}
            css={Loadercss}
            size={80}
            margin={3}
          />
        </div>
      )}
      <ToastContainer />

      <MyVerticallyCenteredModal
        show={ModalShow}
        onHide={() => setModalShow(false)}
        ClassOptions={ClassOptions}
        ClassInput={ClassInput}
        Section={Section}
        HandleCreateClass={(e) => HandleCreateClass(e)}
        setSection={(e) => {
          setSection(e);
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

      <Form onSubmit={(e) => props.HandleCreateClass(e)} className="FormView">
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
              // value={props.ClassInput}
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
              // value={props.Section}
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
