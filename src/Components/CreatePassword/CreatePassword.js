import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Logo from "../../Assets/Logos/Classfresh(logo).png";
import { Form, Button } from "react-bootstrap";
import "../../css/CreatePassword/CreatePassword.css";
import axios from "axios";
import { css } from "@emotion/react";
import BarLoader from "react-spinners/BarLoader";
import { URL } from "../../URL/URL";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const CreatePassword = () => {
  const [password, setpassword] = useState(null);
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Classfresh:Create Password";
    const query = new URLSearchParams(window.location.search);

    if (query.get("token") == null) {
      window.location = `${window.location.origin}/signup`;
    }

    const VerifyEmail = async () => {
      await axios({
        method: "post", //you can set what request you want to be
        url: `${URL}/verifyemail`,
        headers: {
          Authorization: "Bearer " + query.get("token"),
        },
      }).then(({ data }) => {
        console.log(data);
        if (data.status == 200 ) {
          setLoading(false);
        } else if (data.status == 408 || data.status == 401 ) {
          window.location = `${window.location.origin}/signup`;
        }
      });
    };

    VerifyEmail();
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

              {Loading ? (
                <div className="LoadingDiv">
                  <p style={{ marginBottom: "50px" }}>Verifying Email...</p>
                  <BarLoader
                    color={"#0d71eb"}
                    loading={true}
                    css={override}
                    width={150}
                  />
                </div>
              ) : (
                <div>
                  <div className="Inside-Form-Div">
                    <Form>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
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
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePassword;
