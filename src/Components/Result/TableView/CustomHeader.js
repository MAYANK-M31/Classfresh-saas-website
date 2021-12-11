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

const CustomHeader= (props) => {

console.log(props);
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        cursor:"pointer"

      }}
    >
      <div
        style={{
          width: "100%",
          textOverflow: "clip",
          overflow: "hidden",
          maxLines: 1,
          cursor:"pointer"

        }}
      >
        <p
        
          style={{
            textTransform: "capitalize",
            textOverflow: "clip",
            whiteSpace: "nowrap",
            maxLines: 1,
            cursor:"pointer"
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

export default CustomHeader