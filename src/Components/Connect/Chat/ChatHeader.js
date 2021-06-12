import React, { useEffect, useState } from "react";
import "../../../css/Connect/Chat/ChatHeader.css";

const ChatHeader = (props) => {
  return (
    <div className="Header">
      <div className="Header-Inside">
        <div className="Profile-View">
          <div className="Profile"></div>
        </div>

        <div className="InfoView">
          <div className="ChatNameView">
            <div className="ChatNameViewInside">
              <p>AES JANAKPURI</p>
            </div>
            <div className="ChatNameDate">
              <p style={{ margin: 0 }}>{props.TimeStamp}</p>
            </div>
          </div>

          <div
            className="ChatMessageView"
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div className="MessagePreview">
              <p numberOfLines={1}>Tap to see group Info</p>
            </div>
          </div>
        </div>
      </div>
      <div className="UtilityView">
        <div className="Search">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.6883 0.9C5.2911 0.9 0.9 5.2911 0.9 10.6883C0.9 16.0859 5.2911 20.4767 10.6883 20.4767C16.0859 20.4767 20.4767 16.0859 20.4767 10.6883C20.4767 5.29111 16.0859 0.9 10.6883 0.9ZM10.6883 18.4881C6.38769 18.4881 2.88862 14.989 2.88862 10.6884C2.88862 6.38774 6.38769 2.88862 10.6883 2.88862C14.989 2.88862 18.488 6.38769 18.488 10.6883C18.488 14.989 14.989 18.4881 10.6883 18.4881Z"
              fill="black"
              stroke="black"
              stroke-width="0.2"
            />
            <path
              d="M17.6954 16.2612L22.8228 21.3886C23.2191 21.7845 23.2191 22.427 22.8228 22.8229C22.6247 23.0209 22.3649 23.12 22.1057 23.12C21.8462 23.12 21.5866 23.0209 21.3885 22.8229L16.2612 17.6955C16.2612 17.6955 16.2612 17.6955 16.2612 17.6955C15.8649 17.2996 15.8649 16.6572 16.2612 16.2612H17.6954ZM17.6954 16.2612C17.2992 15.865 16.6574 15.865 16.2612 16.2612L17.6954 16.2612Z"
              fill="black"
              stroke="black"
              stroke-width="0.24"
            />
          </svg>
        </div>
        <div className="Menu">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0)">
              <path
                d="M11.7677 0.732215C12.7441 1.70852 12.7441 3.29144 11.7677 4.26775C10.7914 5.24405 9.20853 5.24405 8.23223 4.26775C7.25592 3.29144 7.25592 1.70852 8.23223 0.732215C9.20849 -0.244092 10.7914 -0.244092 11.7677 0.732215Z"
                fill="black"
              />
              <path
                d="M11.7677 8.23227C12.7441 9.20858 12.7441 10.7915 11.7677 11.7678C10.7914 12.7441 9.20853 12.7441 8.23223 11.7678C7.25592 10.7915 7.25592 9.20858 8.23223 8.23227C9.20849 7.25597 10.7914 7.25597 11.7677 8.23227Z"
                fill="black"
              />
              <path
                d="M11.7677 15.7322C12.7441 16.7085 12.7441 18.2914 11.7677 19.2677C10.7914 20.244 9.20853 20.244 8.23223 19.2677C7.25592 18.2914 7.25592 16.7085 8.23223 15.7322C9.20849 14.7559 10.7914 14.7559 11.7677 15.7322Z"
                fill="black"
              />
            </g>
            <defs>
              <clipPath id="clip0">
                <rect width="20" height="20" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
