import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../../../css/Common/Header.css";

const ClassHeader = ({ classname, section }) => {
  return (
    <div className="header">
      <div className="TitleView">
        <span>Users</span>
      </div>
      <div className="SearchView"></div>

      <div className="RightView">
        <div className="alert">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="30"
            viewBox="0 0 16 19"
            data-test-icon="notification"
            class="app-icon--link app-icon--topalign app-icon--large"
            data-identifyElement="122"
          >
            <path
              fill="#183247"
              d="M4.559 15.903H.727A.74.74 0 010 15.15a.74.74 0 01.727-.754h.647v-6.36c0-3.393 2.376-6.21 5.499-6.765a1.23 1.23 0 01-.004-.1C6.869.526 7.375 0 8 0s1.131.525 1.131 1.172c0 .033-.001.066-.004.099 3.123.554 5.5 3.372 5.5 6.764v6.361h.646a.74.74 0 01.727.754.74.74 0 01-.727.753H11.44C11.205 17.653 9.755 19 8 19s-3.205-1.347-3.441-3.097zm1.48 0c.217.913 1.012 1.59 1.961 1.59.949 0 1.744-.677 1.962-1.59H6.038zm7.133-1.507v-6.36c0-2.96-2.316-5.358-5.172-5.358S2.828 5.077 2.828 8.035v6.361h10.344z"
              data-identifyElement="123"
            ></path>
          </svg>
        </div>

        <div className="setting">
          <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0)">
              <path
                d="M14.8786 28H13.1213C11.7001 28 10.5437 26.8437 10.5437 25.4224V24.8279C9.93945 24.6349 9.35238 24.3912 8.78839 24.0993L8.36708 24.5206C7.34666 25.5423 5.71211 25.5123 4.72134 24.5202L3.47933 23.2783C2.4868 22.2869 2.45826 20.6528 3.47966 19.6325L3.90064 19.2116C3.60877 18.6476 3.36514 18.0606 3.17204 17.4563H2.57759C1.15637 17.4563 0 16.2999 0 14.8787V13.1213C0 11.7001 1.15637 10.5437 2.57764 10.5437H3.17209C3.3652 9.93945 3.60883 9.35244 3.9007 8.78845L3.47938 8.36719C2.45859 7.34748 2.48675 5.71331 3.47971 4.72145L4.72183 3.47938C5.7149 2.48495 7.34907 2.46012 8.36752 3.47971L8.78845 3.90064C9.35244 3.60883 9.93951 3.36514 10.5437 3.17204V2.57759C10.5437 1.15631 11.7001 0 13.1214 0H14.8787C16.2999 0 17.4563 1.15631 17.4563 2.57759V3.17209C18.0605 3.36514 18.6476 3.60883 19.2116 3.9007L19.6329 3.47938C20.6533 2.45771 22.2878 2.48768 23.2786 3.47977L24.5206 4.72172C25.5131 5.71315 25.5417 7.34716 24.5203 8.36746L24.0993 8.78845C24.3912 9.35244 24.6348 9.9394 24.8279 10.5437H25.4224C26.8436 10.5437 28 11.7001 28 13.1213V14.8787C28 16.2999 26.8436 17.4563 25.4224 17.4563H24.8279C24.6348 18.0605 24.3912 18.6476 24.0993 19.2116L24.5206 19.6329C25.5414 20.6526 25.5133 22.2867 24.5203 23.2786L23.2782 24.5207C22.2851 25.5151 20.6509 25.5399 19.6325 24.5203L19.2116 24.0994C18.6476 24.3912 18.0605 24.6349 17.4563 24.828V25.4225C17.4563 26.8437 16.2999 28 14.8786 28ZM9.06265 22.3765C9.84616 22.8399 10.6894 23.1899 11.569 23.4169C11.9313 23.5104 12.1844 23.8371 12.1844 24.2112V25.4224C12.1844 25.939 12.6048 26.3594 13.1214 26.3594H14.8787C15.3953 26.3594 15.8157 25.939 15.8157 25.4224V24.2112C15.8157 23.8371 16.0688 23.5104 16.431 23.4169C17.3106 23.1899 18.1539 22.8399 18.9374 22.3765C19.2598 22.1858 19.6702 22.2377 19.9351 22.5025L20.793 23.3605C21.1629 23.7309 21.7569 23.7223 22.1178 23.3609L23.3606 22.1181C23.7206 21.7586 23.7326 21.1644 23.361 20.7933L22.5026 19.935C22.2379 19.6702 22.186 19.2597 22.3766 18.9374C22.84 18.1539 23.19 17.3106 23.417 16.431C23.5105 16.0687 23.8372 15.8157 24.2113 15.8157H25.4224C25.939 15.8157 26.3594 15.3954 26.3594 14.8787V13.1214C26.3594 12.6048 25.939 12.1844 25.4224 12.1844H24.2113C23.8371 12.1844 23.5105 11.9313 23.417 11.5691C23.19 10.6895 22.8399 9.84621 22.3766 9.06276C22.186 8.74043 22.2379 8.32995 22.5026 8.06515L23.3606 7.20716C23.7315 6.8367 23.7219 6.2428 23.361 5.88235L22.1182 4.63958C21.758 4.27886 21.1638 4.2683 20.7934 4.63925L19.9351 5.49757C19.6703 5.76242 19.2597 5.81427 18.9375 5.62362C18.154 5.16026 17.3107 4.8102 16.4311 4.5832C16.0688 4.48973 15.8157 4.16303 15.8157 3.78891V2.57759C15.8157 2.06095 15.3954 1.64062 14.8787 1.64062H13.1214C12.6048 1.64062 12.1844 2.06095 12.1844 2.57759V3.7888C12.1844 4.16292 11.9313 4.48962 11.5691 4.58309C10.6895 4.81009 9.84621 5.16015 9.0627 5.62352C8.74027 5.8141 8.32984 5.76226 8.06504 5.49746L7.2071 4.63947C6.8372 4.26912 6.24312 4.27771 5.88235 4.63909L4.63947 5.88191C4.27952 6.24143 4.26748 6.8355 4.63914 7.20672L5.49746 8.06504C5.76226 8.32984 5.8141 8.74032 5.62352 9.06265C5.16015 9.8461 4.81015 10.6894 4.58314 11.569C4.48962 11.9313 4.16292 12.1843 3.78886 12.1843H2.57764C2.06101 12.1844 1.64062 12.6047 1.64062 13.1213V14.8787C1.64062 15.3953 2.06101 15.8156 2.57764 15.8156H3.7888C4.16292 15.8156 4.48957 16.0687 4.58309 16.4309C4.81009 17.3106 5.16015 18.1538 5.62346 18.9373C5.81405 19.2596 5.7622 19.6701 5.49741 19.9349L4.63941 20.7929C4.26852 21.1634 4.2782 21.7573 4.63909 22.1177L5.88186 23.3605C6.24209 23.7212 6.83621 23.7318 7.20666 23.3608L8.06493 22.5025C8.26006 22.3074 8.666 22.1419 9.06265 22.3765Z"
                fill="#183247"
              />
              <path
                d="M14 20.092C10.6407 20.092 7.90784 17.3591 7.90784 13.9998C7.90784 10.6406 10.6407 7.90765 14 7.90765C17.3593 7.90765 20.0922 10.6406 20.0922 13.9998C20.0922 17.3591 17.3593 20.092 14 20.092ZM14 9.54828C11.5454 9.54828 9.54846 11.5452 9.54846 13.9998C9.54846 16.4544 11.5454 18.4514 14 18.4514C16.4546 18.4514 18.4516 16.4544 18.4516 13.9998C18.4516 11.5452 16.4547 9.54828 14 9.54828Z"
                fill="#183247"
              />
            </g>
            <defs>
              <clipPath id="clip0">
                <rect width="28" height="28" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>

        <hr
          style={{
            width: "2px",
            height: "50%",
            marginLeft: "15px",
            marginRight: "10px",
          }}
        />

        <div className="profileView">
          <div className="profile"></div>
          <div className="profileDetailView">
            <div
              style={{
                width: "150px",
                height: "20px",
                textOverflow: "ellipsis",
                overflow: "hidden",
                whiteSpace: "nowrap",
              }}
            >
              Mayank Malhotra
            </div>
            Teacher
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassHeader;
