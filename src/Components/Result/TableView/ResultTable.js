// import React, { useCallback, useEffect, useMemo, useState } from "react";
// import styled from "styled-components";
// import * as qs from "query-string";

// import {
//   useTable,
//   useBlockLayout,
//   useResizeColumns,
//   useRowSelect,
// } from "react-table";
// import { DndProvider, useDrag, useDrop } from "react-dnd";
// import { HTML5Backend } from "react-dnd-html5-backend";
// import update from "immutability-helper";

// import makeData from "./makeData";
// import axios from "axios";
// import { URL } from "../../../URL/URL";
// import { useHistory } from "react-router";
// import { debounce } from "lodash-es";
// import { Toaster, toast } from "react-hot-toast";
//
// import { Button } from "react-bootstrap";

// const Styles = styled.div`
//   .table {
//     border-spacing: 0;
//     border: 1px solid #e2e5ea;
//     border-left-width: 0px;
//     margin-top: 10px .tr {
//       :last-child {
//         .td {
//           border-bottom: 0;
//         }
//       }
//       height: 46px;
//     }

//     .th,
//     .td {
//       margin: 0;
//       padding: 0.5rem;
//       border-bottom: 0.5px solid #e2e5ea;
//       border-right: 0.5px solid #e2e5ea;

//       :last-child {
//         border-right: 0;
//       }

//       .resizer {
//         display: inline-block;
//         background: transparent;
//         width: 15px;
//         height: 100%;
//         position: absolute;
//         right: 0;
//         top: 0;
//         transform: translateX(50%);
//         z-index: 1;
//         ${"" /* prevents from scrolling while dragging on touch devices */}
//         touch-action:none;

//         &.isResizing {
//           background: transparent;
//         }
//       }
//     }
//   }
// `;

// const IndeterminateCheckbox = React.forwardRef(
//   ({ indeterminate, ...rest }, ref) => {
//     const defaultRef = React.useRef();
//     const resolvedRef = ref || defaultRef;

//     React.useEffect(() => {
//       resolvedRef.current.indeterminate = indeterminate;
//     }, [resolvedRef, indeterminate]);

//     return (
//       <div className="checkboxselect">
//         <input type="checkbox" ref={resolvedRef} {...rest} />
//       </div>
//     );
//   }
// );

// let TOKEN = localStorage.getItem("access_token");

// const Table = React.memo(({ columns, data, updateMyData, parsedQuery }) => {
//   // const [records, setRecords] = useState(data);

//   // useEffect(() => {
//   //   // var SortedData = data.sort((a, b) => a.sequence - b.sequence);
//   //   // setRecords(SortedData);
//   //   records()
//   // }, [data]);

//   console.log("RE RENDERED TABLE");

//   // Create an editable cell renderer
//   const EditableCell = React.memo(
//     ({
//       value: initialValue,
//       row: { index },
//       column: { id },
//       updateMyData,
//       data, // This is a custom function that we supplied to our table instance
//     }) => {
//       // We need to keep and update the state of the cell normally
//       const [value, setValue] = React.useState(initialValue);
//       const onChange = useCallback(
//         (e, fileId) => {
//           setValue(e.target.value);
//           debounceUpdate(e.target.value, fileId);
//         },
//         [setValue]
//       );

//       // console.log(data[index].id);

//       const debounceUpdate = debounce((val, fileId) => {
//         UpdateCell(val, fileId);
//       }, 1000);

//       const UpdateCell = useCallback(async (value, fileId) => {
//         const Payload = {
//           rowId: data[index].id,
//           columnId: id,
//           cellValue: value,
//           docId: fileId,
//         };

//         await axios({
//           method: "post", //you can set what request you want to be
//           url: `${URL}/excel/cell`,
//           headers: {
//             Authorization: "Bearer " + TOKEN,
//           },
//           data: Payload,
//         }).then(({ data }) => {
//           if (data.status != 200) return toast.error(data.message);
//           console.log(data);
//         });
//       }, []);

//       // We'll only update the external data when the input is blurred
//       const onBlur = useCallback(() => {
//         updateMyData(index, id, value);

//         //   alert(JSON.stringify({ id: id, value: value, index: index }));
//         // updateMyData(index, id, value);
//       }, []);

//       // If the initialValue is changed external, sync it up with our state
//       React.useEffect(() => {
//         setValue(initialValue);
//       }, [initialValue]);
//       return (
//         <input
//           value={value}
//           className="CellInput"
//           style={{ cursor: "default" }}
//           onChange={(e) => onChange(e, parsedQuery?.fileId)}
//           onBlur={onBlur}
//         />
//       );
//     }
//   );

