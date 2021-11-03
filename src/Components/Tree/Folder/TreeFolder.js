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

const FolderName = ({ isOpen, name, handleClick, handleRename }) => (
  <StyledName onClick={handleClick} onDoubleClick={handleRename}>
    <div style={{ width: 20 }}>  {isOpen ? <FolderOpen /> : <FolderClose />} </div>
    &nbsp;&nbsp;
    <div style={{ width: "100%", overflow: "hidden" }}>{name}</div>
  </StyledName>
);

const Folder = ({ id, name, children, node }) => {
  const { dispatch, isImparative, onNodeClick } = useTreeContext();
  const [isEditing, setEditing] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [childs, setChilds] = useState([]);

  useEffect(() => {
    setChilds([children]);
  }, [children]);

  const commitFolderCreation = (name) => {
    dispatch({ type: FOLDER.CREATE, payload: { id, name } });
  };
  const commitFileCreation = (name) => {
    dispatch({ type: FILE.CREATE, payload: { id, name } });
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
      event.stopPropagation();
      onNodeClick({ node });
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
