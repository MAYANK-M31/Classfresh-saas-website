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
  const [alert, setalert] = useState(false);
  const [alertdata, setalertdata] = useState(null);
  const [Loader, setLoader] = useState(false);

  useEffect(() => {
    document.title = "Classfresh:Create Password";
    const query = new URLSearchParams(window.location.search);

    if (query.get("token") == null) {
      window.location = `${window.location.origin}/signup`;
    }

    // alert()


    const VerifyEmail = async () => {
      await axios({
        method: "post", //you can set what request you want to be
        url: `${URL}/verifyemail`,
        headers: {
          Authorization: "Bearer " + query.get("token"),
        },
      }).then(({ data }) => {
        console.log(query.get("token"))
        console.log(data);
        if (data.status == 200) {
          setLoading(false);
        } else if (data.status == 408 || data.status == 401) {
          window.location = `${window.location.origin}/signup`;
        }
      });
    };

    VerifyEmail();
  }, []);

  const HandleSubmit = async (e) => {
    e.preventDefault();
    const Data = {
      password: password,
    };

    setLoader(true);
    const query = new URLSearchParams(window.location.search);
    await axios({
      method: "post", //you can set what request you want to be
      url: `${URL}/signup/createpassword`,
      headers: {
        Authorization: "Bearer " + query.get("token"),
      },
      data: Data
      
    }).then(async (res) => {
      if (res.data.status == 200) {
        window.location = `${window.location.origin}/login`;
        setLoader(true);
      } else if (res.data.status == 433) {
        //433 password already created
        window.location = `${window.location.origin}/login`;
      } else if (res.data.status == 401) {
        setalert(true);
        setalertdata(res.data.message);
        setLoader(false);
      } else {
        window.location = `${window.location.origin}/signup`;
      }
    });
  };

  return (
    <div className="CreatePassword-Main">
      <div className="Triangle"></div>
      <div className="Upper-Nav"></div>
      <div className="Vertical-Line" />

      <div className="Cover-Div">
        <div className="Outer-Div">
          <div className="Inner-Div">
            <div className= {alert ?  "Form-Box-Outer-Div-Alert": "Form-Box-Outer-Div" } >
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
                    <Form onSubmit={(e) => HandleSubmit(e)}>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Create a new Password</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Enter new password"
                          value={password}
                          onChange={(e) => {
                            setpassword(e.target.value);
                          }}
                          required
                        />
                        <div hidden={!alert} className="Form-Alert-Div">
                          <svg
                            aria-hidden="true"
                            height="16"
                            width="30"
                            viewBox="0 0 16 16"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M10.115 1.308l5.635 11.269A2.365 2.365 0 0 1 13.634 16H2.365A2.365 2.365 0 0 1 .25 12.577L5.884 1.308a2.365 2.365 0 0 1 4.231 0zM8 10.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM8 9c.552 0 1-.32 1-.714V4.714C9 4.32 8.552 4 8 4s-1 .32-1 .714v3.572C7 8.68 7.448 9 8 9z"
                              fill="#ed5f74"
                            ></path>
                          </svg>
                          <span style={{ color: "#ed5f74" }}>{alertdata}</span>
                        </div>
                      </Form.Group>
                      <div className="Button-Div">
                        <button
                          disabled={Loader}
                          style={{ opacity: Loader ? 0.5 : 1 }}
                          className="Button"
                        >
                          {Loader ? <p>Loading...</p> : <p>Create Account</p>}
                        </button>
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