//   const getRowId = React.useCallback((row) => {
//     return row.id;
//   }, []);

//   const defaultColumn = React.useMemo(
//     () => ({
//       minWidth: 150,
//       // width: 150,
//       //   maxWidth: 400,
//       Cell: EditableCell,
//     }),
//     [parsedQuery]
//   );

//   const {
//     getTableProps,
//     getTableBodyProps,
//     headerGroups,
//     rows,
//     prepareRow,
//     state: { selectedRowIds },
//     selectedFlatRows,
//     getToggleAllRowsSelectedProps,
//   } = useTable(
//     {
//       data: data,
//       columns,
//       getRowId,
//       defaultColumn,
//       updateMyData,
//     },
//     useBlockLayout,
//     useResizeColumns,
//     useRowSelect
//   );

//   const moveRow = (dragIndex, hoverIndex) => {
//     const dragRecord = data[dragIndex];
//     // setRecords(
//     //   update(records, {
//     //     $splice: [
//     //       [dragIndex, 1],
//     //       [hoverIndex, 0, dragRecord],
//     //     ],
//     //   })
//     // );
//   };

//   return (
//     <DndProvider backend={HTML5Backend}>
//       <div style={{ display: "inline-block" }}>
//         <div>
//           <div {...getTableProps()} className="table">
//             <div
//               style={{
//                 backgroundColor: "white",
//                 position: "sticky",
//                 top: "49px",
//                 zIndex: 100,
//               }}
//             >
//               {headerGroups.map((headerGroup) => (
//                 <div {...headerGroup.getHeaderGroupProps()} className="tr">
//                   <div
//                     style={{
//                       width: "66px",
//                       position: "sticky",
//                       top: 0,
//                       left: 0,
//                       zIndex: 100,
//                     }}
//                     className="th"
//                   >
//                     <div>
//                       <IndeterminateCheckbox
//                         {...getToggleAllRowsSelectedProps()}
//                       />
//                     </div>
//                     {/* <p>Sno</p> */}
//                   </div>
//                   {headerGroup.headers.map((column, index) => (
//                     <Column key={index} column={column} />
//                   ))}
//                 </div>
//               ))}
//             </div>

//             <div style={{ marginTop: "48px" }} {...getTableBodyProps()}>
//               {rows.map(
//                 (row, index) =>{
//                   return(
//                      prepareRow(row) || (
//                     <Row
//                       key={row.id}
//                       index={index}
//                       row={row}
//                       // moveRow={moveRow}
//                       {...row.getRowProps()}
//                     />
//                   )
//                   )
//                 }
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//       <p>Selected Rows: {Object.keys(selectedRowIds).length}</p>
//       <pre>
//         <code>
//           {JSON.stringify(
//             {
//               selectedRowIds: selectedRowIds,
//               "selectedFlatRows[].original": selectedFlatRows.map(
//                 (d) => d.original
//               ),
//             },
//             null,
//             2
//           )}
//         </code>
//       </pre>
//     </DndProvider>
//   );
// });

// const Column = React.memo(({ column }) => {
//   console.log("RENDERED COLUMN");
//   return (
// <div {...column.getHeaderProps()} className="th">
//   <div
//     style={{
//       width: "100%",
//       height: "100%",
//       display: "flex",
//       alignItems: "center",
//       flexDirection: "row",
//       justifyContent: "space-between",
//     }}
//   >
//     <div
//       style={{
//         overflow: "hidden",

