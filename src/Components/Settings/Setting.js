import React, { Component, useState } from "react";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";

const Settings = () => {
  const [state, setState] = useState({
    isPaneOpen: false,
    isPaneOpenLeft: false,
  });

  return (
    <div>
    
      <React.Fragment key={45}>
        <button onClick={()=>{setState(state ? false : true)}}>hi</button>
        <SwipeableDrawer
          anchor={"right"}
          open={state}
          onClose={()=>{setState(false)}}
          onOpen={()=>{setState(false)}}
        >
          <div style={{width:"300px"}} >

          </div>
          {/* {list(anchor)} */}
        </SwipeableDrawer>
      </React.Fragment>
    </div>
  );
};

export default Settings;
