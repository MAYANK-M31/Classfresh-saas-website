import axios from "axios";
import React, { useEffect, useState } from "react";
import { URL } from "../../../../URL/URL";
import "../../../../css/Classes/Class/Table/StudentsTable.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  );
};

export default ClassesTable;
