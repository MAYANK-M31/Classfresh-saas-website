import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import Logo from "../../Assets/Logos/Classfresh(logo).png";
import { Form, Button } from "react-bootstrap";
import "../../css/CreatePassword/CreatePassword.css";

const CreatePassword = () => {
  useEffect(() => {
    document.title = "Classfresh:Create Account";
  }, []);

  return (
    <div className="CreatePassword-Main">
      <div className="Triangle"></div>
      <div className="Upper-Nav">
       
      </div>
      <div className="Vertical-Line" />

      <div className="Cover-Div">
        <div className="Outer-Div">
          <div className="Inner-Div">
            <div className="Form-Box-Outer-Div">
              <div className="Logo-Div">
                <img style={{ width: "221px", height: "67px" }} src={Logo} />
              </div>
              <div className="Inside-Form-Div">
                <Form>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Create a new Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter new password"
                    />
                  </Form.Group>
                  <div className="Button-Div">
                    <div className="Button">
                      <p>Create a New Password</p>
                    </div>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePassword;