//         // textOverflow: "clip",
//         // whiteSpace: "nowrap",
//         // backgroundColor:"red"
//       }}
//     >
//       {column.render("Header")}
//     </div>
//     <div
//       style={{
//         width: "20px",
//         height: "100%",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//       }}
//     >
//       {/* <svg
//                               width="13"
//                               height="8"
//                               viewBox="0 0 13 8"
//                               fill="none"
//                               xmlns="http://www.w3.org/2000/svg"
//                             >
//                               <path
//                                 d="M6.49998 8C6.26699 8 6.03403 7.90396 5.8564 7.71229L0.266684 1.67776C-0.0888948 1.29388 -0.0888948 0.671503 0.266684 0.287787C0.62212 -0.095929 1.19852 -0.095929 1.55412 0.287787L6.49998 5.62748L11.4459 0.287974C11.8014 -0.0957425 12.3778 -0.0957425 12.7332 0.287974C13.0889 0.67169 13.0889 1.29407 12.7332 1.67794L7.14355 7.71248C6.96584 7.90418 6.73288 8 6.49998 8Z"
//                                 fill="#E2E5EA"
//                               />
//                             </svg> */}
// <Menu
//   menuButton={
//     <MenuButton style={{ backgroundColor: "transparent" }}>
//       <svg
//         width="13"
//         height="8"
//         viewBox="0 0 13 8"
//         fill="none"
//         xmlns="http://www.w3.org/2000/svg"
//       >
//         <path
//           d="M6.49998 8C6.26699 8 6.03403 7.90396 5.8564 7.71229L0.266684 1.67776C-0.0888948 1.29388 -0.0888948 0.671503 0.266684 0.287787C0.62212 -0.095929 1.19852 -0.095929 1.55412 0.287787L6.49998 5.62748L11.4459 0.287974C11.8014 -0.0957425 12.3778 -0.0957425 12.7332 0.287974C13.0889 0.67169 13.0889 1.29407 12.7332 1.67794L7.14355 7.71248C6.96584 7.90418 6.73288 8 6.49998 8Z"
//           fill="#E2E5EA"
//         />
//       </svg>
//     </MenuButton>
//   }
// >
//   <MenuItem>New File</MenuItem>
//   <MenuItem>Save</MenuItem>
//   <MenuItem>Close Window</MenuItem>
//   <MenuDivider />
//   <MenuHeader>Edit</MenuHeader>
//   <MenuItem>Cut</MenuItem>
//   <MenuItem>Copy</MenuItem>
//   <MenuItem>Paste</MenuItem>
//   <MenuDivider />
//   <MenuItem>Print</MenuItem>
// </Menu>
//     </div>
//   </div>

//   {/* Use column.getResizerProps to hook up the events correctly */}
//   <div
//     {...column.getResizerProps()}
//     className={`resizer ${column.isResizing ? "isResizing" : ""}`}
//   />
// </div>
//   );
// });

// const DND_ITEM_TYPE = "row";

// const Row = React.memo(({ row, index }) => {
//   // const dropRef = React.useRef(null);
//   // const dragRef = React.useRef(null);
//   // const [, drop] = useDrop({
//   //   accept: DND_ITEM_TYPE,
//   //   hover(item, monitor) {
//   //     if (!dropRef.current) {
//   //       return;
//   //     }
//   //     const dragIndex = item.index;
//   //     const hoverIndex = index;
//   //     // Don't replace items with themselves
//   //     if (dragIndex === hoverIndex) {
//   //       return;
//   //     }
//   //     // Determine rectangle on screen
//   //     const hoverBoundingRect = dropRef.current.getBoundingClientRect();
//   //     // Get vertical middle
//   //     const hoverMiddleY =
//   //       (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
//   //     // Determine mouse position
//   //     const clientOffset = monitor.getClientOffset();
//   //     // Get pixels to the top
//   //     const hoverClientY = clientOffset.y - hoverBoundingRect.top;
//   //     // Only perform the move when the mouse has crossed half of the items height
//   //     // When dragging downwards, only move when the cursor is below 50%
//   //     // When dragging upwards, only move when the cursor is above 50%
//   //     // Dragging downwards
//   //     if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
//   //       return;
//   //     }
//   //     // Dragging upwards
//   //     if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
//   //       return;
//   //     }
//   //     // Time to actually perform the action
//   //     moveRow(dragIndex, hoverIndex);
//   //     // Note: we're mutating the monitor item here!
//   //     // Generally it's better to avoid mutations,
//   //     // but it's good here for the sake of performance
//   //     // to avoid expensive index searches.
//   //     item.index = hoverIndex;
//   //   },
//   // });

//   // const [{ isDragging }, drag, preview] = useDrag({
//   //   type: DND_ITEM_TYPE,
//   //   item: { type: DND_ITEM_TYPE, index },
//   //   collect: (monitor) => ({
//   //     isDragging: monitor.isDragging(),
//   //   }),
//   // });

//   // const opacity = isDragging ? 0 : 1;

//   // preview(drop(dropRef));
//   // drag(dragRef);
//   console.log("RE RENDERED ROW");
//   return (
//     <tr
//       // ref={dropRef}

//       {...row.getRowProps()}
//       className={"tr"}
//     >
//       <div
//         style={{
//           width: "66px",
//           height: "100%",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//           position: "sticky",
//           top: 0,
//           left: 0,
//           zIndex: 10,
//           backgroundColor: "white",
//         }}
//         className="td"
//       >
//         <div style={{ display: "flex", flexDirection: "row" }}>
//           <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
//         </div>

//         <div
//           style={{
//             width: "20px",
//             height: "100%",
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",

