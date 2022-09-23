import React, { Component } from "react";
import "../../css/People/Sidebar/PeopleSideBar.css";

const PeopleSideBar = ({ opentab, opened }) => {
  return (
    <div className="PeopleSidebar">
      <div className="GroupView">
        <p>Group</p>
        <svg
          width="25"
          height="25"
          viewBox="0 0 25 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="1"
            y="1"
            width="23"
            height="23"
            rx="5"
            stroke="#506D85"
            stroke-width="2"
          />
          <g clip-path="url(#clip0)">
            <path
              d="M18.9772 11.1364H13.8636V6.02273C13.8636 5.45818 13.4054 5 12.8409 5H12.1591C11.5945 5 11.1364 5.45818 11.1364 6.02273V11.1364H6.02273C5.45818 11.1364 5 11.5945 5 12.1591V12.8409C5 13.4054 5.45818 13.8636 6.02273 13.8636H11.1364V18.9772C11.1364 19.5418 11.5945 20 12.1591 20H12.8409C13.4054 20 13.8636 19.5418 13.8636 18.9772V13.8636H18.9772C19.5418 13.8636 20 13.4054 20 12.8409V12.1591C20 11.5945 19.5418 11.1364 18.9772 11.1364Z"
              fill="#506D85"
            />
          </g>
          <defs>
            <clipPath id="clip0">
              <rect
                width="15"
                height="15"
                fill="white"
                transform="translate(5 5)"
              />
            </clipPath>
          </defs>
        </svg>
      </div>

      <div className="SearchGroupView">
        <div className="SearchGroupInputView">
          <div className="SearchGroupIcon">
            <svg
              width="19"
              height="18"
              viewBox="0 0 19 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.36713 0C3.89981 0 0.265137 3.55609 0.265137 7.92682C0.265137 12.2978 3.89981 15.8536 8.36713 15.8536C12.8347 15.8536 16.4691 12.2978 16.4691 7.92682C16.4691 3.55609 12.8347 0 8.36713 0ZM8.36713 14.3903C4.72448 14.3903 1.76089 11.4908 1.76089 7.92686C1.76089 4.36296 4.72448 1.46341 8.36713 1.46341C12.0098 1.46341 14.9734 4.36293 14.9734 7.92682C14.9734 11.4907 12.0098 14.3903 8.36713 14.3903Z"
                fill="#506D85"
              />
              <path
                d="M18.4437 16.7511L14.1559 12.5559C13.8637 12.2701 13.3906 12.2701 13.0984 12.5559C12.8062 12.8416 12.8062 13.305 13.0984 13.5906L17.3862 17.7857C17.5323 17.9286 17.7235 18.0001 17.915 18.0001C18.1062 18.0001 18.2976 17.9286 18.4437 17.7857C18.7359 17.5001 18.7359 17.0367 18.4437 16.7511Z"
                fill="#506D85"
              />
            </svg>
          </div>
          <input className="SearchGroupInput" placeholder="Search..." />
        </div>
      </div>

      <div className="GroupListView">
        <div className="GroupParentView">
          <div className="GroupParentViewInside">
            <svg
              style={{ marginLeft: "20px" }}
              width="7"
              height="7"
              viewBox="0 0 7 7"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.15001 5.74127L6.81188 1.85304C6.93489 1.67348 7 1.49255 7 1.34217C7 1.05143 6.76666 0.871582 6.37608 0.871582L0.623012 0.871582C0.232886 0.871582 0 1.0512 0 1.34126C0 1.49187 0.0651627 1.66991 0.188519 1.84987L2.85033 5.73991C3.02179 5.99008 3.25252 6.12862 3.50031 6.12862C3.74793 6.12868 3.97861 5.99172 4.15001 5.74127Z"
                fill="#2C385C"
              />
            </svg>

            <svg
              width="20"
              height="20"
              style={{ marginLeft: "15px" }}
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.27344 0C3.97039 0 2.92969 1.09398 2.92969 2.38281C2.92969 3.67516 3.98109 4.72656 5.27344 4.72656C6.56578 4.72656 7.61719 3.67516 7.61719 2.38281C7.61719 1.09297 6.57516 0 5.27344 0ZM5.27344 3.55469C4.62727 3.55469 4.10156 3.02898 4.10156 2.38281C4.10156 1.72641 4.6382 1.17188 5.27344 1.17188C5.90867 1.17188 6.44531 1.72641 6.44531 2.38281C6.44531 3.02898 5.91961 3.55469 5.27344 3.55469Z"
                fill="#2C385C"
              />
              <path
                d="M18.2422 0H9.96094C8.99168 0 8.20312 0.788555 8.20312 1.75781V5.75645L7.68816 5.24152C7.35613 4.90945 6.91473 4.72656 6.44531 4.72656H5.27344C5.02504 4.72656 3.17809 4.72656 2.92969 4.72656C1.31426 4.72656 0 6.04082 0 7.65625C0 7.98941 0 10.6906 0 11.1719C0 12.1411 0.788555 12.9297 1.75781 12.9297C1.96316 12.9297 2.16043 12.8943 2.34375 12.8293V18.2422C2.34375 19.2114 3.1323 20 4.10156 20C4.55137 20 4.96223 19.8302 5.27344 19.5513C5.58465 19.8302 5.99551 20 6.44531 20C7.41457 20 8.20312 19.2114 8.20312 18.2422V10.4861C8.65113 10.6441 9.14742 10.6137 9.57523 10.4005L11.5481 9.41406H18.2422C19.2114 9.41406 20 8.62551 20 7.65625V1.75781C20 0.788555 19.2114 0 18.2422 0ZM11.3949 8.18043L9.05184 9.35195C8.83203 9.46148 8.55902 9.42656 8.37477 9.24234L8.03156 8.8991C7.66922 8.53676 7.03285 8.7832 7.03129 9.3116C7.03129 9.31219 7.03121 9.31273 7.03121 9.31332V18.2422C7.03121 18.5653 6.76836 18.8281 6.44527 18.8281C6.12219 18.8281 5.85934 18.5653 5.85934 18.2422V12.3438C5.85934 12.0202 5.59699 11.7578 5.2734 11.7578C4.9498 11.7578 4.68746 12.0202 4.68746 12.3438V18.2422C4.68746 18.5653 4.42461 18.8281 4.10152 18.8281C3.77844 18.8281 3.51559 18.5653 3.51559 18.2422V11.1719C3.51559 10.7301 3.51559 8.01734 3.51559 7.65625C3.51559 7.33266 3.25324 7.07031 2.92965 7.07031C2.60605 7.07031 2.34371 7.33266 2.34371 7.65625C2.34371 7.98941 2.34371 10.6906 2.34371 11.1719C2.34371 11.495 2.08086 11.7578 1.75777 11.7578C1.43469 11.7578 1.17184 11.495 1.17184 11.1719C1.17188 10.7301 1.17188 8.01734 1.17188 7.65625C1.17188 6.68699 1.96043 5.89844 2.92969 5.89844C3.37148 5.89844 6.08422 5.89844 6.44531 5.89844C6.60172 5.89844 6.74883 5.95941 6.85953 6.07016L8.6059 7.81652C8.78418 7.99484 9.05668 8.03902 9.28223 7.92629L10.8709 7.13195C11.1616 6.98645 11.5121 7.10406 11.657 7.39414C11.8019 7.68402 11.6848 8.03551 11.3949 8.18043ZM18.8281 7.65625C18.8281 7.97934 18.5653 8.24219 18.2422 8.24219H12.7898C12.7934 8.23215 12.7973 8.2223 12.8006 8.21219C12.885 7.95906 12.9103 7.69586 12.878 7.43875L16.0823 5.8366C16.3718 5.69188 16.4891 5.33992 16.3444 5.05047C16.1996 4.76102 15.8477 4.64367 15.5582 4.78844L12.3541 6.39051C11.8408 5.89395 11.0411 5.73633 10.3466 6.08391L9.375 6.56973V1.75781C9.375 1.43473 9.63785 1.17188 9.96094 1.17188H18.2422C18.5653 1.17188 18.8281 1.43473 18.8281 1.75781V7.65625Z"
                fill="#2C385C"
              />
            </svg>

            <p>Teachers</p>
          </div>

          <div
            onClick={() => opentab("teachersbyclass")}
            style={{ backgroundColor: opened == "teachersbyclass" && "#0368fc1a" }}
            className={"GroupChildView"}
          >
            <p style={{ color: opened == "teachersbyclass" && "#0368fc" }}>
              Users By Class
            </p>
          </div>

          <div
            onClick={() => opentab("allteachers")}
            style={{ backgroundColor: opened == "allteachers" && "#0368fc1a" }}
            className={"GroupChildView"}
          >
            <p style={{ color: opened == "allteachers" && "#0368fc" }}>
              All Users
            </p>
          </div>
        </div>

        <div className="GroupParentView">
          <div className="GroupParentViewInside">
            <svg
              style={{ marginLeft: "20px" }}
              width="7"
              height="7"
              viewBox="0 0 7 7"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.15001 5.74127L6.81188 1.85304C6.93489 1.67348 7 1.49255 7 1.34217C7 1.05143 6.76666 0.871582 6.37608 0.871582L0.623012 0.871582C0.232886 0.871582 0 1.0512 0 1.34126C0 1.49187 0.0651627 1.66991 0.188519 1.84987L2.85033 5.73991C3.02179 5.99008 3.25252 6.12862 3.50031 6.12862C3.74793 6.12868 3.97861 5.99172 4.15001 5.74127Z"
                fill="#2C385C"
              />
            </svg>

            <svg
              style={{ marginLeft: "15px" }}
              width="18"
              height="20"
              viewBox="0 0 18 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.875 9.09677C16.875 2.76557 16.8927 3.16892 16.8337 3.02327C16.96 2.71116 16.7861 2.36282 16.467 2.27166L8.59204 0.0216563C8.49105 -0.00721875 8.38399 -0.00721875 8.283 0.0216563L0.408 2.27166C0.166462 2.34062 0 2.56134 0 2.81252C0 3.06369 0.166462 3.28438 0.407963 3.35338L3.375 4.20107C3.375 4.22653 3.375 4.25004 3.375 4.27198C3.375 4.46259 3.375 4.52529 3.375 4.52424C3.375 4.83437 3.375 5.48346 3.375 6.74998C3.375 8.93541 4.50255 10.8336 6.14512 11.7644L5.83481 12.385C4.3167 12.4719 2.89826 13.1187 1.80866 14.2284C0.642338 15.4162 0 16.982 0 18.6375C0 18.9482 0.25185 19.2 0.5625 19.2H16.3125C16.6231 19.2 16.875 18.9482 16.875 18.6375C16.875 16.9821 16.2327 15.4163 15.0663 14.2285C13.9768 13.1188 12.5584 12.4724 11.0404 12.3855L10.7298 11.7644C12.3725 10.8336 13.5 8.93545 13.5 6.75002C13.5 6.61131 13.5 4.23876 13.5 4.20111L15.75 3.55824V9.09677C15.0953 9.32897 14.625 9.95421 14.625 10.6875V11.8125C14.625 12.1232 14.8769 12.375 15.1875 12.375H17.4375C17.7481 12.375 18 12.1232 18 11.8125V10.6875C18 9.95421 17.5297 9.32893 16.875 9.09677ZM7.875 18.075H1.15515C1.42151 15.6035 3.4224 13.6538 5.89245 13.509L7.875 16.4828V18.075ZM6.83659 12.8971L7.18481 12.2006C7.58558 12.3144 8.00528 12.375 8.4375 12.375C8.86973 12.375 9.28939 12.3144 9.69015 12.2006L10.0384 12.8971L8.4375 15.2984L6.83659 12.8971ZM10.9826 13.509C13.4526 13.6538 15.4535 15.6035 15.7199 18.075H9V16.4828L10.9826 13.509ZM8.4375 11.25C6.5292 11.25 4.93384 9.69043 4.57545 7.62801C5.76337 8.158 7.09118 8.43752 8.4375 8.43752C9.78375 8.43752 11.1116 8.15803 12.2995 7.62812C11.9411 9.69047 10.3458 11.25 8.4375 11.25ZM12.3627 6.11507C12.33 6.2776 12.2337 6.41455 12.0988 6.48077C10.9913 7.0249 9.72529 7.31248 8.4375 7.31248C7.1496 7.31248 5.88353 7.02482 4.77611 6.48062C4.59266 6.39051 4.5 6.18186 4.5 5.99196V4.52248C8.58229 5.68885 8.32496 5.62498 8.4375 5.62498C8.55 5.62498 8.29189 5.68911 12.375 4.52248C12.375 6.13712 12.3795 6.03253 12.3627 6.11507ZM8.4375 4.47752L2.61004 2.81252L8.4375 1.14748L14.265 2.81248L8.4375 4.47752ZM16.875 11.25H15.75V10.6875C15.75 10.3774 16.0023 10.125 16.3125 10.125C16.6227 10.125 16.875 10.3774 16.875 10.6875V11.25Z"
                fill="#2C385C"
              />
            </svg>

            <p>Students</p>
          </div>
           <div
            onClick={() => opentab("studentsbyclass")}
            style={{ backgroundColor: opened == "studentsbyclass" && "#0368fc1a"}}
            className={"GroupChildView"}
          >
            <p style={{ color: opened == "studentsbyclass" && "#0368fc" }}>
              Users By Class
            </p>
          </div>
          <div
            onClick={() => opentab("allstudents")}
            style={{ backgroundColor: opened == "allstudents" && "#0368fc1a" }}
            className={"GroupChildView"}
          >
            <p style={{ color: opened == "allstudents" && "#0368fc" }}>
            All Users
            </p>
          </div>
       
       
        </div>

        <div className="GroupParentView">
          <div className="GroupParentViewInside">
            <svg
              style={{ marginLeft: "20px" }}
              width="7"
              height="7"
              viewBox="0 0 7 7"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.15001 5.74127L6.81188 1.85304C6.93489 1.67348 7 1.49255 7 1.34217C7 1.05143 6.76666 0.871582 6.37608 0.871582L0.623012 0.871582C0.232886 0.871582 0 1.0512 0 1.34126C0 1.49187 0.0651627 1.66991 0.188519 1.84987L2.85033 5.73991C3.02179 5.99008 3.25252 6.12862 3.50031 6.12862C3.74793 6.12868 3.97861 5.99172 4.15001 5.74127Z"
                fill="#2C385C"
              />
            </svg>

            <svg
              style={{ marginLeft: "15px" }}
              width="17"
              height="21"
              viewBox="0 0 17 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.5288 9.3158C12.8144 8.37824 13.6515 6.8609 13.6515 5.15152C13.6515 2.31097 11.3406 0 8.5 0C5.65945 0 3.34848 2.31097 3.34848 5.15152C3.34848 6.8609 4.18559 8.37824 5.47117 9.3158C2.27546 10.5387 0 13.6372 0 17.2576C0 18.8199 1.27103 20.0909 2.83333 20.0909H14.1667C15.729 20.0909 17 18.8199 17 17.2576C17 13.6372 14.7245 10.5387 11.5288 9.3158ZM4.89395 5.15152C4.89395 3.16315 6.51162 1.54547 8.5 1.54547C10.4884 1.54547 12.1061 3.16315 12.1061 5.15152C12.1061 7.1399 10.4884 8.75761 8.5 8.75761C6.51162 8.75761 4.89395 7.1399 4.89395 5.15152ZM14.1667 18.5455H2.83333C2.1232 18.5455 1.54547 17.9677 1.54547 17.2576C1.54547 13.4228 4.66522 10.303 8.50004 10.303C12.3349 10.303 15.4546 13.4228 15.4546 17.2576C15.4546 17.9677 14.8768 18.5455 14.1667 18.5455Z"
                fill="#2C385C"
              />
            </svg>

            <p>Office Staff</p>
          </div>
          <div
            onClick={() => opentab("allstaff")}
            style={{ backgroundColor: opened == "allstaff" && "#0368fc1a" }}
            className={"GroupChildView"}
          >
            <p style={{ color: opened == "allstaff" && "#0368fc" }}>
            All Users
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PeopleSideBar;