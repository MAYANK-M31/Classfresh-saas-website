import React, { Component, useState } from "react";
import "../../../css/Connect/Chat/ChatScreen.css";
import ChatFlatlist from "./ChatFlatlist";
import ChatHeader from "./ChatHeader";

const ChatScreen = () => {
  const [hide, sethide] = useState(false);

  return (
    <div className="Main-Container">
      <ChatHeader />

      <ChatFlatlist />

      <div className="Bottom">
        <div className="TextInputView">
          <div className="SendTextInput">
            <textarea style={{paddingTop:"14px",paddingBottom:"11px",resize:"none"}}   rows="1" className="SendTextInput" placeholder="Search..." />
          </div>
          <div className="UtilityViews">
            <svg
              width="21"
              height="20"
              viewBox="0 0 21 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19.1892 1.60827C16.8913 -0.536499 13.2177 -0.536033 10.9204 1.60933L1.2852 10.8005C-0.457032 12.5016 -0.423736 15.2279 1.35957 16.8898C3.11354 18.5245 5.91475 18.5245 7.66872 16.8898L16.3935 8.56712C17.5278 7.48515 17.5278 5.7309 16.3935 4.64893C15.2593 3.56696 13.4203 3.56696 12.286 4.64893L3.94056 12.6098C3.64947 12.8973 3.65783 13.3554 3.95923 13.6331C4.25324 13.904 4.71934 13.904 5.01336 13.6331L13.3588 5.67225C13.9122 5.16652 14.7906 5.18455 15.3207 5.71245C15.8348 6.22441 15.8348 7.03184 15.3207 7.5438L6.59596 15.8665C5.41731 16.9748 3.51989 16.9619 2.358 15.8375C1.20785 14.7246 1.20785 12.9368 2.358 11.8238L11.9932 2.63265C13.7094 0.994878 16.4925 0.994411 18.2094 2.63155C19.9263 4.26868 19.9268 6.92354 18.2106 8.56131L8.57535 17.7525C8.2571 18.0125 8.22003 18.4694 8.49258 18.7729C8.76512 19.0765 9.24407 19.1119 9.56231 18.8519C9.59201 18.8276 9.61966 18.8013 9.64508 18.7729L19.2803 9.58175C21.5633 7.35594 21.5226 3.78607 19.1892 1.60827Z"
                fill="#4F5660"
              />
            </svg>
          </div>
        </div>

        <div className="SendCircle" activeOpacity={1}>
          <svg
            width="50"
            height="50"
            viewBox="0 0 50 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 25C0 11.1929 11.1929 0 25 0V0C38.8071 0 50 11.1929 50 25V25C50 38.8071 38.8071 50 25 50V50C11.1929 50 0 38.8071 0 25V25Z"
              fill="url(#paint0_linear)"
            />
            <path
              d="M40.3895 24.6884L16.0543 13.9744C15.6668 13.8066 15.2045 13.9066 14.9349 14.2244C14.6635 14.5423 14.6541 14.994 14.9124 15.3208L22.915 25.4991L14.9124 35.6775C14.6541 36.0042 14.6635 36.4578 14.933 36.7739C15.1146 36.9899 15.386 37.106 15.6612 37.106C15.7941 37.106 15.927 37.0792 16.0524 37.0239L40.3876 26.3098C40.7208 26.1634 40.9323 25.8473 40.9323 25.4991C40.9323 25.1509 40.7208 24.8349 40.3895 24.6884Z"
              fill="white"
            />
            <defs>
              <linearGradient
                id="paint0_linear"
                x1="17.5"
                y1="2.5"
                x2="30"
                y2="50"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#0076FE" stop-opacity="0.7" />
                <stop offset="1" stop-color="#0076FE" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default ChatScreen;
