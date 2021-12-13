import React, { useCallback, useEffect, useState } from "react";
import { styled, keyframes } from "@stitches/react";
import { violet, mauve, blackA } from "@radix-ui/colors";
import {
  HamburgerMenuIcon,
  DotFilledIcon,
  CheckIcon,
  ChevronRightIcon,
  ChevronDownIcon,
} from "@radix-ui/react-icons";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { Button, Form, Modal } from "react-bootstrap";
import { PulseLoader } from "react-spinners";
import { css } from "@emotion/react";
import axios from "axios";
import { URL } from "../../../URL/URL";
import toast, { Toaster } from 'react-hot-toast';


const slideUpAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateY(2px)" },
  "100%": { opacity: 1, transform: "translateY(0)" },
});

const slideRightAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateX(-2px)" },
  "100%": { opacity: 1, transform: "translateX(0)" },
});

const slideDownAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateY(-2px)" },
  "100%": { opacity: 1, transform: "translateY(0)" },
});

const slideLeftAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateX(2px)" },
  "100%": { opacity: 1, transform: "translateX(0)" },
});

const StyledContent = styled(DropdownMenuPrimitive.Content, {
  minWidth: 220,
  backgroundColor: "white",
  borderRadius: 6,
  padding: 5,
  border: "1px solid rgba(22, 23, 24, 0.2)",
  "@media (prefers-reduced-motion: no-preference)": {
    animationDuration: "400ms",
    animationTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
    willChange: "transform, opacity",
    '&[data-state="open"]': {
      '&[data-side="top"]': { animationName: slideDownAndFade },
      '&[data-side="right"]': { animationName: slideLeftAndFade },
      '&[data-side="bottom"]': { animationName: slideUpAndFade },
      '&[data-side="left"]': { animationName: slideRightAndFade },
    },
  },
});

const itemStyles = {
  all: "unset",
  fontSize: 13,
  lineHeight: 1,
  color: "#4B5563",
  borderRadius: 3,
  display: "flex",
  alignItems: "center",
  height: 25,
  padding: "0 5px",
  position: "relative",
  paddingLeft: 25,
  userSelect: "none",
  cursor:"pointer",

  "&[data-disabled]": {
    color: "#4B5563",
    pointerEvents: "none",
  },

  "&:focus": {
    backgroundColor: "#00000011",
    color: "#4B5563",
  },
};

const StyledItem = styled(DropdownMenuPrimitive.Item, { ...itemStyles });
const StyledCheckboxItem = styled(DropdownMenuPrimitive.CheckboxItem, {
  ...itemStyles,
});
const StyledRadioItem = styled(DropdownMenuPrimitive.RadioItem, {
  ...itemStyles,
});
const StyledTriggerItem = styled(DropdownMenuPrimitive.TriggerItem, {
  '&[data-state="open"]': {
    backgroundColor: violet.violet4,
    color: violet.violet11,
  },
  ...itemStyles,
});

const StyledLabel = styled(DropdownMenuPrimitive.Label, {
  paddingLeft: 25,
  fontSize: 12,
  lineHeight: "25px",
  color: mauve.mauve11,
});

const StyledSeparator = styled(DropdownMenuPrimitive.Separator, {
  height: 1,
  backgroundColor: violet.violet6,
  margin: 5,
});

const StyledItemIndicator = styled(DropdownMenuPrimitive.ItemIndicator, {
  position: "absolute",
  left: 0,
  width: 25,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
});

const StyledArrow = styled(DropdownMenuPrimitive.Arrow, {
  fill: "white",
});

// Exports
export const DropdownMenu = DropdownMenuPrimitive.Root;
export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
export const DropdownMenuContent = StyledContent;
export const DropdownMenuItem = StyledItem;
export const DropdownMenuCheckboxItem = StyledCheckboxItem;
export const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;
export const DropdownMenuRadioItem = StyledRadioItem;
export const DropdownMenuItemIndicator = StyledItemIndicator;
export const DropdownMenuTriggerItem = StyledTriggerItem;
export const DropdownMenuLabel = StyledLabel;
export const DropdownMenuSeparator = StyledSeparator;
export const DropdownMenuArrow = StyledArrow;

// Your app...
const Box = styled("div", {cursor:"pointer"});

const RightSlot = styled("div", {
  marginLeft: "auto",
  paddingLeft: 20,
  color: mauve.mauve11,
  ":focus > &": { color: "white" },
  "[data-disabled] &": { color: mauve.mauve8 },
});

const IconButton = styled("button", {
  all: "unset",
  fontFamily: "inherit",
  borderRadius: "100%",
  height: 35,
  width: 35,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  color: violet.violet11,
  // backgroundColor: 'white',
  // boxShadow: `0 2px 10px ${blackA.blackA7}`,
  "&:hover": { backgroundColor: "#00000014" },
  // '&:focus': { boxShadow: `0 0 0 2px black` },
});

