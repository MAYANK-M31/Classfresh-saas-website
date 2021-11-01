import React, { Component, useCallback, useEffect, useState } from "react";
import "../../../../css/Classes/Class/Class.css";
import ClassHeader from "./Header/ClassHeader";

import "react-toastify/dist/ReactToastify.css";

import { Button, Modal, Form } from "react-bootstrap";
import Creatable from "react-select/creatable";

import * as qs from "query-string";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { css } from "@emotion/react";
import PulseLoader from "react-spinners/PulseLoader";
import TeachersTable from "../Class/Table/TeachersTable.";

import NavHeader from "./Header/NavHeader";
import TeachersUtilityHeader from "./Header/TeachersUtilityHeader";
import ClassesUtilityHeader from "../Header/ClassesUtilityHeader";
import SubjectsTable from "./Table/SubjectsTable";
import axios from "axios";
import StudentsUtilityHeader from "../../../AllUsers/Header/StudentsUtilityHeader";
import SubjectUtilityHeader from "./Header/SubjectUtilityHeader";
import { URL } from "../../../../URL/URL";

const Loadercss = css`
  display: block;
  margin: 0 auto;
  border-color: red;
  margin-top: 6px;
`;

const Class = (props) => {
  const [ModalShow, setModalShow] = useState(false);
  const [Subject, setSubject] = useState("");
  const [Description, setDescription] = useState("");

  const [Loader, setLoader] = useState(false);
  const [Tab, setTab] = useState("subjects");

  const [openteachersidebar, setopenteachersidebar] = useState(false);

  const [ExistingTeacherModal, setExistingTeacherModal] = useState(false);

  const parsedQuery = qs.parse(props.location.search);
  // console.log(parsedQuery.classlabel);
  let TOKEN = localStorage.getItem("access_token");

  const [Data, setData] = useState([]);
  const [Loading, setLoading] = useState(false);

  useEffect(() => {
    FetchRow();
  }, []);

  const FetchRow = async () => {
    await axios({
      method: "get", //you can set what request you want to be
      url: `${URL}/result/batch/subject?batchId=${parsedQuery?.batchId}`,
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

  const HandleCreateSubject = useCallback(async (e) => {
    e.preventDefault();
    if (Subject.length == 0)
      return toast.error("Please Select Class", {
        position: "top-right",
        autoClose: 3000,
      });

    setLoader(true);

    const Body = {
      subject: Subject,
      description: Description,
      batchId: parsedQuery?.batchId,
    };

    await axios({
      method: "post", //you can set what request you want to be
      url: `${URL}/result/batch/subject`,
      headers: {
        Authorization: "Bearer " + TOKEN,
      },
      data: Body,
    })
      .then((res) => {
        if (res.data.status == 200) {
          setLoader(false);
          setModalShow(false);
          setSubject("");
          setDescription("");
          FetchRow();
          toast.success("New Subject Created Successfully ", {
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
    <div className="Class">
      <ToastContainer />
      <ClassHeader
        classname={parsedQuery.classlabel ? parsedQuery.classlabel : null}
        section={parsedQuery.sectionlabel ? parsedQuery.sectionlabel : null}
      />
      <div className="Main-Div">
        <div className="Container-Div">
          <NavHeader
            StudentsTab={() => setTab("subjects")}
            TeachersTab={() => setTab("reports")}
            IndicatorPosition={Tab == "subjects" ? 0 : 1}
          />
          {Tab == "subjects" && (
            <>
              <SubjectUtilityHeader ShowModal={() => setModalShow(true)} />
              <SubjectsTable Data={Data} />
            </>
          )}
          {Tab == "reports" && (
            <>
              <TeachersUtilityHeader
                ShowSideBar={() => {
                  openteachersidebar
                    ? setopenteachersidebar(false)
                    : setopenteachersidebar(true);
                }}
                ShowExistingTeacherModal={() => {
                  ExistingTeacherModal
                    ? setExistingTeacherModal(false)
                    : setExistingTeacherModal(true);
                }}
                ShowModal={() => setModalShow(true)}
              />
              <SubjectsTable
                openSideBar={openteachersidebar}
                closeSideBar={() => setopenteachersidebar(false)}
                parsedQuery={parsedQuery}
                ShowExistingTeacherModal={() => setExistingTeacherModal(true)}
                ExistingTeacherModal={ExistingTeacherModal}
                CloseExistingTeacherModal={() => setExistingTeacherModal(false)}
              />
            </>
          )}
        </div>
      </div>
      <MyVerticallyCenteredModal
        show={ModalShow}
        onHide={() => setModalShow(false)}
        Value_1={Subject}
        setValue_1={(e) => {
          setSubject(e.target.value);
        }}
        Value_2={Description}
        setValue_2={(e) => {
          setDescription(e.target.value);
        }}
        HandleSubmitForm={(e) => HandleCreateSubject(e)}
        Loader={Loader}
      />
    </div>
  );
};

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
        <div>CREATE SUBJECT</div>
      </div>

      <Form onSubmit={(e) => props.HandleSubmitForm(e)} className="FormView">
        <Form.Group className="mb-3 " controlId="ModalInputFormView">
          <Form.Label>Subject</Form.Label>
          <div style={{ width: "100%" }}>
            <Form.Control
              name="text"
              type="text"
              autoComplete="off"
              className="Input"
              placeholder="Enter subject name"
              value={props.Value_1}
              onChange={(e) => {
                props.setValue_1(e);
              }}
              required
            />
          </div>
        </Form.Group>
        <Form.Group className="mb-3 " controlId="ModalInputFormView">
          <Form.Label>Description (optional)</Form.Label>
          <div style={{ width: "100%" }}>
            <Form.Control
              name="text"
              type="text"
              className="Input"
              autoComplete="off"
              placeholder="Eg. This contain marks of english subject"
              value={props.Value_2}
              onChange={(e) => {
                props.setValue_2(e);
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
              <p>CREATE SUBJECT</p>
            )}
          </button>
        </div>
      </Form>
    </Modal>
  );
}

export default Class;
