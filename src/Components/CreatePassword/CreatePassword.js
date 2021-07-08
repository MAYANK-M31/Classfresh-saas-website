import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Logo from "../../Assets/Logos/Classfresh(logo).png";
import { Form, Button } from "react-bootstrap";
import "../../css/CreatePassword/CreatePassword.css";
import axios from "axios";
import { URL } from "../../URL/URL";

const CreatePassword = () => {
  const [password, setpassword] = useState(null);

  useEffect(() => {
    document.title = "Classfresh:Create Password";
    const query = new URLSearchParams(window.location.search);

    if (query.get("token") == null) {
      window.location = `${window.location.origin}/signup`;
    } 

    const VerifyEmail = async()=>{
      // await axios.post(`${URL}/sendmail/sendotp`).then(({data}) => {
      //   if (data.status == 200) {
      //     if (data.payload.email) {
      //       window.location = `${window.location.origin}/verifyemail?email=${data.payload.email}`;
      //     }
      //   }
      // });
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
