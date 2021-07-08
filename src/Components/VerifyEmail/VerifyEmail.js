import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Logo from "../../Assets/Logos/Classfresh(logo).png";
import { Form, Button } from "react-bootstrap";
import "../../css/VerifyEmail/VerifyEmail.css";

const VerifyEmail = () => {
  const [email, setemail] = useState(null);

  useEffect(() => {
    document.title = "Classfresh:Verify Email";
    const query = new URLSearchParams(window.location.search);
    if (query.get("email") == null) {
      window.location = `${window.location.origin}/signup`;
    } else {
      setemail(query.get("email"));
    }
  }, []);

  return (
    <div className="CreatePassword-Main">
      <div className="Triangle"></div>
      <div className="Upper-Nav"></div>
      <div className="Vertical-Line" />

      <div className="Cover-Div">
        <div className="Outer-Div">
          <div className="Inner-Div">
            <div className="Form-Box-Outer-Div">
              <div className="Logo-Div">
                <img style={{ width: "221px", height: "67px" }} src={Logo} />
              </div>
              <div className="Inside-Form-Div">
                <h2 className="Email-Heading">Please verify your email</h2>
                <p className="Email-SubHeading">
                  We have sent verification mail to{" "}
                  <span className="EmailId">{email}</span> {"\n"}
                  click the link in the mail inorder to verify your Email Id.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
