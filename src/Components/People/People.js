import React, { Component, useState } from "react";
import "../../css/People/People.css";
import PeopleHeader from "./Header/PeopleHeader";
import PeopleSideBar from "./PeopleSideBar";
import Split from "react-split";
import PeopleTable from "./TableView/PeopleTable";
import makeData from "./TableView/makeData";
import { URL } from "../../URL/URL";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import Select from "react-select";
import Creatable from "react-select/creatable";

import Chip from "@material-ui/core/Chip";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { css } from "@emotion/react";
import PulseLoader from "react-spinners/PulseLoader";
import AllTeachers from "./Teachers/AllTeachers";

const Loadercss = css`
  display: block;
  margin: 0 auto;
  border-color: red;
  margin-top: 6px;
`;

const People = () => {
  const [addteacher, setaddteacher] = useState(false);
  const [minimize, setminimize] = useState(false);
  const [name, setname] = useState(null);
  const [contact, setcontact] = useState(null);
  const [gender, setgender] = useState(null);
  const [Class, setClass] = useState(null);
  const [section, setsection] = useState(null);
  const [ClassSectionList, setClassSectionList] = useState([]);
  const [Loader, setLoader] = useState(false);
  const [RenderList,setRenderList] = useState(false)

  let TOKEN = localStorage.getItem("access_token");

  const options = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
  ];

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

  let ClassArray = ClassSectionList;

  const AddClass = () => {
    if (Class == null ) {
      return null;
    }

    ClassArray.push({ class: Class, section: section });
    setClassSectionList(ClassArray);
    setClass(null);
    setsection(null);
  };

  const DeleteClass = (data) => {
    ClassArray = ClassArray.filter(function (obj) {
      return obj !== data;
    });
    setClassSectionList(ClassArray);
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();

    if(gender == null) return toast.error("Please select gender", {
      position: "top-right",
      autoClose: 3000,
    });

    const Data = {
      name: name,
      contact: contact,
      gender: gender.value ,
      class: ClassSectionList,
      status: "active",
    };
    setLoader(true);

    await axios({
      method: "post", //you can set what request you want to be
      url: `${URL}/teacher/add`,
      headers: {
        Authorization: "Bearer " + TOKEN,
      },
      data: Data,
    })
      .then((res) => {
        if (res.data.status == 200) {
          setLoader(false);
          setname("");
          setcontact("");
          setgender(null);
          setClass(null);
          setsection(null);
          setClassSectionList([])
          setRenderList(true)
          toast.success("New Teacher added ", {
            position: "bottom-left",
            autoClose: 3000,
          });
          setRenderList(false)
        } else {
          toast.warning(res.data.message, {
            position: "bottom-left",
            autoClose: 3000,
          });
          setLoader(false);
        }
      })
      .catch((err) => {
        toast.error("Something went wrong", {
          position: "bottom-left",
          autoClose: 3000,
        });
        setLoader(false);
      });
  };

  return (
    <div className="People">
      <PeopleHeader />
      <div className="Inside-Div">
        <Split
          sizes={[minimize ? 0 : 15.5, minimize ? 100 : 84.5]}
          minSize={0}
          snapOffset={100}
          gutterSize={5}
          direction="horizontal"
          cursor="col-resize"
          className="split-flex" // You'll need to define this. check styles.css
        >
          <PeopleSideBar />

          <div
            style={{ borderWidth: minimize ? "0 0 0 0" : "0 0 0 0.5px" }}
            className="Middle-Div"
          >
            <AllTeachers Minimize={()=>{setminimize(minimize ? false : true)}} />
          </div>
        </Split>
      </div>
    </div>
  );
};

export default People;