//             // cursor: "grabbing",
//           }}
//           // ref={dragRef}
//         >
//           <p>{index + 1}</p>
//           {/* <svg
//             width="7"
//             height="14"
//             viewBox="0 0 7 14"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               d="M4.15001 12.7413L6.81188 8.85304C6.93489 8.67348 7 8.49255 7 8.34217C7 8.05143 6.76666 7.87158 6.37608 7.87158H0.623012C0.232886 7.87158 0 8.0512 0 8.34126C0 8.49187 0.0651627 8.66991 0.188519 8.84987L2.85033 12.7399C3.02179 12.9901 3.25252 13.1286 3.50031 13.1286C3.74793 13.1287 3.97861 12.9917 4.15001 12.7413Z"
//               fill="#B8B9BA"
//             />
//             <g clip-path="url(#clip0)">
//               <path
//                 d="M2.84999 1.25891L0.188122 5.14714C0.065106 5.3267 0 5.50763 0 5.65801C0 5.94875 0.233339 6.1286 0.623918 6.1286L6.37699 6.1286C6.76711 6.1286 7 5.94898 7 5.65892C7 5.50831 6.93484 5.33027 6.81148 5.15031L4.14967 1.26027C3.97821 1.0101 3.74748 0.871561 3.49969 0.871561C3.25207 0.871504 3.02139 1.00846 2.84999 1.25891Z"
//                 fill="#B8B9BA"
//               />
//             </g>
//             <defs>
//               <clipPath id="clip0">
//                 <rect
//                   width="7"
//                   height="7"
//                   fill="white"
//                   transform="translate(7) rotate(90)"
//                 />
//               </clipPath>
//             </defs>
//           </svg> */}
//         </div>
//       </div>

//       {row.cells.map((cell, index) => {
//         return <Cell key={index} cell={cell} />;
//       })}
//     </tr>
//   );
// });

// const Cell = React.memo(({ cell }) => {
//   return (
//     <div {...cell.getCellProps()} className="td">
//       {cell.render("Cell")}
//     </div>
//   );
// });

// const ResultTable = React.memo(({ FileId, parsedQuery, RerenderTable }) => {
//   const [Column, setColumn] = useState([]);
//   const [Row, setRow] = useState([]);

//   let TOKEN = localStorage.getItem("access_token");
//   const history = useHistory();
//   let columns = [];

//   console.log("RERENDER");

//   const FetchData = useCallback(async () => {
//     await axios({
//       method: "get", //you can set what request you want to be
//       url: `${URL}/excel/fetch?fileId=${FileId}`,
//       headers: {
//         Authorization: "Bearer " + TOKEN,
//       },
//     })
//       .then(({ data }) => {
//         if (data.status == 200) {
//           data.payload.data.columns.forEach((e) => {
//             console.log(e.columnId);
//             columns.push({
//               Header: e.columnName,
//               accessor: e.columnId,
//               sequence: e.sequence,
//               width: e.columnId == "STUDENT_NAME" ? 300 : 50,
//             });
//           });

//           columns.sort((a, b) => a.sequence - b.sequence);

//           setColumn(columns);
//           var SORTED = data.payload.data.rows.sort((a, b) => a.sequence - b.sequence);
//           setRow(SORTED);

//           // toast.success(data.message, {
//           //   position: "top-center",
//           //   duration: 3000,
//           // });
//         } else {
//           toast.error(data.message, {
//             position: "top-center",
//             duration: 3000,
//           });
//         }
//       })
//       .catch((e) => {
//         toast.error("Something went wrong", {
//           position: "top-center",
//           duration: 3000,
//         });
//       });
//   }, [FileId, setColumn, setRow, Row, Column, RerenderTable, parsedQuery]);

//   useEffect(() => {
//     if (FileId != null) {
//       FetchData();
//     }
//   }, [FileId, RerenderTable]);

//   // let columns = React.useMemo(
//   //   () => [
//   //     {
//   //       Header: "First Name",
//   //       accessor: "firstName",
//   //     },
//   //     {
//   //       Header: "Last Name",
//   //       accessor: "lastName",
//   //     },

//   //     {
//   //       Header: "Age",
//   //       accessor: "age",
//   //       width: 50,
//   //     },
//   //     {
//   //       Header: "Visits",
//   //       accessor: "visits",
//   //       width: 60,
//   //     },
//   //     {
//   //       Header: "Status",
//   //       accessor: "status",
//   //     },
//   //     {
//   //       Header: "Profile Progress",
//   //       accessor: "progress",
//   //     },
//   //   ],
//   //   []
//   // );

//   // const [data, setData] = React.useState(() => makeData(20));

