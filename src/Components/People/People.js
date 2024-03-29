import React, { Component, useState } from "react";
import "../../css/People/People.css";
import PeopleHeader from "./Header/PeopleHeader";
import PeopleSideBar from "./PeopleSideBar";
import Split from "react-split";



import AllTeachers from "./Teachers/AllTeachers";
import TeachersByClass from "./Teachers/TeachersByClass";
import AllStudents from "./Students/AllStudents";
import StudentsByClass from "./Students/StudentsByClass";

const People = () => {
  const [minimize, setminimize] = useState(false);
  const [Open, setOpen] = useState(null);

  return (
    <div className="People">
      <PeopleHeader />
      <div className="Inside-Div">
        <Split
          sizes={[minimize ? 0 : 15.5, minimize ? 100 : 84.5]}
          minSize={0}
          snapOffset={100}
          gutterSize={5}
          direction="horizontal"
          cursor="col-resize"
          className="split-flex" // You'll need to define this. check styles.css
        >
          <PeopleSideBar
            opentab={(data) => {
              setOpen(data);
            }}
            opened={Open}
          />

          <div
            style={{ borderWidth: minimize ? "0 0 0 0" : "0 0 0 0.5px" }}
            className="Middle-Div"
          >
            {Open == "allteachers" ? (
              <AllTeachers
                Minimize={() => {
                  setminimize(minimize ? false : true);
                }}
              />
            ) : Open == "teachersbyclass" ? (
              <TeachersByClass
                Minimize={() => {
                  setminimize(minimize ? false : true);
                }}
              />
            ) : Open == "allstudents" ? (
              <AllStudents
                Minimize={() => {
                  setminimize(minimize ? false : true);
                }}
              />
            ) : Open == "studentsbyclass" ? (
              <StudentsByClass
                Minimize={() => {
                  setminimize(minimize ? false : true);
                }}
              />
            ) : null}
          </div>
        </Split>
      </div>
    </div>
  );
};

export default People;
