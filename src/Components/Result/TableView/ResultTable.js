import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import * as qs from "query-string";

import {
  useTable,
  useBlockLayout,
  useResizeColumns,
  useRowSelect,
} from "react-table";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import update from "immutability-helper";
import {
  Menu,
  MenuItem,
  MenuButton,
  MenuDivider,
  MenuHeader,
} from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";

import makeData from "./makeData";
import axios from "axios";
import { toast } from "react-toastify";
import { URL } from "../../../URL/URL";
import { useHistory } from "react-router";
import { debounce } from "lodash-es";

const Styles = styled.div`
  .table {
    border-spacing: 0;
    border: 1px solid #e2e5ea;
    border-left-width: 0px;
    margin-top: 10px .tr {
      :last-child {
        .td {
          border-bottom: 0;
        }
      }
      height: 46px;
    }

    .th,
    .td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 0.5px solid #e2e5ea;
      border-right: 0.5px solid #e2e5ea;

      :last-child {
        border-right: 0;
      }

      .resizer {
        display: inline-block;
        background: transparent;
        width: 15px;
        height: 100%;
        position: absolute;
        right: 0;
        top: 0;
        transform: translateX(50%);
        z-index: 1;
        ${"" /* prevents from scrolling while dragging on touch devices */}
        touch-action:none;

        &.isResizing {
          background: transparent;
        }
      }
    }
  }
`;

const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef();
    const resolvedRef = ref || defaultRef;

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return (
      <div className="checkboxselect">
        <input type="checkbox" ref={resolvedRef} {...rest} />
      </div>
    );
  }
);

let TOKEN = localStorage.getItem("access_token");


