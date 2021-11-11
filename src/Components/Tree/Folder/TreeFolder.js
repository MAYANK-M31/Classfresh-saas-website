import React, { useState, useEffect } from "react";
import {
  AiOutlineFolderAdd,
  AiOutlineFileAdd,
  AiOutlineFolder,
  AiOutlineFolderOpen,
  AiOutlineDelete,
  AiOutlineEdit,
} from "react-icons/ai";

import { ReactComponent as FolderClose } from "../../../Assets/Logos/Folder.svg";
import { ReactComponent as FolderOpen } from "../../../Assets/Logos/FolderOpen.svg";

import {
  ActionsWrapper,
  Collapse,
  StyledName,
  VerticalLine,
} from "../../Tree/Tree.style";
import { StyledFolder } from "./TreeFolder.style";

import { FILE, FOLDER } from "../../Tree/state/constants";
import { useTreeContext } from "../../Tree/state/TreeContext";
import { PlaceholderInput } from "../../Tree/TreePlaceholderInput";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import {URL} from "../../../URL/URL"
const { v4: uuidv4 } = require("uuid");


const FolderName = ({ isOpen, name, handleClick, handleRename },props) => (
  <StyledName onClick={handleClick} onDoubleClick={handleRename}>
    <div style={{ width: 20 }}>
      {isOpen ? <FolderOpen /> : <FolderClose />}{" "}
    </div>
    &nbsp;&nbsp;
    <div style={{ width: "100%", overflow: "hidden" }}>{name}</div>
  </StyledName>
);

const Folder = ({ id, name, children, node, urlData },props) => {
  
  const parsedQuery = JSON.parse(urlData);
  let TOKEN = localStorage.getItem("access_token");


  
  const { dispatch, isImparative, onNodeClick } = useTreeContext();
  const [isEditing, setEditing] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [childs, setChilds] = useState([]);

  const CreateNew = async ({name,type,subjectId,parentId,id}) => {
    const Body = {
      name: name,
      filetype: type,
      subjectId: subjectId,
      parentId: parentId,
      id:id
    };

    await axios({
      method: "post", //you can set what request you want to be
      url: `${URL}/result/file/create`,
      headers: {
        Authorization: "Bearer " + TOKEN,
      },
      data: Body,
    })
      .then((res) => {
        if (res.data.status == 200) {
          toast.success("New File Created Successfully ", {
            position: "top-right",
            autoClose: 3000,
          });
        } else {
          alert(JSON.stringify(res.data))
          toast.warning(res.data.message, {
            position: "top-right",
            autoClose: 3000,
          });
        }
      })
      .catch((err) => {
        
        toast.error("Something went wrong", {
          position: "top-right",
          autoClose: 3000,
        });
        console.log(err);
      });
  };

  useEffect(() => {
    setChilds([children]);
  }, [children]);

  const commitFolderCreation = (name) => {
    if (name.length == 0) return alert("FOLDER NAME CANNNOT BE EMPTY");
    // console.log("PARENT NODE", node);
    
    const RandomId = uuidv4();
    CreateNew({name,type:"folder",subjectId:parsedQuery.subjectId,parentId:node.id == "000000-0000-0000-0000-0000000000" ? "0" : node.id ,id:RandomId })
    dispatch({ type: FOLDER.CREATE, payload: { id,Customid:RandomId, name,parentId:node.parentId ,subjectId:parsedQuery.subjectId} });
  };
  const commitFileCreation = (name) => {
    const RandomId = uuidv4();
    CreateNew({name,type:"file",subjectId:parsedQuery.subjectId,parentId:node.id == "000000-0000-0000-0000-0000000000" ? "0" : node.id ,id:RandomId })
    dispatch({ type: FILE.CREATE, payload: { id,Customid:RandomId, name,parentId:node.parentId ,subjectId:parsedQuery.subjectId} });
    // dispatch({ type: FILE.CREATE, payload: { id, name } });
  };
  const commitDeleteFolder = () => {
    dispatch({ type: FOLDER.DELETE, payload: { id } });
  };
  const commitFolderEdit = (name) => {
    dispatch({ type: FOLDER.EDIT, payload: { id, name } });
    setEditing(false);
  };

  const handleCancel = () => {
    setEditing(false);
    setChilds([children]);
  };

  const handleNodeClick = React.useCallback(
    (event) => {
      console.log(node);
      event.stopPropagation();
    },
    [node]
  );

  const handleFileCreation = (event) => {
    event.stopPropagation();
    setIsOpen(true);
    setChilds([
      ...childs,
      <PlaceholderInput
        type="file"
        onSubmit={commitFileCreation}
        onCancel={handleCancel}
      />,
    ]);
  };

  const handleFolderCreation = (event) => {
    event.stopPropagation();
    setIsOpen(true);
    setChilds([
      ...childs,
      <PlaceholderInput
        type="folder"
        onSubmit={commitFolderCreation}
        onCancel={handleCancel}
      />,
    ]);
  };

  const handleFolderRename = () => {
    setIsOpen(true);
    setEditing(true);
  };

  return (
    <StyledFolder id={id} onClick={handleNodeClick} className="tree__folder">
      <ToastContainer />

      <VerticalLine>
        <ActionsWrapper
          style={{ backgroundColor: isEditing ? "#0076fe1a" : "transparent" }}
        >
          {isEditing ? (
            <PlaceholderInput
              type="folder"
              style={{ paddingLeft: 0 }}
              defaultValue={name}
              onCancel={handleCancel}
              onSubmit={commitFolderEdit}
            />
          ) : (
            <FolderName
              handleRename={handleFolderRename}
              name={name}
              isOpen={isOpen}
              handleClick={() => setIsOpen(!isOpen)}
            />
          )}

          {!isEditing && isImparative && (
            <div className="actions">
              <AiOutlineEdit onClick={handleFolderRename} />
              <AiOutlineFileAdd onClick={handleFileCreation} />
              <AiOutlineFolderAdd onClick={handleFolderCreation} />
              <AiOutlineDelete onClick={commitDeleteFolder} />
            </div>
          )}
        </ActionsWrapper>
        <Collapse className="tree__folder--collapsible" isOpen={isOpen}>
          {childs}
        </Collapse>
      </VerticalLine>
    </StyledFolder>
  );
};

export { Folder, FolderName };
