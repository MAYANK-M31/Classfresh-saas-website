import axios from "axios";
import React, { useEffect, useState } from "react";
import { URL } from "../../../../../URL/URL";
import "../../../../../css/Classes/Table/ClassesTable.css";

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

const SubjectsTable = React.memo(({ Data }) => {
  const Row = () => {
    return Data.map((item, i) => (
      <tr key={i}>
        <td>
        <Link
            style={{ width: "100%" }}
            to={{
              pathname: `/result/sheet`,
              search: `class=${
                item.batch.class.value ? item.batch.class.value : null
              }&section=${
                item.batch.section ?  item.batch.section.value : null
              }&classlabel=${
                item.batch.class ? item.batch.class.label : null
              }&sectionlabel=${
                item.batch.section ?  item.batch.section.label : null
              }&batchId=${item.batchId}
              &schId=${item.schId}
              &subjectId=${item.subjectId}`,
            }}
          >
            <div className="RowNameDiv" style={{ color: "#0076FE" }}>
              {item.subject}
            </div>
          </Link>
        </td>
        <td>{item.subfolder}</td>
        <td style={{ paddingRight: "30px" }}>{item.totalteachers}</td>
        <td> {new Date(item.createdAt).toLocaleDateString()}</td>
        <td
          style={{
            color: item.status == "active" ? "#56cd73" : "#f65e72",
            fontWeight: "bold",
            paddingRight:"20px"
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "flex-end",
              alignItems:"center",
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 13 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_1292:624)">
                <path
                  d="M7.43566 0.439339C8.02145 1.02512 8.02145 1.97488 7.43566 2.56066C6.84988 3.14645 5.90012 3.14645 5.31434 2.56066C4.72855 1.97488 4.72855 1.02512 5.31434 0.439339C5.9001 -0.146446 6.84985 -0.146446 7.43566 0.439339Z"
                  fill="black"
                />
                <path
                  d="M7.43566 5.31434C8.02145 5.90012 8.02145 6.84988 7.43566 7.43566C6.84988 8.02145 5.90012 8.02145 5.31434 7.43566C4.72855 6.84988 4.72855 5.90012 5.31434 5.31434C5.9001 4.72855 6.84985 4.72855 7.43566 5.31434Z"
                  fill="black"
                />
                <path
                  d="M7.43566 10.1893C8.02145 10.7751 8.02145 11.7248 7.43566 12.3106C6.84988 12.8964 5.90012 12.8964 5.31434 12.3106C4.72855 11.7248 4.72855 10.7751 5.31434 10.1893C5.9001 9.60349 6.84985 9.60349 7.43566 10.1893Z"
                  fill="black"
                />
              </g>
              <defs>
                <clipPath id="clip0_1292:624">
                  <rect width="13" height="13" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
        </td>
      </tr>
    ));
  };

  return (
    <div className="TableDiv">
         <Toaster />
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
              No of Sub folders
            </th>
            <th
              className="TableHeaderColumn"
              style={{ width: "15%", minWidth: "350px" }}
              scope="col"
            >
              Admins
            </th>
            <th
              className="TableHeaderColumn"
              style={{ width: "15%", minWidth: "250px" }}
              scope="col"
            >
              Last Edited
            </th>
            <th
              className="TableHeaderColumn"
              style={{
                width: "15%",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
              scope="col"
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                {/* Status */}
              </div>
            </th>
            {/* <th style={{ width: "5%" ,minWidth:"60px"}} scope="col"></th> */}
          </tr>
        </thead>

        <tbody className="TableRow">{Row()}</tbody>
      </table>
    </div>
  );
});

export default SubjectsTable;