//   const updateMyData = useCallback((rowIndex, columnId, value) => {
//     // We also turn on the flag to not reset the page
//     setRow((old) =>
//       old.map((row, index) => {
//         if (index === rowIndex) {
//           return {
//             ...old[rowIndex],
//             [columnId]: value,
//           };
//         }
//         return row;
//       })
//     );
//   }, []);

//   // alert(JSON.stringify(Row))

//   return (
//     <Styles>

//       {FileId != null && (
//         <Table
//           parsedQuery={parsedQuery}
//           columns={Column}
//           data={Row}
//           updateMyData={updateMyData}
//         />
//       )}
//     </Styles>
//   );
// });

// export default ResultTable;

// import React, { useCallback, useEffect, useMemo, useState } from "react";
// import styled from "styled-components";
// import * as qs from "query-string";

// import makeData from "./makeData";
// import axios from "axios";
// import { URL } from "../../../URL/URL";
// import { useHistory } from "react-router";
// import { debounce } from "lodash-es";
// import { Toaster, toast } from "react-hot-toast";
//
// import { Button } from "react-bootstrap";
// import DataGrid, { TextEditor } from "react-data-grid";

// import {
//   Menu,
//   MenuItem,
//   MenuButton,
//   MenuDivider,
//   MenuHeader,
// } from "@szhsin/react-menu";
// import "@szhsin/react-menu/dist/index.css";

// let TOKEN = localStorage.getItem("access_token");

// const Styles = styled.div`
// .th{
//   // background-color:red;

// }

// `;

// const ResultTable = React.memo(({ FileId, parsedQuery, RerenderTable }) => {
//   const [Column, setColumn] = useState([]);
//   const [Row, setRow] = useState([]);

//   let TOKEN = localStorage.getItem("access_token");
//   const history = useHistory();
//   let columns = [];

//   console.log("RERENDER");

//   function CustomHeader(item) {
//     return (
//       <Styles>
//         <div className="th">
//           <div
//             style={{
//               width: "100%",
//               height: "100%",
//               display: "flex",
//               alignItems: "center",
//               flexDirection: "row",
//               justifyContent: "space-between",
//             }}
//           >
//             <div
//               style={
//                 {
//                   // overflow: "hidden",
//                   // backgroundColor:"red"
//                 }
//               }
//             >
//               {item.column.name}
//             </div>

//             <div
//               style={{
//                 width: "20px",
//                 height: "100%",
//                 display: "flex",
//                 // backgroundColor:"yellow",
//                 justifyContent: "center",
//                 alignItems: "center",
//               }}
//             >
//               <Menu

// menuButton={
//                   <MenuButton style={{ backgroundColor: "transparent" }}>
//                     <svg
//                       width="13"
//                       height="8"
//                       viewBox="0 0 13 8"
//                       fill="none"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <path
//                         d="M6.49998 8C6.26699 8 6.03403 7.90396 5.8564 7.71229L0.266684 1.67776C-0.0888948 1.29388 -0.0888948 0.671503 0.266684 0.287787C0.62212 -0.095929 1.19852 -0.095929 1.55412 0.287787L6.49998 5.62748L11.4459 0.287974C11.8014 -0.0957425 12.3778 -0.0957425 12.7332 0.287974C13.0889 0.67169 13.0889 1.29407 12.7332 1.67794L7.14355 7.71248C6.96584 7.90418 6.73288 8 6.49998 8Z"
//                         fill="#E2E5EA"
//                       />
//                     </svg>
//                   </MenuButton>
//                 }
//               >
//                 <MenuItem>New File</MenuItem>
//                 <MenuItem>Save</MenuItem>
//                 <MenuItem>Close Window</MenuItem>
//                 <MenuDivider />
//                 <MenuHeader>Edit</MenuHeader>
//                 <MenuItem>Cut</MenuItem>
//                 <MenuItem>Copy</MenuItem>
//                 <MenuItem>Paste</MenuItem>
//                 <MenuDivider />
//                 <MenuItem>Print</MenuItem>
//               </Menu>
//             </div>
//           </div>

//           {/* Use column.getResizerProps to hook up the events correctly */}
//         </div>
//       </Styles>
//     );
//   }

// const FetchData = useCallback(async () => {
//   await axios({
//     method: "get", //you can set what request you want to be
//     url: `${URL}/excel/fetch?fileId=${FileId}`,
//     headers: {
//       Authorization: "Bearer " + TOKEN,
//     },
//   })
//     .then(({ data }) => {
//       if (data.status == 200) {
//         data.payload.data.columns.forEach((e) => {
//           console.log(e.columnId);
//           columns.push({
//             name: e.columnName,
//             key: e.columnId,
//             editor: TextEditor,
//             headerRenderer: CustomHeader,
//             editable: true,
//             sortable: true,
//             sequence: e.sequence,
//             width: e.columnId == "STUDENT_NAME" ? 300 : 150,
//           });
//         });

