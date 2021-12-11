import React from "react";
import { styled, keyframes } from "@stitches/react";
import { violet, blackA, red, mauve } from "@radix-ui/colors";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";

const overlayShow = keyframes({
  "0%": { opacity: 0 },
  "100%": { opacity: 1 },
});

const contentShow = keyframes({
  "0%": { opacity: 0, transform: "translate(-50%, -48%) scale(.96)" },
  "100%": { opacity: 1, transform: "translate(-50%, -50%) scale(1)" },
});

const StyledOverlay = styled(AlertDialogPrimitive.Overlay, {
  backgroundColor: blackA.blackA9,
  position: "fixed",
  inset: 0,
  "@media (prefers-reduced-motion: no-preference)": {
    animation: `${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
  },
});

function Root({ children, ...props }) {
  return (
    <AlertDialogPrimitive.Root {...props}>
      <StyledOverlay />
      {children}
    </AlertDialogPrimitive.Root>
  );
}

const StyledContent = styled(AlertDialogPrimitive.Content, {
  backgroundColor: "white",
  borderRadius: 6,
  boxShadow:
    "hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px",
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90vw",
  maxWidth: "500px",
  maxHeight: "85vh",
  padding: 25,
  "@media (prefers-reduced-motion: no-preference)": {
    animation: `${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
  },
  "&:focus": { outline: "none" },
});

const StyledTitle = styled(AlertDialogPrimitive.Title, {
  margin: 0,
  color: mauve.mauve12,
  fontSize: 17,
  fontWeight: 500,
});

const StyledDescription = styled(AlertDialogPrimitive.Description, {
  marginBottom: 20,
  color: mauve.mauve11,
  fontSize: 15,
  lineHeight: 1.5,
});

// Exports
const AlertDialog = Root;
const AlertDialogTrigger = AlertDialogPrimitive.Trigger;
const AlertDialogContent = StyledContent;
const AlertDialogTitle = StyledTitle;
const AlertDialogDescription = StyledDescription;
const AlertDialogAction = AlertDialogPrimitive.Action;
const AlertDialogCancel = AlertDialogPrimitive.Cancel;

// Your app...
const Flex = styled("div", { display: "flex" });

const Button = styled("button", {
  all: "unset",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 5,
  border: "1px solid #00000014",
  padding: "0 15px",
  fontSize: 12,
  lineHeight: 1,
  fontWeight: "bold",
  height: 30,

  variants: {
    variant: {
      violet: {
        backgroundColor: "white",
        color: "#66749f",
        "&:hover": { backgroundColor: mauve.mauve3 },
      },
      red: {
        backgroundColor: red.red4,
        color: red.red11,
        "&:hover": { backgroundColor: red.red5 },
      },
      mauve: {
        backgroundColor: mauve.mauve4,
        color: mauve.mauve11,
        "&:hover": { backgroundColor: mauve.mauve5 },
      },
    },
  },

  defaultVariants: {
    variant: "violet",
  },
});

const RadixAlert = ({ count, DeleteRowLoader,DeleteRow }) => (
  <AlertDialog show={false} >
    <AlertDialogTrigger asChild>
      <Button>
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
          <polyline points="3 6 5 6 21 6"></polyline>
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
        </svg>
        <p style={{ marginLeft: 5 }}>
          Delete {count} {count == 1 ? " row" : " rows"}
        </p>
      </Button>
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogTitle style={{ marginBottom: 10 }}>
        Confirm to delete
      </AlertDialogTitle>
      <AlertDialogDescription>
        Are you sure you want to delete the selected rows?
      </AlertDialogDescription>
      <AlertDialogDescription>
        This action cannot be undone.
      </AlertDialogDescription>
      <Flex css={{ justifyContent: "flex-end", marginTop: 10 }}>
        <AlertDialogCancel asChild>
          <Button variant="mauve" css={{ marginRight: 10 }}>
            Cancel
          </Button>
        </AlertDialogCancel>
        <AlertDialogAction  asChild>
          {DeleteRowLoader ? (
            <Button disabled={true} variant="red">
              Deleting {count} {count == 1 ? " row" : " rows"}
            </Button>
          ) : (
            <Button onClick={()=>DeleteRow()} variant="red">
              Delete {count} {count == 1 ? " row" : " rows"}
            </Button>
          )}
        </AlertDialogAction>
      </Flex>
    </AlertDialogContent>
  </AlertDialog>
);

export default RadixAlert;
