// import React, { Component } from "react";
// import "../../../css/Result/Sidebar/ResultSideBar.css";

// const ResultSideBar = () => {
//   return (
//     <div className="ResultSidebar">
// <div className="GroupView">
//   <p>All Lists</p>
//   <svg
//     width="25"
//     height="25"
//     viewBox="0 0 25 25"
//     fill="none"
//     xmlns="http://www.w3.org/2000/svg"
//   >
//     <rect
//       x="1"
//       y="1"
//       width="23"
//       height="23"
//       rx="5"
//       stroke="#506D85"
//       stroke-width="2"
//     />
//     <g clip-path="url(#clip0)">
//       <path
//         d="M18.9772 11.1364H13.8636V6.02273C13.8636 5.45818 13.4054 5 12.8409 5H12.1591C11.5945 5 11.1364 5.45818 11.1364 6.02273V11.1364H6.02273C5.45818 11.1364 5 11.5945 5 12.1591V12.8409C5 13.4054 5.45818 13.8636 6.02273 13.8636H11.1364V18.9772C11.1364 19.5418 11.5945 20 12.1591 20H12.8409C13.4054 20 13.8636 19.5418 13.8636 18.9772V13.8636H18.9772C19.5418 13.8636 20 13.4054 20 12.8409V12.1591C20 11.5945 19.5418 11.1364 18.9772 11.1364Z"
//         fill="#506D85"
//       />
//     </g>
//     <defs>
//       <clipPath id="clip0">
//         <rect
//           width="15"
//           height="15"
//           fill="white"
//           transform="translate(5 5)"
//         />
//       </clipPath>
//     </defs>
//   </svg>
// </div>

// <div className="SearchGroupView">
//   <div className="SearchGroupInputView">
//     <div className="SearchGroupIcon">
//       <svg
//         width="19"
//         height="18"
//         viewBox="0 0 19 18"
//         fill="none"
//         xmlns="http://www.w3.org/2000/svg"
//       >
//         <path
//           d="M8.36713 0C3.89981 0 0.265137 3.55609 0.265137 7.92682C0.265137 12.2978 3.89981 15.8536 8.36713 15.8536C12.8347 15.8536 16.4691 12.2978 16.4691 7.92682C16.4691 3.55609 12.8347 0 8.36713 0ZM8.36713 14.3903C4.72448 14.3903 1.76089 11.4908 1.76089 7.92686C1.76089 4.36296 4.72448 1.46341 8.36713 1.46341C12.0098 1.46341 14.9734 4.36293 14.9734 7.92682C14.9734 11.4907 12.0098 14.3903 8.36713 14.3903Z"
//           fill="#506D85"
//         />
//         <path
//           d="M18.4437 16.7511L14.1559 12.5559C13.8637 12.2701 13.3906 12.2701 13.0984 12.5559C12.8062 12.8416 12.8062 13.305 13.0984 13.5906L17.3862 17.7857C17.5323 17.9286 17.7235 18.0001 17.915 18.0001C18.1062 18.0001 18.2976 17.9286 18.4437 17.7857C18.7359 17.5001 18.7359 17.0367 18.4437 16.7511Z"
//           fill="#506D85"
//         />
//       </svg>
//     </div>
//     <input className="SearchGroupInput" placeholder="Search..." />
//   </div>
// </div>

// <div className="GroupListView">
//   <div className="GroupParentView">
//     <div className="GroupParentViewInside">
//       <svg
//         style={{ marginLeft: "20px" }}
//         width="7"
//         height="7"
//         viewBox="0 0 7 7"
//         fill="none"
//         xmlns="http://www.w3.org/2000/svg"
//       >
//         <path
//           d="M4.15001 5.74127L6.81188 1.85304C6.93489 1.67348 7 1.49255 7 1.34217C7 1.05143 6.76666 0.871582 6.37608 0.871582L0.623012 0.871582C0.232886 0.871582 0 1.0512 0 1.34126C0 1.49187 0.0651627 1.66991 0.188519 1.84987L2.85033 5.73991C3.02179 5.99008 3.25252 6.12862 3.50031 6.12862C3.74793 6.12868 3.97861 5.99172 4.15001 5.74127Z"
//           fill="#2C385C"
//         />
//       </svg>

//             <p>Science</p>
//     </div>
//     <div className="GroupChildView">
//       <p>Mid Term</p>
//     </div>
//     <div className="GroupChildView">
//       <p>Recently Added</p>
//     </div>
//   </div>

