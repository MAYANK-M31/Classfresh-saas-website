import axios from "axios";
import React, { useEffect, useState } from "react";
import { URL } from "../../../URL/URL";
import "../../../css/Classes/Table/ClassesTable.css";

import { Toaster, toast } from "react-hot-toast";

import { Link, Router } from "react-router-dom";

const Colors = [
  "#ceebc4",
  "#FAA61A",
  "#FF4080",
  "#FC00FE",
  "#FF8C5F",
  "#FF4080",
];

const ClassesTable = React.memo(({ Data }) => {
  const Row = () => {
    return Data.map((item, i) => (
      <tr key={item.uuid}>
        <td>
          <Link
            style={{ width: "100%" }}
            to={{
              pathname: `/users/classes/class`,
              search: `class=${
                item.batch.class.value ? item.batch.class.value : null
              }&section=${
                item.batch.section ?  item.batch.section.value : null
              }&classlabel=${
                item.batch.class ? item.batch.class.label : null
              }&sectionlabel=${
                item.batch.section ?  item.batch.section.label : null
              }&batchId=${item.batchId}
              &schId=${item.schId}`,
            }}
          >
            <div className="RowNameDiv" style={{ color: "#0076FE" }}>
              {item.batch.class.label ? item.batch.class.label : " "}
              {item.batch.section ? "-" + item.batch.section.label : " "}
            </div>
          </Link>
        </td>
        <td>{item.totalteachers}</td>
        <td style={{ paddingRight: "30px" }}>{item.totalstudents}</td>
        <td> {new Date(item.createdAt).toLocaleDateString()}</td>
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
});




export default ClassesTable;