//         columns.sort((a, b) => a.sequence - b.sequence);
//         console.log(columns);
//         setColumn(columns);
//         var SORTED = data.payload.data.rows.sort(
//           (a, b) => a.sequence - b.sequence
//         );
//         setRow(SORTED);

//         // toast.success(data.message, {
//         //   position: "top-center",
//         //   duration: 3000,
//         // });
//       } else {
//         toast.error(data.message, {
//           position: "top-center",
//           duration: 3000,
//         });
//       }
//     })
//     .catch((e) => {
//       toast.error("Something went wrong", {
//         position: "top-center",
//         duration: 3000,
//       });
//     });
// }, [FileId, setColumn, setRow, Row, Column, RerenderTable, parsedQuery]);

//   useEffect(() => {
//     if (FileId != null) {
//       FetchData();
//     }
//   }, [FileId, RerenderTable]);

//   const updateMyData = useCallback((rowIndex, columnId, value) => {
//     // We also turn on the flag to not reset the page
//     setRow((old) =>
//       old.map((row, index) => {
//         if (index === rowIndex) {
//           return {
//             ...old[rowIndex],
//             [columnId]: value,
//           };
//         }
//         return row;
//       })
//     );
//   }, []);

//   const onGridRowsUpdated = ({ fromRow, toRow, updated }) => {
//     setRow((state) => {
//       const rows = state.slice();
//       for (let i = fromRow; i <= toRow; i++) {
//         rows[i] = { ...rows[i], ...updated };
//       }
//       return { rows };
//     });
//   };

//   const onChangeData = (e) => {
//     setRow(e);
//   };

//   function rowKeyGetter(row) {
//     return row.id;
//   }

//   return (
//     <div
//       style={{
//         width: "100%",
//         height: "100%",
//         paddingTop: "49px",
//       }}
//     >
//       {FileId != null && (
//         <DataGrid
//           className="rdg-light"
//           style={{ height: "100%" }}
//           columns={Column}
//           rows={Row}
//           onGridRowsUpdated={onGridRowsUpdated}
//           onRowsChange={onChangeData}
//           rowKeyGetter={rowKeyGetter}
//           enableCellSelect={true}
//           enableRowSelect={true}
//           rowsCount={Row.length}
//           rowHeight={46}

//           />
//       )}
//     </div>
//   );
// });

import React, { useState, useCallback, useEffect } from "react";
import { render } from "react-dom";
import { AgGridReact, AgGridColumn } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

import styled from "styled-components";
import * as qs from "query-string";

import makeData from "./makeData";
import axios from "axios";
import { URL } from "../../../URL/URL";
import { useHistory } from "react-router";
import { debounce } from "lodash-es";
import toast, { Toaster } from "react-hot-toast";
import { Button, Form, Modal } from "react-bootstrap";
import RadixMenu from "./RadixMenu";
import { PulseLoader } from "react-spinners";
import { css } from "@emotion/react";

