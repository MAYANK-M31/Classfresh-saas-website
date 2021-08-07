import axios from "axios";
import React, { useEffect, useState } from "react";
import { URL } from "../../../URL/URL";
import "../../../css/Classes/Table/ClassesTable.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, Router } from "react-router-dom";

const Colors = [
  "#ceebc4",
  "#FAA61A",
  "#FF4080",
  "#FC00FE",
  "#FF8C5F",
  "#FF4080",
];

const ClassesTable = () => {
  const [Data, setData] = useState([]);
  let TOKEN = localStorage.getItem("access_token");

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
        <td>
          <Link style={{ width: "100%" }}   to={"/users/classes/class?class=6&section=b"}  >
            <div className="RowNameDiv" style={{ color: "#0076FE" }}>
              {item.name}
            </div>
          </Link>
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
    <div className="TableDiv">
      <table class="Table">
        <thead class="TableHeader">
          <tr>
            <th
              className="TableHeaderColumn"
              style={{ width: "25%", minWidth: "350px" }}
              scope="col"
            >
              Class
            </th>
            <th
              className="TableHeaderColumn"
              style={{ width: "25%", minWidth: "350px" }}
              scope="col"
            >
              No. of Teachers
            </th>
            <th
              className="TableHeaderColumn"
              style={{ width: "15%", minWidth: "250px" }}
              scope="col"
            >
              No. of Students
            </th>
            <th
              className="TableHeaderColumn"
              style={{ width: "15%", minWidth: "250px" }}
              scope="col"
            >
              Created On
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
  );
};

export default ClassesTable;
