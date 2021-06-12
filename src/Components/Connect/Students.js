import React, { Component } from "react";
import StudentConnectHeader from "./Headers/StudentConnectHeader";
import "../../css/Connect/Students.css";
import ChatList from "./Chat/ChatList";
import ChatScreen from "./Chat/ChatScreen";

const Students = () => {
  return (
    <div className="main">
      <StudentConnectHeader />
      <div className="main-Inside">
        <div className="Chatlist-View">
          <ChatList />
        </div>
        <div className="ChatScreen-View">
          <div className="ChatScreen">
            <ChatScreen/>
          </div>
          <div className="ChatInfo"></div>
        </div>
      </div>
    </div>
  );
};

export default Students;
