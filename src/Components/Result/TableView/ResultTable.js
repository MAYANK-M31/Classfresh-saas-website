import React from "react";
import styled from "styled-components";
import {
  useTable,
  useBlockLayout,
  useResizeColumns,
  useRowSelect,
} from "react-table";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import update from "immutability-helper";

import makeData from "./makeData";

const Styles = styled.div`
  .table {
    display: inline-block;
    border-spacing: 0;
    border: 1px solid #e2e5ea;
    border-left-width: 0px;
    border-top-width: 0px;

    .tr {
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
      <div>
        <input type="checkbox" ref={resolvedRef} {...rest} />
      </div>
    );
  }
);

function Table({ columns, data, updateMyData }) {
  const [records, setRecords] = React.useState(data);

  // Create an editable cell renderer
  const EditableCell = ({
    value: initialValue,
    row: { index },
    column: { id },
    updateMyData, // This is a custom function that we supplied to our table instance
  }) => {
    // We need to keep and update the state of the cell normally
    const [value, setValue] = React.useState(initialValue);

    const onChange = (e) => {
      setValue(e.target.value);
    };

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
      width: 150,
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
    getToggleAllRowsSelectedProps
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
              style={{ backgroundColor: "white", position: "sticky", top: 0 }}
            >
              {headerGroups.map((headerGroup) => (
                <div {...headerGroup.getHeaderGroupProps()} className="tr">
                  <div style={{ width: "100px" }} className="th">
                     move
                     <div>
                    {
                         
                            <div>
                              <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
                            </div>
                          
                    }
                    </div>
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
                            overflow: "scroll",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
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
                            zIndex: 100,
                          }}
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

            <div {...getTableBodyProps()}>
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
}

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
    <tr ref={dropRef} {...row.getRowProps()} className="tr">
      <div
        style={{
          width: "100px",
          height: "100%",
          display: "flex",
          alignItems: "center",
          cursor: "grabbing",
        }}
        ref={dragRef}
        className="td"
      >
        <div style={{ display: "flex", flexDirection: "row" }}>
          <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
        </div>
        move
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

function ResultTable() {
  const columns = React.useMemo(
    () => [
      {
        Header: "First Name",
        accessor: "firstName",
      },
      {
        Header: "Last Name",
        accessor: "lastName",
      },

      {
        Header: "Age",
        accessor: "age",
        width: 50,
      },
      {
        Header: "Visits",
        accessor: "visits",
        width: 60,
      },
      {
        Header: "Status",
        accessor: "status",
      },
      {
        Header: "Profile Progress",
        accessor: "progress",
      },
    ],
    []
  );

  const [data, setData] = React.useState(() => makeData(20));

  const updateMyData = (rowIndex, columnId, value) => {
    // We also turn on the flag to not reset the page
    setData((old) =>
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

  return (
    <Styles>
      <Table columns={columns} data={data} updateMyData={updateMyData} />
    </Styles>
  );
}

export default ResultTable;
