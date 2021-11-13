import React, {
  useReducer,
  useLayoutEffect,
  useState,
  useCallback,
} from "react";
import { v4 } from "uuid";
import { ThemeProvider } from "styled-components";

import { useDidMountEffect } from "./utils";
import { TreeContext, reducer } from "./state";

import { StyledTree } from "../Tree/Tree.style";
import { Folder } from "../Tree/Folder/TreeFolder";
import { File } from "../Tree/File/TreeFile";
import { Button, Form, Modal } from "react-bootstrap";
import { PulseLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";

import { css } from "@emotion/react";
import { URL } from "../../URL/URL";
import axios from "axios";
import { FOLDER } from "./state/constants";
const { v4: uuidv4 } = require("uuid");

const Loadercss = css`
  display: block;
  border-color: red;
`;

const Tree = ({ children, data, onNodeClick, onUpdate, urlData }) => {
  const parsedQuery = JSON.parse(urlData);
  let TOKEN = localStorage.getItem("access_token");

  const [state, dispatch] = useReducer(reducer, data);
  const [ModalVisible, setModalVisible] = useState(false);
  const [DeleteValue, setDeleteValue] = useState("");
  const [ConfirmDeleteValue, setConfirmDeleteValue] = useState(null);
  const [confirmDelete, setconfirmDelete] = useState(false);
  const [DeleteId, setDeleteId] = useState(null);
  const [DeleteLoader, setDeleteLoader] = useState(false);


  useLayoutEffect(() => {
    dispatch({ type: "SET_DATA", payload: data });
  }, [data]);

  useDidMountEffect(() => {
    onUpdate && onUpdate(state);
  }, [state]);

  const isImparative = data && !children;

  const OpenDeleteModal = useCallback(
    (value, id) => {
      setConfirmDeleteValue(value);
      setDeleteId(id);
      setModalVisible(true);
    },
    [
      setDeleteValue,
      setConfirmDeleteValue,
      setconfirmDelete,
      setDeleteId,
      DeleteId,
      setModalVisible,
    ]
  );

  const ConfirmDelete = useCallback(
    (e) => {
      e.preventDefault();
      setDeleteLoader(true)
      setconfirmDelete({ id: DeleteId });
    },
    [
      setDeleteValue,
      DeleteId,
      setDeleteLoader,
      setConfirmDeleteValue,
      setconfirmDelete,
      setDeleteId,
      setModalVisible,
    ]
  );

  const ResetDelete = useCallback(() => {
    setDeleteValue("");
    setConfirmDeleteValue(null);
    setconfirmDelete(null);
    setDeleteId(null);
    setModalVisible(false);
    setDeleteLoader(false)
  }, [
    setDeleteValue,
    setDeleteLoader,
    setConfirmDeleteValue,
    setconfirmDelete,
    setDeleteId,
    setModalVisible,
  ]);

  return (
    <ThemeProvider theme={{ indent: 20 }}>
      <TreeContext.Provider
        value={{
          isImparative,
          state,
          dispatch,
          onNodeClick: (node) => {
            onNodeClick && onNodeClick(node);
          },
        }}
      >
        <StyledTree>
          {isImparative ? (
            <TreeRecusive
              data={state}
              OpenDeleteModal={OpenDeleteModal}
              ConfirmDelete={confirmDelete}
              ResetDelete={ResetDelete}
              parentNode={state}
              urlData={urlData}
            />
          ) : (
            children
          )}
        </StyledTree>
      </TreeContext.Provider>

      <MyVerticallyCenteredModal
        show={ModalVisible}
        onHide={ResetDelete}
        Value={DeleteValue}
        ConfirmValue={ConfirmDeleteValue}
        setValue={(e) => {
          setDeleteValue(e.target.value);
        }}
        HandleSubmitForm={(e) => ConfirmDelete(e)}
        Loader={DeleteLoader}
      />
    </ThemeProvider>
  );
};

const TreeRecusive = React.memo(
  ({
    data,
    parentNode,
    urlData,
    OpenDeleteModal,
    ConfirmDelete,
    ResetDelete,
  }) => {
    return data.map((item) => {
      item.parentNode = parentNode;
      if (!parentNode) {
        item.parentNode = data;
      }
      if (!item.id) item.id = v4();

      if (item.type === "file") {
        return (
          <File
            urlData={urlData}
            OpenDeleteModal={OpenDeleteModal}
            key={item.id}
            id={item.id}
            ResetDelete={ResetDelete}
            ConfirmDelete={ConfirmDelete}
            name={item.name}
            node={item}
          />
        );
      }
      if (item.type === "folder") {
        return (
          <Folder
            urlData={urlData}
            key={item.id}
            id={item.id}
            name={item.name}
            ResetDelete={ResetDelete}
            ConfirmDelete={ConfirmDelete}
            OpenDeleteModal={OpenDeleteModal}
            node={item}
          >
            <TreeRecusive
              urlData={urlData}
              ConfirmDelete={ConfirmDelete}
              ResetDelete={ResetDelete}
              OpenDeleteModal={OpenDeleteModal}
              parentNode={item}
              data={item.files}
            />
          </Folder>
        );
      }
    });
  }
);

Tree.File = File;
Tree.Folder = Folder;

function MyVerticallyCenteredModal(props) {
  return (
    <Modal {...props} onHide={props.onHide}>
      <Modal.Header closeButton>
        <Modal.Title style={{ fontSize: 20 }}>Confirm Delete</Modal.Title>
      </Modal.Header>
      <Form  onSubmit={(e)=>props.HandleSubmitForm(e)} >
      <Modal.Body style={{ paddingTop: 5 }}>

        <Form.Group  className="mb-0 mt-0 " controlId="ModalInputFormView">
          <Form.Label className="font-weight-light">
            <p style={{ fontWeight: 100, color: "#6c757d" }}>
              To{" "}
              <span style={{ fontWeight: "bold", color: "black" }}>
                delete
              </span>{" "}
              file please type file name{" "}
              <span style={{ fontWeight: "bold", color: "black" }}>
                {props.ConfirmValue}
              </span>
            </p>
          </Form.Label>
          <div style={{ width: "100%" }}>
            <Form.Control
            autoFocus={true}
              name="text"
              type="text"
              autoComplete="off"
              className="Input"
              placeholder={`Type ${props.ConfirmValue}`}
              value={props.Value}
              onChange={(e) => {
                props.setValue(e);
              }}
              required
            />
          </div>
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="light" onClick={props.onHide}>
          Close
        </Button>
        <Button
          variant="danger"
          disabled={props.Value == props.ConfirmValue ? props.Loader : true}
          style={{ opacity: props.Value == props.ConfirmValue ? props.Loader ? 0.5 : 1 : 0.5 }}
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
              <p>Confirm</p>
            )}
        
        </Button>
      </Modal.Footer>
      </Form>
    </Modal>

   

  );
}

export default Tree;
