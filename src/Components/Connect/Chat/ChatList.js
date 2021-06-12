import React, { Component } from "react";
import "../../../css/Connect/Chat/ChatList.css";
import ChatBar from "./ChatBar";

const ChatList = () => {
  return (
    <div className="main-chat-container">
      <ChatBar
        ChatName={"AES Janakpuri"}
        Id={"1d858b9-2bb4-4ed4-83f4-f8df9349fb9f"}
        LatestMessage={"This is to inform that tomorrow is holiday on"}
        TimeStamp={"22 Feb"}
        NumberMessage={"4"}
        Color={{ one: "#FE993B", two: "#FF8080" }}
      />
      <ChatBar
        ChatName={"XII Science 2020-21"}
        Id={"1d858b9-2bb4-4ed4-83f4-f83f9345fb9s"}
        LatestMessage={"This is to inform that tomorrow is holiday on"}
        TimeStamp={"23 Feb"}
        NumberMessage={"4"}
        Color={{ one: "#0076FE", two: "#0076FE" }}
      />
      <ChatBar
        ChatName={"Ms Ria"}
        Id={"1d858b9-2bb4-4ed4-83f4-f8df9345fc5f"}
        LatestMessage={"Hi i am your assistant that solves your problem"}
        TimeStamp={"24 Feb"}
        NumberMessage={"4"}
        Color={{ one: "#FF4080", two: "#B721FE" }}
      />
      {/* <div style={style.ChannelHeading}> */}
        {/* <Hash /> */}
        {/* <p style={style.ChannelText}>Subject Channels</p> */}
      {/* </div> */}
      <ChatBar
        ChatName={"Physics"}
        LatestMessage={"This is to inform that tomorrow is holiday on"}
        Id={"1d8584b9-2bb4-4ed4-83f4-f8f9335fb9f"}
        TimeStamp={"22 Feb"}
        NumberMessage={"4"}
        Color={{ one: "#2AF598", two: "#08AEEA" }}
      />
      <ChatBar
        ChatName={"Chemistry"}
        LatestMessage={"This is to inform that tomorrow is holiday on"}
        Id={"1d858b9-2bb4-4ed4-83f4-f8df9345fb9f"}
        TimeStamp={"23 Feb"}
        NumberMessage={"4"}
        Color={{ one: "#FE5ACD", two: "#FBDA61" }}
      />
      <ChatBar
        ChatName={"Maths"}
        LatestMessage={"Hi i am your assistant that solves your problem"}
        Id={"1d858b9-2bb4-4ed4-83f4-f8df9345fb9f"}
        TimeStamp={"24 Feb"}
        NumberMessage={"4"}
        Color={{ one: "#00DBDE", two: "#FC00FE" }}
      />
      {/* <div style={style.ChannelHeading}> */}
        {/* <Hash /> */}
        {/* <p style={style.ChannelText}>Teachers Channels</p> */}
      {/* </div> */}
      <ChatBar
        ChatName={"Swati Saxene"}
        LatestMessage={"This is to inform that tomorrow is holiday on"}
        Id={"1d858b9-2bb4-4ed4-83f4-f8df9345fb9f"}
        TimeStamp={"22 Feb"}
        NumberMessage={"4"}
        Color={{ one: "#2AF598", two: "#08AEEA" }}
      />
      <ChatBar
        ChatName={"Pranav yadav"}
        LatestMessage={"This is to inform that tomorrow is holiday on"}
        Id={"1d858b9-2bb4-4ed4-83f4-f8df9345fb9f"}
        TimeStamp={"23 Feb"}
        NumberMessage={"4"}
        Color={{ one: "#FE5ACD", two: "#FBDA61" }}
      />
    </div>
  );
};





export default ChatList;
