import React, { useEffect, useRef, useState } from "react";
import { AiOutlineFile, AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

import { StyledFile } from "./TreeFile.style";
import { useTreeContext } from "../../Tree/state/TreeContext";
import { ActionsWrapper, StyledName } from "../../Tree/Tree.style.js";
import { PlaceholderInput } from "../../Tree/TreePlaceholderInput";

import { FILE } from "../../Tree/state/constants";
import FILE_ICONS from "../../Tree/FileIcons";
import { ReactComponent as ExcelSheet } from "../../../Assets/Logos/xlsx.svg";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { URL } from "../../../URL/URL";
const { v4: uuidv4 } = require("uuid");

const File = ({
  id,
  name,
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
  const ext = useRef("");

  let splitted = name?.split(".");
  ext.current = splitted[splitted.length - 1];



  useEffect(() => {
    if (ConfirmDelete?.id == id) {
      DeleteFile({ subjectId: parsedQuery.subjectId, id: id });
    }
    console.log(ConfirmDelete?.id,"ID");

  }, [ConfirmDelete]);




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
          dispatch({ type: FILE.EDIT, payload: { id, name } });
          setEditing(false);
          toast.success(res.data.message, {
            position: "top-right",
            autoClose: 3000,
          });
        } else {
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

  const DeleteFile = async ({ subjectId, id }) => {
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
          dispatch({ type: FILE.DELETE, payload: { id } });
          toast.success(res.data.message, {
            position: "top-right",
            autoClose: 3000,
          });
          ResetDelete()
        } else {
          toast.warning(res.data.message, {
            position: "top-right",
            autoClose: 3000,
          });
          ResetDelete()
        }
      })
      .catch((err) => {
        toast.error("Something went wrong", {
          position: "top-right",
          autoClose: 3000,
        });
        ResetDelete()
        console.log(err);
      });
  };

  const toggleEditing = () => setEditing(!isEditing);

  const commitEditing = (name) => {
    EditName({
      name,
      subjectId: parsedQuery.subjectId,
      id,
    });
    // dispatch({ type: FILE.EDIT, payload: { id, name } });
    // setEditing(false);
  };

  const commitDelete = () => {
    OpenDeleteModal(name,id);
    // DeleteFile({ subjectId: parsedQuery.subjectId, id: id });

    // dispatch({ type: FILE.DELETE, payload: { id } });
  };

  const handleNodeClick = React.useCallback(
    (e) => {
      e.stopPropagation();
      onNodeClick({ node });
    },
    [node]
  );

  const handleCancel = () => {
    setEditing(false);
  };

  return (
    <StyledFile
      onClick={handleNodeClick}
      style={{ backgroundColor: isEditing ? "#0076fe1a" : "transparent" }}
      className="tree__file"
    >
      {isEditing ? (
        <PlaceholderInput
          type="file"
          style={{ paddingLeft: 0 }}
          defaultValue={name}
          onSubmit={commitEditing}
          onCancel={handleCancel}
        />
      ) : (
        <ActionsWrapper>
          <StyledName onDoubleClick={null}>
            {FILE_ICONS[ext.current] ? (
              <ExcelSheet width={18} height={18} />
            ) : (
              <ExcelSheet width={18} height={18} />
            )}
            &nbsp;&nbsp;
            <p>{name}</p>
          </StyledName>
          {isImparative && (
            <div className="actions">
              <AiOutlineEdit onClick={toggleEditing} />
              <AiOutlineDelete onClick={commitDelete} />
            </div>
          )}
        </ActionsWrapper>
      )}
    </StyledFile>
  );
};

export { File };