const ResultTable = React.memo(
  ({ FileId, parsedQuery, RerenderTable, Saving, onRowSelect, DeletedRow }) => {
    const [gridApi, setGridApi] = useState(null);
    const [gridColumnApi, setGridColumnApi] = useState(null);
    const [rowData, setRowData] = useState(null);
    const [Column, setColumn] = useState([]);
    const [Row, setRow] = useState([]);

    let TOKEN = localStorage.getItem("access_token");
    const history = useHistory();
    let columns = [];

    const onGridReady = useCallback(
      (params) => {
        setGridApi(params.api);
        setGridColumnApi(params.columnApi);

        // fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
        //   .then((resp) => resp.json())
        //   .then((data) => {
        //     console.log(data);
        //     updateData(data);
        //   });
      },
      [gridApi]
    );

    const FetchData = useCallback(async () => {
      const updateData = (data) => {
        gridApi.setRowData(data);
        ResizeFitColumns();
      };

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
              columns.push({
                name: e.columnName,
                key: e.columnId,
                sequence: e.sequence,
                editable: e.columnId == "STUDENT_NAME" ? false : true,
                width: e.columnId == "STUDENT_NAME" ? 300 : 150,
                maxmarks: e.maxmarks,
                valueType: e.valueType,
              });
            });

            columns.sort((a, b) => a.sequence - b.sequence);

            setColumn(columns);
            var SORTED = data.payload.data.rows.sort(
              (a, b) => a.sequence - b.sequence
            );
            setRow(SORTED);
            updateData(SORTED);

            // toast.success(data.message, {
            //   position: "top-center",
            //   duration: 3000,
            // });
          } else {
            toast.error(data.message, {
              position: "top-center",
              duration: 3000,
            });
          }
        })
        .catch((e) => {
          toast.error("Something went wrong", {
            position: "top-center",
            duration: 3000,
          });
        });
    }, [FileId, setColumn, setRow, Row, Column, RerenderTable, parsedQuery]);

    useEffect(() => {
      if (FileId != null) {
        FetchData();
      }
    }, [FileId, RerenderTable]);

    const onQuickFilterChanged = useCallback(() => {
      gridApi.setQuickFilter(document.getElementById("quickFilter").value);
    }, [gridApi]);

    const CellStyle = (params, index) => {
      // console.log(params);

      if (index == 0) return { borderRight: "0px solid #d9dce0" };

      if (index === Column.length - 1) {
        return {
          borderLeft: "0.5px solid #d9dce0",
          borderRight: "0.5px solid #d9dce0",
        };
      }
      return { borderLeft: "0.5px solid #d9dce0" };
    };

    const cellClicked = (params) => {
      // console.log(params);
    };

    const UpdateCell = useCallback(
      async ({ rowId, columnId, value, fileId }) => {
        const Payload = {
          rowId: rowId,
          columnId: columnId,
          cellValue: value,
          docId: fileId,
        };
        Saving(300);
        await axios({
          method: "post", //you can set what request you want to be
          url: `${URL}/excel/cell`,
          headers: {
            Authorization: "Bearer " + TOKEN,
          },
          data: Payload,
        }).then(({ data }) => {
          if (data.status != 200) {
            return toast.error(data.message);
          }
          Saving(200);
          console.log(data);
        });
      },
      [FileId, RerenderTable]
    );

    const onCellValueChanged = useCallback(
      (param) => {
        console.log(param);
        UpdateCell({
          rowId: param?.data?.id,
          columnId: param?.column?.colId,
          value: param?.value,
          fileId: FileId,
        });
      },
      [FileId]
    );

    function myCustomSumFunction(values) {
      var sum = 0;
      values.forEach(function (value) {
        sum += Number(value);
      });
      return sum;
    }

    const DeleteColumn = async ({ colId, params }) => {
      let TempColumn = params.columns;
      let TempRow = params.rows;

      TempColumn = TempColumn.filter((e) => e.key != colId);
      setColumn(TempColumn);

      // console.log(TempRow);

      TempRow.forEach((e) => {
        delete TempRow[colId];
      });

      var SORTED = TempRow.sort((a, b) => a.sequence - b.sequence);

      const updateData = (data) => params.gridApi.setRowData(data);

      updateData(SORTED);
    };

    useEffect(() => {
      if (DeletedRow.length > 0) {
        var New = Row;
        DeletedRow.forEach((element) => {
          New = New.filter((e) => e.id != element.id);
        });

        gridApi.setRowData(New);
        setRow(New);
      }
    }, [DeletedRow]);

    const CustomHeader = (props) => {
      console.log(props);
      return (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          <div
            style={{
              width: "100%",
              textOverflow: "clip",
              overflow: "hidden",
              maxLines: 1,
              cursor: "pointer",
            }}
          >
            <p
              style={{
                textTransform: "capitalize",
                textOverflow: "clip",
                whiteSpace: "nowrap",
                maxLines: 1,
                cursor: "pointer",
              }}
            >
              {props.displayName}{" "}
              {props.column.colId != "sequence" &&
              props.column.colId != "STUDENT_NAME"
                ? "("
                : null}
              {JSON.stringify(
                props.column?.colDef?.headerComponentParams?.columnParam
                  ?.maxmarks
              )}
                {props.column.colId != "sequence" &&
              props.column.colId != "STUDENT_NAME"
                ? ")"
                : null}
            </p>
          </div>

          {props.column.colId != "sequence" && (
            <div
              style={{
                width: "50px",
                position: "absolute",
                zIndex: 1,
                right: 0,
                paddingRight: 10,
                backgroundColor: "#e7f5ef",
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                textOverflow: "ellipsis",
                overflow: "hidden",
              }}
            >
              {" "}
              <RadixMenu
                DeleteColumn={DeleteColumn}
                FileId={FileId}
                column={props.column}
              />
            </div>
          )}

          {/* {sort} */}
        </div>
      );
    };

    const onSelectionChanged = () => {
      var selectedRows = gridApi.getSelectedRows();
      // setRowSelected(!RowSelected)
      onRowSelect(selectedRows);
      // console.log(selectedRows);
    };

    function onFirstDataRendered(params) {
      params.api.sizeColumnsToFit();
      ResizeFitColumns();
    }

    function ResizeFitColumns() {
      // setTimeout(() => {
      //   const allColumnIds = [];
      //   gridColumnApi.getAllColumns().forEach((column) => {
      //     allColumnIds.push(column.colId);
      //   });
      //   gridColumnApi.autoSizeColumns(allColumnIds);
      // }, 50);
    }

    return (
      <div
        style={{
          width: "100%",
          height: "calc(100% - 49px)",
          marginTop: "49px",
        }}
      >
        <div className="example-wrapper">
          {/* <div style={{ marginBottom: "5px" }}>
          <input
            type="text"
            onInput={() => onQuickFilterChanged()}
            id="quickFilter"
            placeholder="quick filter..."
          />
        </div> */}
          <div
            id="myGrid"
            className="ag-theme-alpine"
            style={{
              border: "none",
              backgroundColor: "red",
              overflow: "scroll",
            }}
          >
            <AgGridReact
              defaultColDef={{
                flex: 1,
                minWidth: 100,
                resizable: true,
              }}
              containerStyle={{ backgroundColor: "red", height: "100%" }}
              allowContextMenuWithControlKey={true}
              suppressMenuHide={true}
              suppressRowHoverHighlight={true}
              suppressRowClickSelection={true}
              suppressDragLeaveHidesColumns={true}
              onCellClicked={cellClicked}
              onCellValueChanged={onCellValueChanged}
              frameworkComponents={{ agColumnHeader: CustomHeader }}
              onSelectionChanged={onSelectionChanged}
              onFirstDataRendered={onFirstDataRendered}
              // debounceVerticalScrollbar={true}

              rowSelection={"multiple"}
              onGridReady={onGridReady}
              rowData={rowData}
            >
              <AgGridColumn
                headerName={"Sno"}
                field="sequence"
                key={"Sno"}
                pinned={"left"}
                width={100}
                maxWidth={100}
                resizable={false}
                suppressSizeToFit={true}
                headerCheckboxSelection={true}
                cellStyle={{ borderLeft: "0px" }}
                headerCheckboxSelectionFilteredOnly={true}
                checkboxSelection={true}
              />
              {Column.map((item, index) => (
                <AgGridColumn
                  key={item.id}
                  headerName={item.name}
                  field={item.key}
                  minWidth={item.width}
                  resizable={true}
                  editable={item.editable}
                  cellStyle={(e) => CellStyle(e, index)}
                  headerComponentParams={{
                    menuIcon: "fa-cog",
                    FileId: FileId,
                    rows: Row,
                    columns: Column,
                    gridApi: gridApi,
                    columnParam: item,
                  }}
                />
              ))}
            </AgGridReact>
          </div>
        </div>
        {/* <MyVerticallyCenteredModal
          show={showDeleteColumn}
          onHide={() => setshowDeleteColumn(false)}
        /> */}
      </div>
    );
  }
);