//   <div className="GroupParentView">
//     <div className="GroupParentViewInside">
//       <svg
//         style={{ marginLeft: "20px" }}
//         width="7"
//         height="7"
//         viewBox="0 0 7 7"
//         fill="none"
//         xmlns="http://www.w3.org/2000/svg"
//       >
//         <path
//           d="M4.15001 5.74127L6.81188 1.85304C6.93489 1.67348 7 1.49255 7 1.34217C7 1.05143 6.76666 0.871582 6.37608 0.871582L0.623012 0.871582C0.232886 0.871582 0 1.0512 0 1.34126C0 1.49187 0.0651627 1.66991 0.188519 1.84987L2.85033 5.73991C3.02179 5.99008 3.25252 6.12862 3.50031 6.12862C3.74793 6.12868 3.97861 5.99172 4.15001 5.74127Z"
//           fill="#2C385C"
//         />
//       </svg>

//       <p>Maths</p>
//     </div>
//     <div className="GroupChildView">
//       <p>class 5th</p>
//     </div>
//     <div className="GroupChildView">
//       <p>Recently Added</p>
//     </div>
//   </div>

//   <div className="GroupParentView">
//     <div className="GroupParentViewInside">
//       <svg
//         style={{ marginLeft: "20px" }}
//         width="7"
//         height="7"
//         viewBox="0 0 7 7"
//         fill="none"
//         xmlns="http://www.w3.org/2000/svg"
//       >
//         <path
//           d="M4.15001 5.74127L6.81188 1.85304C6.93489 1.67348 7 1.49255 7 1.34217C7 1.05143 6.76666 0.871582 6.37608 0.871582L0.623012 0.871582C0.232886 0.871582 0 1.0512 0 1.34126C0 1.49187 0.0651627 1.66991 0.188519 1.84987L2.85033 5.73991C3.02179 5.99008 3.25252 6.12862 3.50031 6.12862C3.74793 6.12868 3.97861 5.99172 4.15001 5.74127Z"
//           fill="#2C385C"
//         />
//       </svg>

//       <p>English</p>
//     </div>
//     <div className="GroupChildView">
//       <p>First UT</p>
//     </div>
//     <div className="GroupChildView">
//       <p>Recently Added</p>
//     </div>
//   </div>
// </div>
//     </div>
//   );
// };

// export default ResultSideBar;

import React, { useState, useLayoutEffect } from "react";
import "../../../css/Result/Sidebar/ResultSideBar.css";

import Tree from "../../Tree/Tree";
import {
  AiOutlineFolderAdd,
  AiOutlineFileAdd,
  AiOutlineFolder,
  AiOutlineFolderOpen,
  AiOutlineDelete,
  AiOutlineEdit,
} from "react-icons/ai";
import { ActionsWrapper } from "../../Tree/Tree.style";

import { FILE, FOLDER } from "../../Tree/state/constants";
import { useTreeContext } from "../../Tree/state/TreeContext";
import { PlaceholderInput } from "../../Tree/TreePlaceholderInput";
import axios from "axios";
import {URL} from "../../../URL/URL"

import { ToastContainer, toast } from "react-toastify";

const structure = [
  {
    type: "folder",
    name: "SCIENCE",
    subjectId: "FUCJU",
    files: [
      {
        type: "folder",
        name: "ui",
        subjectId: "FUCJU",
        files: [
          { type: "file", name: "Toggle.js" },
          { type: "file", name: "Button.js" },
          { type: "file", name: "Button.style.js" },
        ],
      },
      {
        type: "folder",
        name: "components",
        files: [
          { type: "file", name: "Tree.js" },
          { type: "file", name: "Tree.style.js" },
        ],
      },
      { type: "file", name: "setup.js" },
      { type: "file", name: "setupTests.js" },
    ],
  },
  // {
  //   type: "folder",
  //   name: "packages",
  //   files: [
  //     {
  //       type: "file",
  //       name: "main.js",
  //     },
  //   ],
  // },

  // { type: "file", name: "index.js" },
];

const DATA = [
  {
    _id: "618a6b5675994aa8b2516a2e",
    id: "ac9352cd-2f99-47f3-93cc-e754bf328f5b",
    parentId: "0",
    subjectId: "1a08bf9b-06b0-4531-aae5-315736fd5347",
    schId: "60746fc3-0178-4090-8923-e30bca13e2e5",
    type: "folder",
    name: "FOLDER 2",
    createdAt: "2021-11-09T12:36:38.602Z",
    __v: 0,
    files: []
},
{
    _id: "618a6b6d75994aa8b2516a2f",
    id: "e5d2c098-7eba-4232-ba33-330a18d8b262",
    parentId: "0",
    subjectId: "1a08bf9b-06b0-4531-aae5-315736fd5347",
    schId: "60746fc3-0178-4090-8923-e30bca13e2e5",
    type: "file",
    name: "FOLDER 2",
    createdAt: "2021-11-09T12:37:01.188Z",
    __v: 0,
    files: []
}
]