const Table = React.memo(({ columns, data, updateMyData, parsedQuery }) => {
  const [records, setRecords] = useState(data);

  useEffect(() => {
   var SortedData = data.sort((a, b) => a.sequence - b.sequence);
console.log(data);
    setRecords(SortedData);
  }, [data]);

  // Create an editable cell renderer
  const EditableCell = ({
    value: initialValue,
    row: { index },
    column: { id },
    updateMyData,
    data, // This is a custom function that we supplied to our table instance
  }) => {
    // We need to keep and update the state of the cell normally
    const [value, setValue] = React.useState(initialValue);
    const onChange = useCallback((e) => {
      setValue(e.target.value);
      debounceUpdate(e.target.value)
      console.log(parsedQuery.fileId);
    },[])

    const debounceUpdate = debounce((val) => {
      UpdateCell(val);
    }, 1000);

    const UpdateCell = async (value) => {
      const Payload = {
        index: index+1,
        columnId: id,
        cellValue: value,
        docId: parsedQuery.fileId,
      };
      await axios({
        method: "post", //you can set what request you want to be
        url: `${URL}/excel/cell`,
        headers: {
          Authorization: "Bearer " + TOKEN,
        },
        data: Payload,
      }).then(({data})=>{
        console.log(data);
      })
    }

    // We'll only update the external data when the input is blurred
    const onBlur = () => {
      //   alert(JSON.stringify({ id: id, value: value, index: index }));
      updateMyData(index, id, value);
    };

    // If the initialValue is changed external, sync it up with our state
    React.useEffect(() => {
      setValue(initialValue);
    }, [initialValue]);

    return (
      <input
        value={value}
        className="CellInput"
        onChange={onChange}
        onBlur={onBlur}
      />
    );
  };

  const getRowId = React.useCallback((row) => {
    return row.id;
  }, []);

  const defaultColumn = React.useMemo(
    () => ({
      minWidth: 150,
      // width: 150,
      //   maxWidth: 400,
      Cell: EditableCell,
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state: { selectedRowIds },
    selectedFlatRows,
    getToggleAllRowsSelectedProps,
  } = useTable(
    {
      data: records,
      columns,
      getRowId,
      defaultColumn,
      updateMyData,
    },
    useBlockLayout,
    useResizeColumns,
    useRowSelect
  );

  const moveRow = (dragIndex, hoverIndex) => {
    const dragRecord = records[dragIndex];
    setRecords(
      update(records, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragRecord],
        ],
      })
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ display: "inline-block" }}>
        <div>
          <div {...getTableProps()} className="table">
            <div
              style={{
                backgroundColor: "white",
                position: "sticky",
                top: "49px",
                zIndex: 100,
              }}
            >
              {headerGroups.map((headerGroup) => (
                <div {...headerGroup.getHeaderGroupProps()} className="tr">
                  <div
                    style={{
                      width: "66px",
                      position: "sticky",
                      top: 0,
                      left: 0,
                      zIndex: 100,
                    }}
                    className="th"
                  >
                    <div>
                      <IndeterminateCheckbox
                        {...getToggleAllRowsSelectedProps()}
                      />
                    </div>
                    {/* <p>Sno</p> */}
                  </div>
                  {headerGroup.headers.map((column) => (
                    <div {...column.getHeaderProps()} className="th">
                      <div
                        style={{
                          width: "100%",
                          height: "100%",
                          display: "flex",
                          alignItems: "center",
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <div
                          style={{
                            overflow: "hidden",

                            // textOverflow: "clip",
                            // whiteSpace: "nowrap",
                            // backgroundColor:"red"
                          }}
                        >
                          {column.render("Header")}
                        </div>
                        <div
                          style={{
                            width: "20px",
                            height: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          {/* <svg
                                  width="13"
                                  height="8"
                                  viewBox="0 0 13 8"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M6.49998 8C6.26699 8 6.03403 7.90396 5.8564 7.71229L0.266684 1.67776C-0.0888948 1.29388 -0.0888948 0.671503 0.266684 0.287787C0.62212 -0.095929 1.19852 -0.095929 1.55412 0.287787L6.49998 5.62748L11.4459 0.287974C11.8014 -0.0957425 12.3778 -0.0957425 12.7332 0.287974C13.0889 0.67169 13.0889 1.29407 12.7332 1.67794L7.14355 7.71248C6.96584 7.90418 6.73288 8 6.49998 8Z"
                                    fill="#E2E5EA"
                                  />
                                </svg> */}
                          <Menu
                            menuButton={
                              <MenuButton
                                style={{ backgroundColor: "transparent" }}
                              >
                                <svg
                                  width="13"
                                  height="8"
                                  viewBox="0 0 13 8"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M6.49998 8C6.26699 8 6.03403 7.90396 5.8564 7.71229L0.266684 1.67776C-0.0888948 1.29388 -0.0888948 0.671503 0.266684 0.287787C0.62212 -0.095929 1.19852 -0.095929 1.55412 0.287787L6.49998 5.62748L11.4459 0.287974C11.8014 -0.0957425 12.3778 -0.0957425 12.7332 0.287974C13.0889 0.67169 13.0889 1.29407 12.7332 1.67794L7.14355 7.71248C6.96584 7.90418 6.73288 8 6.49998 8Z"
                                    fill="#E2E5EA"
                                  />
                                </svg>
                              </MenuButton>
                            }
                          >
                            <MenuItem>New File</MenuItem>
                            <MenuItem>Save</MenuItem>
                            <MenuItem>Close Window</MenuItem>
                            <MenuDivider />
                            <MenuHeader>Edit</MenuHeader>
                            <MenuItem>Cut</MenuItem>
                            <MenuItem>Copy</MenuItem>
                            <MenuItem>Paste</MenuItem>
                            <MenuDivider />
                            <MenuItem>Print</MenuItem>
                          </Menu>
                        </div>
                      </div>

                      {/* Use column.getResizerProps to hook up the events correctly */}
                      <div
                        {...column.getResizerProps()}
                        className={`resizer ${
                          column.isResizing ? "isResizing" : ""
                        }`}
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>

            <div style={{ marginTop: "48px" }} {...getTableBodyProps()}>
              {rows.map(
                (row, index) =>
                  prepareRow(row) || (
                    <Row
                      index={index}
                      row={row}
                      moveRow={moveRow}
                      {...row.getRowProps()}
                    />
                  )
              )}
            </div>
          </div>
        </div>
      </div>
      <p>Selected Rows: {Object.keys(selectedRowIds).length}</p>
      <pre>
        <code>
          {JSON.stringify(
            {
              selectedRowIds: selectedRowIds,
              "selectedFlatRows[].original": selectedFlatRows.map(
                (d) => d.original
              ),
            },
            null,
            2
          )}
        </code>
      </pre>
    </DndProvider>
  );
});

const DND_ITEM_TYPE = "row";

const Row = ({ row, index, moveRow }) => {
  const dropRef = React.useRef(null);
  const dragRef = React.useRef(null);

  const [, drop] = useDrop({
    accept: DND_ITEM_TYPE,
    hover(item, monitor) {
      if (!dropRef.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = dropRef.current.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      // Time to actually perform the action
      moveRow(dragIndex, hoverIndex);
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag, preview] = useDrag({
    type: DND_ITEM_TYPE,
    item: { type: DND_ITEM_TYPE, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;

  preview(drop(dropRef));
  drag(dragRef);

  return (
    <tr
      // ref={dropRef}
      {...row.getRowProps()}
      className={opacity == 0 ? "tropacity" : "tr"}
    >
      <div
        style={{
          width: "66px",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "sticky",
          top: 0,
          left: 0,
          zIndex: 10,
          backgroundColor: "white",
        }}
        className="td"
      >
        <div style={{ display: "flex", flexDirection: "row" }}>
          <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
        </div>

        <div
          style={{
            width: "20px",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",

            // cursor: "grabbing",
          }}
          // ref={dragRef}
        >
          <p>{index + 1}</p>
          {/* <svg
            width="7"
            height="14"
            viewBox="0 0 7 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.15001 12.7413L6.81188 8.85304C6.93489 8.67348 7 8.49255 7 8.34217C7 8.05143 6.76666 7.87158 6.37608 7.87158H0.623012C0.232886 7.87158 0 8.0512 0 8.34126C0 8.49187 0.0651627 8.66991 0.188519 8.84987L2.85033 12.7399C3.02179 12.9901 3.25252 13.1286 3.50031 13.1286C3.74793 13.1287 3.97861 12.9917 4.15001 12.7413Z"
              fill="#B8B9BA"
            />
            <g clip-path="url(#clip0)">
              <path
                d="M2.84999 1.25891L0.188122 5.14714C0.065106 5.3267 0 5.50763 0 5.65801C0 5.94875 0.233339 6.1286 0.623918 6.1286L6.37699 6.1286C6.76711 6.1286 7 5.94898 7 5.65892C7 5.50831 6.93484 5.33027 6.81148 5.15031L4.14967 1.26027C3.97821 1.0101 3.74748 0.871561 3.49969 0.871561C3.25207 0.871504 3.02139 1.00846 2.84999 1.25891Z"
                fill="#B8B9BA"
              />
            </g>
            <defs>
              <clipPath id="clip0">
                <rect
                  width="7"
                  height="7"
                  fill="white"
                  transform="translate(7) rotate(90)"
                />
              </clipPath>
            </defs>
          </svg> */}
        </div>
      </div>

      {row.cells.map((cell) => {
        return (
          <div {...cell.getCellProps()} className="td">
            {cell.render("Cell")}
          </div>
        );
      })}
    </tr>
  );
};

const ResultTable = ({ FileId, props, RerenderTable }) => {
  const [Column, setColumn] = useState([]);
  const [Row, setRow] = useState([]);

  const parsedQuery = qs.parse(props.location.search);

  let TOKEN = localStorage.getItem("access_token");
  const history = useHistory();

  let columns = [];

  const FetchData = useCallback(async () => {
    await axios({
      method: "get", //you can set what request you want to be
      url: `${URL}/excel/fetch?fileId=${FileId}`,
      headers: {
        Authorization: "Bearer " + TOKEN,
      },
    })
      .then(({ data }) => {
        if (data.status == 200) {
          data.payload.data.columns.forEach((e) => {
            console.log(e.columnId);
            columns.push({
              Header: e.columnName,
              accessor: e.columnId,
              sequence: e.sequence,
              width: e.columnId == "STUDENT_NAME" ? 300 : 50,
            });
          });

          columns.sort((a, b) => a.sequence - b.sequence);

          setColumn(columns);
          setRow(data.payload.data.rows);

          // toast.success(data.message, {
          //   position: "top-right",
          //   autoClose: 3000,
          // });
        } else {
          toast.error(data.message, {
            position: "top-right",
            autoClose: 3000,
          });
        }
      })
      .catch((e) => {
        toast.error("Something went wrong", {
          position: "top-right",
          autoClose: 3000,
        });
      });
  }, [FileId, setColumn, setRow, Row, Column, RerenderTable]);

  useEffect(() => {
    if (FileId != null) {
      FetchData();
    }
  }, [FileId, RerenderTable]);

  // let columns = React.useMemo(
  //   () => [
  //     {
  //       Header: "First Name",
  //       accessor: "firstName",
  //     },
  //     {
  //       Header: "Last Name",
  //       accessor: "lastName",
  //     },

  //     {
  //       Header: "Age",
  //       accessor: "age",
  //       width: 50,
  //     },
  //     {
  //       Header: "Visits",
  //       accessor: "visits",
  //       width: 60,
  //     },
  //     {
  //       Header: "Status",
  //       accessor: "status",
  //     },
  //     {
  //       Header: "Profile Progress",
  //       accessor: "progress",
  //     },
  //   ],
  //   []
  // );

  const [data, setData] = React.useState(() => makeData(20));

  const updateMyData = (rowIndex, columnId, value) => {
    // We also turn on the flag to not reset the page
    setRow((old) =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...old[rowIndex],
            [columnId]: value,
          };
        }
        return row;
      })
    );
  };

  // alert(JSON.stringify(Row))

  return (
    <Styles>
      {FileId != null && (
        <Table
          parsedQuery={parsedQuery}
          columns={Column}
          data={Row}
          updateMyData={updateMyData}
        />
      )}
    </Styles>
  );
};

export default ResultTable;
