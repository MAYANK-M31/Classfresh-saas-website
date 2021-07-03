import React from "react";

const ResultTable = () => {
  return (
    <div className="ContainerTableDiv">
      <table class="Table">
        <thead   class="TableHeader">
          <tr>
            <th
              style={{
                minWidth: "60px",
                height: "inherit",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
               
              }}
              className="TableHeaderColumn"
              scope="col"
            >
              <input
                style={{ width: "18px", height: "18px" }}
                type="checkbox"
              />
            </th>
            <th  className="TableHeaderColumn" style={{ width: "25%", minWidth: "350px" }} scope="col">
              Name
            </th>
            <th  className="TableHeaderColumn" style={{ width: "25%", minWidth: "350px" }} scope="col">
              Contact/Email
            </th>
            <th  className="TableHeaderColumn" style={{ width: "15%", minWidth: "250px" }} scope="col">
              Class Assigned
            </th>
            <th  className="TableHeaderColumn" style={{ width: "15%", minWidth: "250px" }} scope="col">
              Gender
            </th>
            <th  className="TableHeaderColumn" style={{ width: "15%", minWidth: "250px" }} scope="col">
              Status
            </th>
            {/* <th style={{ width: "5%" ,minWidth:"60px"}} scope="col"></th> */}
          </tr>
        </thead>

        <tbody className="TableRow">
          {Row()}{Row()}{Row()}{Row()}{Row()}{Row()}{Row()}{Row()}{Row()}{Row()}{Row()}{Row()}{Row()}{Row()}{Row()}{Row()}{Row()}{Row()}{Row()}{Row()}{Row()}{Row()}{Row()}{Row()}{Row()}{Row()}{Row()}{Row()}{Row()}{Row()}{Row()}{Row()}{Row()}{Row()}{Row()}{Row()}{Row()}{Row()}
          </tbody>
      </table>
    </div>
  );
};

const Row = () => {
  return (
    <tr>
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
          <div className="RowNameCircle">MR</div>
          Grant Cardone
        </div>
      </td>
      <td>8076505054</td>
      <td>1st</td>
      <td>Male</td>
      <td>Active</td>
    </tr>
  );
};

export default ResultTable;