const Loadercss = css`
  display: block;
  border-color: red;
`;

export const RadixMenu = React.memo(({ column, FileId, DeleteColumn,openColumnEdit }) => {
  const [bookmarksChecked, setBookmarksChecked] = React.useState(true);
  const [urlsChecked, setUrlsChecked] = React.useState(false);
  const [person, setPerson] = React.useState("pedro");
  const [showDeleteColumn, setshowDeleteColumn] = React.useState(false);

  const [Loader, setLoader] = React.useState(false);

  let TOKEN = localStorage.getItem("access_token");


  
  
  const DeleteColumnModal = useCallback(() => {
    setshowDeleteColumn(true);
  }, [setshowDeleteColumn, setLoader, column, FileId]);

  const PostDeleteColumm = useCallback(async () => {
    setLoader(true);

    const Payload = {
      columnId: column.colId,
      docId: column.userProvidedColDef.headerComponentParams.FileId,
    };

    await axios({
      method: "post", //you can set what request you want to be
      url: `${URL}/excel/column/delete`,
      headers: {
        Authorization: "Bearer " + TOKEN,
      },
      data: Payload,
    }).then(({ data }) => {
      if (data.status != 200) {
        setLoader(false);
        setshowDeleteColumn(false);
        return toast.error(data.message);
      }
      setshowDeleteColumn(false);
      setLoader(false);

      DeleteColumn({
        colId: column.colId,
        params: column.userProvidedColDef.headerComponentParams,
      });
      return toast.success(data.message);
    });
  }, [column, FileId, setLoader, setshowDeleteColumn]);

  return (
    <Box>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <IconButton aria-label="Customise options">
            <ChevronDownIcon color={"grey"} width={22} height={22} />
          </IconButton>
        </DropdownMenuTrigger>

        <DropdownMenuContent sideOffset={5}>
          <DropdownMenuCheckboxItem
            checked={bookmarksChecked}
            color={"red"}
            onCheckedChange={setBookmarksChecked}
            onClick={()=>openColumnEdit(column.userProvidedColDef.headerComponentParams)}
          >
            <DropdownMenuItemIndicator  >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="sbui-icon "
              >
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
              </svg>
            </DropdownMenuItemIndicator>
            Edit Column
          </DropdownMenuCheckboxItem>

          <DropdownMenu>
            <DropdownMenuTriggerItem>
              More Tools
              <RightSlot>
                <ChevronRightIcon />
              </RightSlot>
            </DropdownMenuTriggerItem>
            <DropdownMenuContent sideOffset={2} alignOffset={-5}>
              <DropdownMenuItem>
                Save Page As… <RightSlot>⌘+S</RightSlot>
              </DropdownMenuItem>
              <DropdownMenuItem>Create Shortcut…</DropdownMenuItem>
              <DropdownMenuItem>Name Window…</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Developer Tools</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenuSeparator />

          <DropdownMenuRadioGroup
            onClick={() => DeleteColumnModal()}
            value={person}
            onValueChange={setPerson}
          >
            <DropdownMenuRadioItem value="pedro">
              <DropdownMenuItemIndicator>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="red"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="sbui-icon "
                >
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
              </DropdownMenuItemIndicator>

              <span style={{ color: "#f65e72" }}>Delete Column</span>
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
          <DropdownMenuArrow />
        </DropdownMenuContent>
      </DropdownMenu>
      <MyVerticallyCenteredModal
        show={showDeleteColumn}
        onHide={() => setshowDeleteColumn(false)}
        Loader={Loader}
        column={column}
        HandleSubmitForm={PostDeleteColumm}
      />
    </Box>
  );
});

function MyVerticallyCenteredModal(props) {
  return (
    <Modal {...props} centered onHide={props.onHide}>
      <Modal.Header style={{ border: 0 }}>
        <Modal.Title style={{ fontSize: 20 }}>Delete Column</Modal.Title>
      </Modal.Header>

      <Modal.Body style={{ paddingTop: 5 }}>
        <Form.Group className="mb-0 mt-0 " controlId="ModalInputFormView">
          <Form.Label className="font-weight-light">
            <p style={{ fontWeight: 100, fontSize: 18, color: "#6c757d" }}>
              Are you sure want to{" "}
              <span style={{ fontWeight: "bold", color: "black" }}>delete</span>{" "}
              column{" "}
              <span style={{ fontWeight: "bold", color: "black" }}>
                {props.column.colDef.headerName}
              </span>
            </p>
          </Form.Label>
          <div style={{ width: "100%" }}></div>
        </Form.Group>
      </Modal.Body>
      <Modal.Footer style={{ border: 0 }}>
        <Button variant="light" onClick={props.onHide}>
          Cancel
        </Button>
        <Button
          variant="danger"
          disabled={props.Loader}
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
            <p>Delete</p>
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default RadixMenu;
