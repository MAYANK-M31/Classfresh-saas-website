import React, { useEffect, useRef, useState } from "react";
import {
  Menu,
  MenuItem,
  MenuButton,
  MenuDivider,
  MenuHeader,
} from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import RadixMenu from "./RadixMenu";

export default (props) => {
  const [ascSort, setAscSort] = useState("inactive");
  const [descSort, setDescSort] = useState("inactive");
  const [noSort, setNoSort] = useState("inactive");
  const refButton = useRef(null);

  const onMenuClicked = () => {
    props.showColumnMenu(refButton.current);
  };

  const onSortChanged = () => {
    setAscSort(props.column.isSortAscending() ? "active" : "inactive");
    setDescSort(props.column.isSortDescending() ? "active" : "inactive");
    setNoSort(
      !props.column.isSortAscending() && !props.column.isSortDescending()
        ? "active"
        : "inactive"
    );
  };

  const onSortRequested = (order, event) => {
    props.setSort(order, event.shiftKey);
  };

  useEffect(() => {
    props.column.addEventListener("sortChanged", onSortChanged);
    onSortChanged();
    console.log(props);
  }, []);

  let menu = null;
  if (props.enableMenu) {
    menu = (
      <div
        ref={refButton}
        className="customHeaderMenuButton"
        onClick={() => onMenuClicked()}
      >
        <i className={`fa ${props.menuIcon}`}></i>
      </div>
    );
  }

  let sort = null;
  if (props.enableSorting) {
    sort = (
      <div style={{ display: "inline-block" }}>
        <div
          onClick={(event) => onSortRequested("asc", event)}
          onTouchEnd={(event) => onSortRequested("asc", event)}
          className={`customSortDownLabel ${ascSort}`}
        >
          <i class="fa fa-long-arrow-alt-down"></i>
        </div>
        <div
          onClick={(event) => onSortRequested("desc", event)}
          onTouchEnd={(event) => onSortRequested("desc", event)}
          className={`customSortUpLabel ${descSort}`}
        >
          <i class="fa fa-long-arrow-alt-up"></i>
        </div>
        <div
          onClick={(event) => onSortRequested("", event)}
          onTouchEnd={(event) => onSortRequested("", event)}
          className={`customSortRemoveLabel ${noSort}`}
        >
          <i class="fa fa-times"></i>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          textOverflow: "clip",
          overflow: "hidden",
          maxLines: 1,
        }}
      >
        <p
          style={{
            textTransform: "capitalize",
            textOverflow: "clip",
            whiteSpace: "nowrap",
            maxLines: 1,
          }}
        >
          {props.displayName}
        </p>
      </div>

     
        {props.column.colId != "sequence" &&
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
       > <RadixMenu />
       </div>}


      {/* {sort} */}
    </div>
  );
};
