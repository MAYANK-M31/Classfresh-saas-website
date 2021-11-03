import React, { useRef, useState } from "react";
import { AiOutlineFile, AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

import { StyledFile } from "./TreeFile.style";
import { useTreeContext } from "../../Tree/state/TreeContext";
import { ActionsWrapper, StyledName } from "../../Tree/Tree.style.js";
import { PlaceholderInput } from "../../Tree/TreePlaceholderInput";

import { FILE } from "../../Tree/state/constants";
import FILE_ICONS from "../../Tree/FileIcons";
import { ReactComponent as ExcelSheet } from "../../../Assets/Logos/xlsx.svg";

const File = ({ name, id, node }) => {
  const { dispatch, isImparative, onNodeClick } = useTreeContext();
  const [isEditing, setEditing] = useState(false);
  const ext = useRef("");

  let splitted = name?.split(".");
  ext.current = splitted[splitted.length - 1];

  const toggleEditing = () => setEditing(!isEditing);
  const commitEditing = (name) => {
    dispatch({ type: FILE.EDIT, payload: { id, name } });
    setEditing(false);
  };
  const commitDelete = () => {
    dispatch({ type: FILE.DELETE, payload: { id } });
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
        <div
          style={{
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
            display: "flex",
          }}
        >
          <PlaceholderInput
            type="file"
            style={{ paddingLeft: 0 }}
            defaultValue={name}
            onSubmit={commitEditing}
            onCancel={handleCancel}
          />
        </div>
      ) : (
        <ActionsWrapper>
          
          <StyledName

onDoubleClick={toggleEditing}
          >
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