function MyVerticallyCenteredModal(props) {
  return (
    <Modal {...props} centered onHide={props.onHide}>
      <Modal.Header style={{ border: 0 }}>
        <Modal.Title style={{ fontSize: 20 }}>Delete Column</Modal.Title>
      </Modal.Header>

      <Modal.Body style={{ paddingTop: 5 }}>
        <Form.Group className="mb-0 mt-0 " controlId="ModalInputFormView">
          <Form.Label className="font-weight-light">
            <p style={{ fontWeight: 100, fontSize: 18, color: "#6c757d" }}>
              Are you sure want to{" "}
              <span style={{ fontWeight: "bold", color: "black" }}>delete</span>{" "}
              column
              <span style={{ fontWeight: "bold", color: "black" }}>
                {props.ConfirmValue}
              </span>
            </p>
          </Form.Label>
          <div style={{ width: "100%" }}></div>
        </Form.Group>
      </Modal.Body>
      <Modal.Footer style={{ border: 0 }}>
        <Button variant="light" onClick={props.onHide}>
          Cancel
        </Button>
        <Button
          variant="danger"
          disabled={props.Value == props.ConfirmValue ? props.Loader : true}
          onClick={props.HandleSubmitForm}
        >
          {props.Loader ? (
            <PulseLoader
              color={"white"}
              loading={true}
              css={Loadercss}
              size={8}
              margin={1}
            />
          ) : (
            <p>Delete</p>
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

const Loadercss = css`
  display: block;
  border-color: red;
`;

export default ResultTable;
