import axios from "axios";
import React, { useEffect, useState } from "react";
import { URL } from "../../../../URL/URL";
import "../../../../css/Classes/Class/Table/StudentsTable.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Form } from "react-bootstrap";
import Select from "react-select";

import { css } from "@emotion/react";
import PulseLoader from "react-spinners/PulseLoader";

const Loadercss = css`
  display: block;
  margin: 0 auto;
  border-color: red;
  margin-top: 6px;
`;
const options = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
];

const TeachersTable = ({ openSideBar,closeSideBar }) => {
  const [Data, setData] = useState([]);

  const [name, setname] = useState(null);
  const [contact, setcontact] = useState(null);
  const [gender, setgender] = useState(null);
  const [Class, setClass] = useState(null);
  const [section, setsection] = useState(null);
  const [ClassSectionList, setClassSectionList] = useState([]);
  const [Loader, setLoader] = useState(false);
  const [RenderList, setRenderList] = useState(false);
  let TOKEN = localStorage.getItem("access_token");

  const HandleSubmit = async (e) => {
    e.preventDefault();

    if (gender == null)
      return toast.error("Please select gender", {
        position: "top-right",
        autoClose: 3000,
      });

    const Data = {
      name: name,
      contact: contact,
      gender: gender.value,
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

          toast.success("New Teacher added ", {
            position: "bottom-left",
            autoClose: 3000,
          });
          FetchRow();
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

  useEffect(() => {
    FetchRow();
  }, []);

  const FetchRow = async () => {
    await axios({
      method: "get", //you can set what request you want to be
      url: `${URL}/teacher/fetch`,
      headers: {
        Authorization: "Bearer " + TOKEN,
      },
    }).then(({ data }) => {
      console.log(data);
      if (data.status == 200) {
        return setData(data.data);
      } else {
        return toast.error("Something went wrong", {
          position: "bottom-left",
          autoClose: 3000,
        });
      }
    });
  };
  const Row = () => {
    return Data.map((item, i) => (
      <tr key={item.uuid}>
        <td
          style={{
            verticalAlign: "center",
            paddingTop: "8px",
            textAlign: "center",
          }}
        >
          <input style={{ width: "16px", height: "16px" }} type="checkbox" />
        </td>
        <td>
          <div className="RowNameDiv">
            <div className="RowNameCircle">{i + 1}</div>
            {item.name}
          </div>
        </td>
        <td> {item.contact}</td>
        <td style={{ paddingRight: "30px" }}>
          {item.class.length > 0
            ? item.class.map((ele, i) =>
                i == item.class.length - 1
                  ? ele.section == null
                    ? ele.class.label
                    : ele.class.label + "-" + ele.section.label
                  : ele.section == null
                  ? ele.class.label + ", "
                  : ele.class.label + "-" + ele.section.label + ", "
              )
            : "--"}
        </td>
        <td> {item.gender}</td>
        <td
          style={{
            color: item.status == "active" ? "#56cd73" : "#f65e72",
            fontWeight: "bold",
          }}
        >
          {item.status}
        </td>
      </tr>
    ));
  };

  return (
    <div class="Main">
      <div className="TableDiv">
        <table class="Table">
          <thead class="TableHeader">
            <tr>
              <th
                style={{
                  minWidth: "60px",
                  maxWidth: "60px",
                  width: "60px",
                  height: "inherit",
                }}
                className="TableHeaderColumn"
                scope="col"
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <input
                    style={{ width: "18px", height: "18px" }}
                    type="checkbox"
                  />
                </div>
              </th>
              <th
                className="TableHeaderColumn"
                style={{ width: "25%", minWidth: "350px" }}
                scope="col"
              >
                Name
              </th>
              <th
                className="TableHeaderColumn"
                style={{ width: "25%", minWidth: "350px" }}
                scope="col"
              >
                Contact/Email
              </th>
              <th
                className="TableHeaderColumn"
                style={{ width: "15%", minWidth: "250px" }}
                scope="col"
              >
                Class Assigned
              </th>
              <th
                className="TableHeaderColumn"
                style={{ width: "15%", minWidth: "250px" }}
                scope="col"
              >
                Gender
              </th>
              <th
                className="TableHeaderColumn"
                style={{ width: "15%", minWidth: "250px" }}
                scope="col"
              >
                Status
              </th>
              {/* <th style={{ width: "5%" ,minWidth:"60px"}} scope="col"></th> */}
            </tr>
          </thead>

          <tbody className="TableRow">{Row()}</tbody>
        </table>
      </div>

      <div  className={!openSideBar ? "Right-Div" : "Right-Div-Open"}>
        <div className="TitleDiv">
          <p>New Teacher</p>
          <svg
            onClick={closeSideBar}
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
        <Form onSubmit={(e) => HandleSubmit(e)} className="FormDataView">
          <div className="AddDataForm">
            <Form.Group className="InputFormView">
              <input
                name="name"
                type="text"
                autoComplete="off"
                className="InputView"
                placeholder="Enter Name"
                required
                value={name}
                onChange={(e) => {
                  setname(e.target.value);
                }}
              />
              <input
                autoComplete="off"
                name="contact"
                type="text"
                className="InputView"
                placeholder="Contact/Email"
                required
                value={contact}
                onChange={(e) => {
                  setcontact(e.target.value);
                }}
              />

              <Select
                name="gender"
                type="text"
                placeholder="Gender"
                isClearable="true"
                className="Input"
                options={options}
                value={gender}
                onChange={(e) => {
                  setgender(e);
                }}
              />
            </Form.Group>
          </div>

          <div className="AddTeacherSaveBtnDiv">
            <ToastContainer />
            <button
              // type="submit"
              disabled={Loader}
              style={{ opacity: Loader ? 0.5 : 1 }}
              className="AddTeacherSaveBtn"
            >
              {Loader ? (
                <PulseLoader
                  color={"white"}
                  loading={true}
                  css={Loadercss}
                  size={8}
                  margin={3}
                />
              ) : (
                <p style={{ cursor: "pointer" }}>Save</p>
              )}
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default TeachersTable;