export default function ResultSideBar({urlData}) {

  const parsedQuery = JSON.parse(urlData)

  let TOKEN = localStorage.getItem("access_token");

  const { dispatch, isImparative, onNodeClick } = useTreeContext();

  let [data, setData] = useState([]);
  let [Loading, setLoading] = useState(true);


  const handleClick = (node) => {
    console.log(node);
  };
  const handleUpdate = (state) => {
    localStorage.setItem(
      "tree",
      JSON.stringify(state, function (key, value) {
        if (key === "parentNode" || key === "id") {
          return null;
        }
        return value;
      })
    );
  };

  useLayoutEffect(() => {
    try {
      // let savedStructure = JSON.parse(localStorage.getItem("tree"));
      // if (savedStructure) {
      //   console.log(savedStructure);

      // }
      FetchRow();
      // setData(data);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const FetchRow = async () => {
    await axios({
      method: "get", //you can set what request you want to be
      url: `${URL}/result/files/folders?subjectId=${parsedQuery?.subjectId}&nested=true`,
      headers: {
        Authorization: "Bearer " + TOKEN,
      },
    }).then(({ data }) => {
      console.log(data.payload);
      if (data.status == 200) {
        

        setLoading(false);
         setData([data.payload.data]);
      } else {
        setLoading(false);
        return toast.error("Something went wrong", {
          position: "bottom-left",
          autoClose: 3000,
        });
      }
    }).catch((error)=>{
      toast.error("Something went wrong", {
        position: "top-right",
        autoClose: 3000,
      });
      console.log(error);
    })
  };

  const commitFolderCreation = () => {
    dispatch({ type: FOLDER.CREATE, payload: { id: "l", name: "yes" } });
  };
  return (
    <div className="ResultSidebar">
         <ToastContainer   />
      <div className="GroupView">
        <ActionsWrapper>
          <p>All Lists</p>
          <div className="actions" style={{ opacity: 1 }}>
            <AiOutlineFileAdd
              size={18}
              //  onClick={handleFileCreation}
            />
            <AiOutlineFolderAdd
              onClick={commitFolderCreation}
              size={20}

              // onClick={handleFolderCreation}
            />
          </div>
        </ActionsWrapper>
      </div>

      <div className="SearchGroupView">
        <div className="SearchGroupInputView">
          <div className="SearchGroupIcon">
            <svg
              width="19"
              height="18"
              viewBox="0 0 19 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.36713 0C3.89981 0 0.265137 3.55609 0.265137 7.92682C0.265137 12.2978 3.89981 15.8536 8.36713 15.8536C12.8347 15.8536 16.4691 12.2978 16.4691 7.92682C16.4691 3.55609 12.8347 0 8.36713 0ZM8.36713 14.3903C4.72448 14.3903 1.76089 11.4908 1.76089 7.92686C1.76089 4.36296 4.72448 1.46341 8.36713 1.46341C12.0098 1.46341 14.9734 4.36293 14.9734 7.92682C14.9734 11.4907 12.0098 14.3903 8.36713 14.3903Z"
                fill="#506D85"
              />
              <path
                d="M18.4437 16.7511L14.1559 12.5559C13.8637 12.2701 13.3906 12.2701 13.0984 12.5559C12.8062 12.8416 12.8062 13.305 13.0984 13.5906L17.3862 17.7857C17.5323 17.9286 17.7235 18.0001 17.915 18.0001C18.1062 18.0001 18.2976 17.9286 18.4437 17.7857C18.7359 17.5001 18.7359 17.0367 18.4437 16.7511Z"
                fill="#506D85"
              />
            </svg>
          </div>
          <input className="SearchGroupInput" placeholder="Search..." />
        </div>
      </div>

      <div
        style={{
          width: "100%",
          height: "calc(100% - 120px)",
          overflowY: "scroll",
          paddingBottom: "20%",
        }}
      >
        <Tree data={data} onUpdate={handleUpdate} onNodeClick={handleClick} urlData={urlData}/>
      </div>
    </div>
  );
}
