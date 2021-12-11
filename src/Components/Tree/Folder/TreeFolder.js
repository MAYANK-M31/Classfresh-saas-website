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
import { Toaster, toast } from "react-hot-toast";
import { URL } from "../../../URL/URL";
import { Button, Modal } from "react-bootstrap";
const { v4: uuidv4 } = require("uuid");

const TOP_PARENT_ID = "000000-0000-0000-0000-0000000000";

const FolderName = ({ isOpen, name, handleClick, handleRename }) => (
  <StyledName
    onClick={handleClick}
    // onDoubleClick={()=>
    //   id !== TOP_PARENT_ID ? handleRename : null
    // }
  >
    <div style={{ width: 20 }}>
      {isOpen ? <FolderOpen /> : <FolderClose />}{" "}
    </div>
    &nbsp;&nbsp;
    <div style={{ width: "100%", overflow: "hidden" }}>{name}</div>
  </StyledName>
);

const Folder = ({
  id,
  name,
  children,
  node,
  urlData,
  OpenDeleteModal,
  ConfirmDelete,
  ResetDelete,
}) => {
  const parsedQuery = JSON.parse(urlData);
  let TOKEN = localStorage.getItem("access_token");

  const { dispatch, isImparative, onNodeClick } = useTreeContext();
  const [isEditing, setEditing] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [childs, setChilds] = useState([]);

  useEffect(() => {
    if (ConfirmDelete?.id == id) {
      DeleteFolder({ subjectId: parsedQuery.subjectId, id: id });
    }
    console.log(ConfirmDelete?.id, "ID");
  }, [ConfirmDelete]);

  const CreateNew = async ({ name, type, subjectId, parentId, id }) => {
    const Body = {
      name: name,
      filetype: type,
      subjectId: subjectId,
      parentId: parentId,
      id: id,
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
            position: "top-center",
            duration: 3000,
            
          });
        } else {
          if (type == "folder") {
            dispatch({ type: FOLDER.DELETE, payload: { id } });
          } else {
            dispatch({ type: FILE.DELETE, payload: { id } });
          }
          toast.error(res.data.message, {
            position: "top-center",
            duration: 3000,
          });
        }
      })
      .catch((err) => {
        toast.error("Something went wrong. Failed to create", {
          position: "top-center",
          duration: 3000,
        });
        if (type == "folder") {
          dispatch({ type: FOLDER.DELETE, payload: { id } });
        } else {
          dispatch({ type: FILE.DELETE, payload: { id } });
        }
        console.log(err);
      });
  };

  const EditName = async ({ name, subjectId, id }) => {
    const Body = {
      name: name,
      subjectId: subjectId,
      id: id,
    };

    await axios({
      method: "post", //you can set what request you want to be
      url: `${URL}/result/file/edit`,
      headers: {
        Authorization: "Bearer " + TOKEN,
      },
      data: Body,
    })
      .then((res) => {
        if (res.data.status == 200) {
          dispatch({ type: FOLDER.EDIT, payload: { id, name } });
          setEditing(false);
          toast.success(res.data.message, {
            position: "top-center",
            duration: 3000,
          });
        } else {
          toast.error(res.data.message, {
            position: "top-center",
            duration: 3000,
          });
        }
      })
      .catch((err) => {
        toast.error("Something went wrong", {
          position: "top-center",
          duration: 3000,
        });
        console.log(err);
      });
  };

  const DeleteFolder = async ({ subjectId, id }) => {
    const Body = {
      subjectId: subjectId,
      id: id,
    };

    await axios({
      method: "post", //you can set what request you want to be
      url: `${URL}/result/file/delete`,
      headers: {
        Authorization: "Bearer " + TOKEN,
      },
      data: Body,
    })
      .then((res) => {
        if (res.data.status == 200) {
          dispatch({ type: FOLDER.DELETE, payload: { id } });
          toast.success(res.data.message, {
            position: "top-center",
            duration: 3000,
          });
          ResetDelete();
        } else {
          toast.error(res.data.message, {
            position: "top-center",
            duration: 3000,
          });
          ResetDelete();
        }
      })
      .catch((err) => {
        toast.error("Something went wrong", {
          position: "top-center",
          duration: 3000,
        });
        console.log(err);
        ResetDelete();
      });
  };

  useEffect(() => {
    if (id == TOP_PARENT_ID) {
      setIsOpen(true);
    }

    setChilds([children]);
  }, [children]);

  const commitFolderCreation = (name) => {
    if (name.length == 0) return alert("FOLDER NAME CANNNOT BE EMPTY");
    const RandomId = uuidv4();
    CreateNew({
      name,
      type: "folder",
      subjectId: parsedQuery.subjectId,
      parentId: node.id == TOP_PARENT_ID ? "0" : node.id,
      id: RandomId,
    });
    dispatch({
      type: FOLDER.CREATE,
      payload: {
        id,
        Customid: RandomId,
        name,
        parentId: node.parentId,
        subjectId: parsedQuery.subjectId,
      },
    });
  };

  const commitFileCreation = (name) => {
    const RandomId = uuidv4();
    CreateNew({
      name,
      type: "file",
      subjectId: parsedQuery.subjectId,
      parentId: node.id == TOP_PARENT_ID ? "0" : node.id,
      id: RandomId,
    });
    dispatch({
      type: FILE.CREATE,
      payload: {
        id,
        Customid: RandomId,
        name,
        parentId: node.parentId,
        subjectId: parsedQuery.subjectId,
      },
    });
    // dispatch({ type: FILE.CREATE, payload: { id, name } });
  };

  const commitDeleteFolder = () => {
    OpenDeleteModal(name, id);
  };

  const commitFolderEdit = (name) => {
    EditName({
      name,
      subjectId: parsedQuery.subjectId,
      id,
    });
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
      {/* <Toaster /> */}

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
            <div
              style={{
                opacity: id == TOP_PARENT_ID ? 1 : null,
              }}
              className="actions"
            >
              {id !== TOP_PARENT_ID && (
                <AiOutlineEdit onClick={handleFolderRename} />
              )}
              <AiOutlineFileAdd onClick={handleFileCreation} />
              <AiOutlineFolderAdd onClick={handleFolderCreation} />
              {id !== TOP_PARENT_ID && (
                <AiOutlineDelete onClick={commitDeleteFolder} />
              )}
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
